import { Framework } from '@superfluid-finance/sdk-core';

import { TrustPool } from '../typechain-types';
import { ethers, network } from 'hardhat';

const trustpool = "0x559Fc954873E175Ad8e0334cad4b80CB6D9f1A99"
const add = async () => {

    const pool = await ethers.getContractAt("TrustPool", trustpool);
    await pool.addMember("0x6d25941a5ac05bcc2245b20c6d45c5de0ace7fe5", 1);
    await pool.addMember("0xE1b92902d47c00155fFb159155354F49f60Ba87d", 1);
    await pool.addMember("0xEE0eD5B7756A3ee8e01C0D5e7b707DB2794900ee", 1);
    await pool.addMember("0xDe348c7Ccd3060Eb7911c5fF9Dd4c93bC8D34B8F", 1);
    await pool.addMember("0x2CeADe86A04e474F3cf9BD87208514d818010627", 1);


}
const stream = async () => {
    const signers = await ethers.getSigners()
    const senderSigner = signers[0]
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
// stream()