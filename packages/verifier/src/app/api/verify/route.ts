import { ethers } from "ethers";
import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions';

import ABI from "../../../../abi/TrustPool.json"
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

const provider = new ethers.providers.JsonRpcProvider({
  skipFetchSetup: true,
  url: 'https://forno.celo.org'
})
const mainnet = new ethers.providers.JsonRpcProvider({
  skipFetchSetup: true,
  url: 'https://cloudflare-eth.com'
})
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string).connect(provider)
const poolContract = new ethers.Contract(process.env.POOL_CONTRACT as string, ABI.abi).connect(wallet)
const identityContract = new ethers.Contract("0xC361A6E67822a0EDc17D899227dd9FC50BD62F42" as string, ["function getWhitelistedRoot(address) external view returns(address)"]).connect(provider)
const nounsContract = new ethers.Contract("0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03", ["function balanceOf(address) external view returns(uint256)"]).connect(mainnet)

export async function GET(request: NextRequest) {

  const memberAddress = request.nextUrl.searchParams.get("address")
  let isGoodID = false
  let isNoun = false
  if (memberAddress) {
    const root = await identityContract.getWhitelistedRoot(memberAddress);
    isGoodID = root.toLowerCase() === memberAddress.toLowerCase()
    const nouns = await nounsContract.balanceOf(memberAddress)
    isNoun = Number(nouns) > 0


    if (isGoodID) {
      try {
        await poolContract.addMember(memberAddress, 1)
      }
      catch (e) {
        console.log("failed adding goodid member")
      }


    }
    if (isNoun) {
      try {
        await poolContract.addMember(memberAddress, 3)
      }
      catch (e) {
        console.log("failed adding noun member")
      }
    }
  }


  return new Response(JSON.stringify({ isGoodID, isNoun }), { headers: { "content-type": "application/json" } });
}