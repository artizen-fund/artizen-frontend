// import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { provider } from 'web3-core'
import { isServer } from '@lib'
import { ethers } from 'ethers'

export const getUSDCBalance = async (address: string) => {
  if (isServer()) return
  // const contractAddress = envString('NEXT_PUBLIC_USDC_CONTRACT_ADDRESS')
  // const magicWeb3 = new Web3(magic?.rpcProvider as provider)
  // const contract = new magicWeb3.eth.Contract(USDCAbi as AbiItem[], contractAddress)
  // // console.log('contract', contract.methods.balanceOf(address).call())
  // const balanceInWei = await contract.methods.balanceOf(address).call()
  // // USDCAbi is 6 decimals
  // const sixDecimalsTokenFactor = 1000000
  // return balanceInWei / sixDecimalsTokenFactor
}

export const getEthBalance = async (address: string) => {
  if (isServer()) return
  // const magicWeb3 = new Web3(magic?.rpcProvider as provider)
  // return await magicWeb3.eth.getBalance(address).then(balance => {
  //   //   console.log('balance', balance)
  //   const result = magicWeb3.utils.fromWei(balance, 'ether')
  //   return result
  // })
}

export const formatUSDC = (value: number) => {
  return value ? Number(Number(ethers.utils.formatUnits(value, 6)).toFixed(2)) : 0
}

export const USDC_UNIT = 'mwei'
