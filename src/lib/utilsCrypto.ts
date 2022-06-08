import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { provider } from 'web3-core'
import { contracts, isServer } from '@lib'

export const getUSDCBalance = async (address: string) => {
  if (isServer()) return
  // const contractAddress = envString('NEXT_PUBLIC_USDC_CONTRACT_ADDRESS')
  // const maticWeb3 = new Web3(magic?.rpcProvider as provider)
  // const contract = new maticWeb3.eth.Contract(contracts.USDC as AbiItem[], contractAddress)
  // // console.log('contract', contract.methods.balanceOf(address).call())
  // const balanceInWei = await contract.methods.balanceOf(address).call()
  // // USDC is 6 decimals
  // const sixDecimalsTokenFactor = 1000000
  // return balanceInWei / sixDecimalsTokenFactor
}

export const getEthBalance = async (address: string) => {
  if (isServer()) return
  // const maticWeb3 = new Web3(magic?.rpcProvider as provider)
  // return await maticWeb3.eth.getBalance(address).then(balance => {
  //   //   console.log('balance', balance)
  //   const result = maticWeb3.utils.fromWei(balance, 'ether')
  //   return result
  // })
}
