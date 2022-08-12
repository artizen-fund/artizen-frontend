import { Biconomy } from '@biconomy/mexa'
import { ContractInterface, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMagic, assertInt, assert } from '@lib'
import { JsonFragment } from '@ethersproject/abi'

// NOTE: this is untested with useMagicLink()

export const useMetaContract = () => {
  const { magic } = useMagic()
  const [biconomy, setBiconomy] = useState<Biconomy>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const initBiconomy = async () => {
    const apiKey = assert(process.env.NEXT_PUBLIC_BICONOMY_API_KEY, 'NEXT_PUBLIC_BICONOMY_API_KEY')
    const raffleContractAddress = assert(
      process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
      'EXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
    )

    const usdcContractAddress = assert(
      process.env.NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS,
      'NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS',
    )

    setLoading(true)
    const biconomy = new Biconomy(magic?.rpcProvider, {
      apiKey,
      debug: true,
      contractAddresses: [raffleContractAddress, usdcContractAddress],
    })

    await biconomy.init()
    setLoading(false)

    setBiconomy(biconomy)
  }

  useEffect(() => {
    initBiconomy()
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
    contractAbi: ContractInterface,
    userAddress: string,
    methodName: string,
    attr: Array<any>,
  ): Promise<{ msg: string; id: string; hash: string; receipt: string } | any> => {
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
    const contract = new ethers.Contract(contractAddress, contractAbi, biconomy?.ethersProvider)
    const contractInterface = new ethers.utils.Interface(contractAbi as JsonFragment[])

    const name = await contract?.name()
    const NEXT_PUBLIC_CHAIN_ID = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const domainData = {
      name,
      version: '1',
      verifyingContract: contractAddress,
      // converts Number to bytes32. pass your chainId instead of 42 if network is not Kovan
      salt: ethers.utils.hexZeroPad(ethers.BigNumber.from(NEXT_PUBLIC_CHAIN_ID).toHexString(), 32),
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

    const signature = await biconomy?.ethersProvider?.send('eth_signTypedData_v3', [userAddress, dataToSign])

    const { r, s, v } = getSignatureParameters(signature)

    const provider = await biconomy?.provider
    const { data } = await contract.populateTransaction.executeMetaTransaction(userAddress, functionSignature, r, s, v)
    const txParams = {
      data,
      to: contractAddress,
      from: userAddress,
      signatureType: 'EIP712_SIGN',
    }
    // as ethers does not allow providing custom options while sending transaction
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await provider.send('eth_sendTransaction', [txParams])

    //event emitter methods
    return new Promise((resolve, reject) => {
      biconomy?.on('error', (data: any) => {
        // Event emitter to monitor when an error occurs
        reject(data)
      })

      biconomy?.on('txMined', (data: { msg: string; id: string; hash: string; receipt: string }) => {
        resolve(data)
      })
    })
  }

  const callStandardMetaTxMethod = async (
    contractAddress: string,
    contractAbi: ContractInterface,
    userAddress: string,
    methodName: string,
    attr: Array<unknown>,
  ): Promise<{ msg: string; id: string; hash: string; receipt: string } | any> => {
    const contract = new ethers.Contract(contractAddress, contractAbi, biconomy?.ethersProvider)

    // Create your target method signature.
    const { data } = await contract.populateTransaction[methodName](...attr)

    const provider = await biconomy?.provider

    const txParams = {
      data,
      to: contractAddress,
      from: userAddress,
      signatureType: 'EIP712_SIGN',
    }

    // as ethers does not allow providing custom options while sending transaction
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await provider.send('eth_sendTransaction', [txParams])

    //event emitter methods
    return new Promise((resolve, reject) => {
      biconomy?.on('error', (data: any) => {
        // Event emitter to monitor when an error occurs
        reject(data)
      })

      biconomy?.on('txMined', (data: { msg: string; id: string; hash: string; receipt: string }) => {
        resolve(data)
      })
    })
  }

  return { callStandardMetaTxMethod, callCustomMetaTxMethod, loading, error }
}
