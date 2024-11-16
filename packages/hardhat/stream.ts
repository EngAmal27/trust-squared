import { Framework } from '@superfluid-finance/sdk-core';

import { TrustPool } from '../typechain-types';
import { ethers, network } from 'hardhat';

const add = async () => {
    const trustpool = "0xdf1678797300F45cE221c18c6Dc5ae208a5040C5"

    const pool = await ethers.getContractAt("TrustPool", trustpool);
    await pool.addMember("0x6d25941a5ac05bcc2245b20c6d45c5de0ace7fe5", 1);
}
const stream = async () => {
    const signers = await ethers.getSigners()
    const senderSigner = signers[0]
    const trustpool = "0xdf1678797300F45cE221c18c6Dc5ae208a5040C5"
    const trustee = "0xA48840D89a761502A4a7d995c74f3864D651A87F"


    const pool = await ethers.getContractAt("TrustPool", trustpool);
    await pool.addMember("0xE1b92902d47c00155fFb159155354F49f60Ba87d", 1);
    await pool.addMember(senderSigner.address, 1);
    await pool.addMember(trustee, 1);

    const monthlyTrustFlow = ethers.constants.WeiPerEther.mul(100).div(60 * 60 * 24 * 30)
    const opts = {
        chainId: 42220,
        provider: ethers.provider as any,
        resolverAddress: "0x05eE721BD4D803d6d477Aa7607395452B65373FF",
        // protocolReleaseVersion: 'test',
    };
    const sf = await Framework.create(opts);
    const st = await sf.loadSuperToken("0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A")
    const balance = await st.balanceOf({ account: senderSigner.address, providerOrSigner: ethers.provider })
    console.log({ balance })
    const userData = ethers.utils.defaultAbiCoder.encode(["address", "int96"], [trustee, monthlyTrustFlow])
    const tx = await st.createFlow({ sender: senderSigner.address, receiver: trustpool, flowRate: monthlyTrustFlow.toString(), userData }).exec(senderSigner)
    console.log(tx)

}
add()