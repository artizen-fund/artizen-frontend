import { Biconomy } from '@biconomy/mexa'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMagic, assertInt } from '@lib'

// NOTE: this is untested with useMagicLink()

export const useMetaContract = () => {
  const { magic } = useMagic()
  const [biconomy, setBiconomy] = useState<any>()
  const [web3, setWeb3] = useState<Web3Provider>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    setLoading(true)
    const biconomy = new Biconomy(magic, {
      apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY,
      debug: true,
    })
    const biconomyWeb3 = new ethers.providers.Web3Provider(biconomy)
    setWeb3(biconomyWeb3)
    setBiconomy(biconomy)

    biconomy
      .onEvent(biconomy.READY, () => {
        setLoading(false)
      })
      .onEvent(biconomy.ERROR, (error: unknown, message: string) => {
        console.error(message)
        setError(error)
      })
  }, [])

  const getSignatureParameters = (signature: string) => {
    if (!ethers.utils.isHexString(signature)) {
      throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'))
    }
    const r = signature.slice(0, 66)
    const s = '0x'.concat(signature.slice(66, 130))
    const vStr = '0x'.concat(signature.slice(130, 132))
    let v = ethers.BigNumber.from(vStr).toNumber()
    if (![27, 28].includes(v)) v += 27
    return { r, s, v }
  }

  const callCustomMetaTxMethod = async (
    contractAddress: string,
    contractAbi: string,
    userAddress: string,
    methodName: string,
    attr: Array<any>,
  ) => {
    // Initialize Constants
    const domainType = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'verifyingContract', type: 'address' },
      { name: 'salt', type: 'bytes32' },
    ]
    const metaTransactionType = [
      { name: 'nonce', type: 'uint256' },
      { name: 'from', type: 'address' },
      { name: 'functionSignature', type: 'bytes' },
    ]

    const contract = new ethers.Contract(contractAddress, contractAbi)
    const contractInterface = new ethers.utils.Interface(contractAbi)

    const name = await contract?.methods.name().call()
    const CHAIN_ID = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const domainData = {
      name,
      version: '1',
      verifyingContract: contractAddress,
      // converts Number to bytes32. pass your chainId instead of 42 if network is not Kovan
      salt: ethers.utils.hexZeroPad(ethers.BigNumber.from(CHAIN_ID).toHexString(), 32),
    }

    const nonce = await contract.getNonce(userAddress)

    // Create your target method signature
    const functionSignature = contractInterface.encodeFunctionData(methodName, ...attr)
    const message: { nonce: number; from: string; functionSignature: string } = {
      nonce: parseInt(nonce),
      from: userAddress,
      functionSignature,
    }

    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType,
      },
      domain: domainData,
      primaryType: 'MetaTransaction',
      message,
    })

    const signature = await web3?.send('eth_signTypedData_v3', [userAddress, dataToSign])

    const { r, s, v } = getSignatureParameters(signature)
    const tx = contract.executeMetaTransaction(userAddress, functionSignature, r, s, v)

    await tx.wait(1)

    return tx
  }

  const callStandardMetaTxMethod = async (
    contractAddress: string,
    contractAbi: string,
    userAddress: string,
    methodName: string,
    attr: Array<unknown>,
  ) => {
    if (!biconomy) {
      throw new Error('biconomy not initialized')
    }
    const contract = new ethers.Contract(contractAddress, contractAbi, biconomy.getSignerByAddress(userAddress))

    // Create your target method signature.
    const { data } = await contract.populateTransaction[methodName](...attr)

    const provider = biconomy.getEthersProvider()

    const gasLimit = await provider.estimateGas({
      to: contractAddress,
      from: userAddress,
      data,
    })

    const txParams = {
      data,
      to: contractAddress,
      from: userAddress,
      gasLimit,
      signatureType: 'EIP712_SIGN',
    }

    // as ethers does not allow providing custom options while sending transaction
    const tx = await provider.send('eth_sendTransaction', [txParams])

    //event emitter methods
    return new Promise(resolve => {
      provider.once(tx, (transaction: unknown) => {
        // Emitted when the transaction has been mined
        resolve(transaction)
      })
    })
  }

  return { callStandardMetaTxMethod, callCustomMetaTxMethod, loading, error }
}
