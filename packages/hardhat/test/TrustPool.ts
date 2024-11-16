import { deploySuperGoodDollar } from '@gooddollar/goodprotocol';
import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { deployTestFramework } from '@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework';
import { Framework } from '@superfluid-finance/sdk-core';

import { expect } from 'chai';
import { TrustPool } from '../typechain-types';
import { ethers, network } from 'hardhat';

type SignerWithAddress = Awaited<ReturnType<typeof ethers.getSigner>>;

const coder = ethers.utils.defaultAbiCoder

describe('Trust Superapp', () => {
    let signer: SignerWithAddress;
    let signers: SignerWithAddress[];
    let gdframework: Awaited<ReturnType<typeof deploySuperGoodDollar>>;
    let sfFramework: any = {};
    let sf: Framework;
    const baseFlowRate = BigInt(400e9).toString(); //enough to pass min flow rate of 386e9
    let pool: TrustPool

    before(async () => {
        signers = await ethers.getSigners();
        const { frameworkDeployer } = await deployTestFramework();
        sfFramework = await frameworkDeployer.getFramework();
        // initialize framework
        const opts = {
            chainId: network.config.chainId || 31337,
            provider: ethers.provider as any,
            resolverAddress: sfFramework.resolver,
            protocolReleaseVersion: 'test',
        };
        sf = await Framework.create(opts);

        gdframework = await deploySuperGoodDollar(signers[0], sfFramework, [
            ethers.constants.AddressZero,
            ethers.constants.AddressZero,
        ]);
        signer = signers[0];
    });

    const fixture = async () => {
        const f = await ethers.getContractFactory('TrustPool');

        pool = await ethers.deployContract('TrustPool', [sfFramework['host']], {
        }) as TrustPool;




    };

    beforeEach(async function () {
        await loadFixture(fixture);
    });

    it('should not be able to stream G$s if not on same id system', async () => {
        const recipient = signers[1];
        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 2)
        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());
        const userData = coder.encode(["address", "int96"], [recipient.address, baseFlowRate])
        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx).revertedWith(/mutual/)


    });

    it('should be able to stream G$s if on same id system', async () => {
        const recipient = signers[1];
        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());
        console.log({ beforeBalance, baseFlowRate })
        const userData = coder.encode(["address", "int96"], [recipient.address, baseFlowRate])
        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted
        await time.increase(5);

        const expectedFlow = beforeBalance.add(Number(baseFlowRate) * 5)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).gte(expectedFlow);
        const trustlink = await pool.trusts(ethers.utils.keccak256(coder.encode(["address", "address"], [signer.address, recipient.address])));

        expect(trustlink.flowRate).equal(baseFlowRate);
        expect(trustlink.trustee).eq(recipient.address);
        expect(trustlink.idtype).eq(1);

        const trustlink2 = await pool.memberTrusts(signer.address, 0)
        expect(trustlink2).equal(ethers.utils.keccak256(coder.encode(["address", "address"], [signer.address, recipient.address])))

    });

    it('should be able to stream G$s if on same id system to two recipients', async () => {
        const recipient = signers[1];
        const recipient2 = signers[2];

        pool.addMember(recipient.address, 1)
        pool.addMember(recipient2.address, 1)
        pool.addMember(signer.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());
        const userData = coder.encode(["address", "int96"], [recipient.address, baseFlowRate])
        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted
        await time.increase(5);

        const userData2 = coder.encode(["address", "int96"], [recipient2.address, baseFlowRate])

        const tx2 = st
            .updateFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: (+baseFlowRate * 2).toString(), userData: userData2 })
            .exec(signer);
        await expect(tx2).not.reverted

    });

    it('should be able to stream G$s if on same id system from two trusters', async () => {
        const recipient = signers[1];
        const truster2 = signers[2];

        pool.addMember(recipient.address, 1)
        pool.addMember(truster2.address, 1)
        pool.addMember(signer.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        await gdframework.GoodDollar.mint(truster2.address, ethers.constants.WeiPerEther);

        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());
        const userData = coder.encode(["address", "int96"], [recipient.address, baseFlowRate])
        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted

        const tx2 = st
            .createFlow({ receiver: pool.address.toString(), sender: truster2.address, flowRate: baseFlowRate, userData })
            .exec(truster2);
        await expect(tx2).not.reverted

        let recipientFlow = await st.getFlow({ providerOrSigner: ethers.provider, sender: pool.address, receiver: recipient.address });
        expect(recipientFlow.flowRate).eq((Number(baseFlowRate) * 2).toString())

        let multiTrustScore = await pool.trustScore(recipient.address)
        expect(multiTrustScore).gt(0)

        await expect(st.deleteFlow({ sender: truster2.address, receiver: pool.address }).exec(truster2)).not.reverted
        await expect(st.deleteFlow({ sender: signer.address, receiver: pool.address }).exec(signer)).not.reverted


        console.log(await st.getFlow({ providerOrSigner: ethers.provider, sender: signer.address, receiver: pool.address }));
        console.log(await st.getFlow({ providerOrSigner: ethers.provider, sender: truster2.address, receiver: pool.address }));

        multiTrustScore = await pool.trustScore(recipient.address)

        recipientFlow = await st.getFlow({ sender: pool.address, receiver: recipient.address, providerOrSigner: ethers.provider })
        expect(Number(recipientFlow.flowRate)).eq(0)
        expect(multiTrustScore).eq(0)

    });

    it('should not be able to create stream of G$s if wrong flow rate', async () => {
        const recipient = signers[1];
        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        const userData = coder.encode(["address", "int96"], [recipient.address, Number(baseFlowRate) * 2])
        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx).revertedWith(/mismatch/)

    });

    it('should be able to update stream of G$s if correct flow rate', async () => {
        const recipient = signers[1];
        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        let userData = coder.encode(["address", "int96"], [recipient.address, baseFlowRate])
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());

        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted


        const newFlowRate = (Number(baseFlowRate) * 2).toString()
        userData = coder.encode(["address", "int96"], [recipient.address, newFlowRate])

        const tx2 = st
            .updateFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: newFlowRate, userData })
            .exec(signer);
        await expect(tx2).not.reverted
        await time.increase(5);

        const expectedFlow = beforeBalance.add(Number(newFlowRate) * 5)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).gte(expectedFlow);
        const trustlink = await pool.trusts(ethers.utils.keccak256(coder.encode(["address", "address"], [signer.address, recipient.address])));

        expect(trustlink.flowRate).equal(newFlowRate);
        expect(trustlink.trustee).eq(recipient.address);
        expect(trustlink.idtype).eq(1);

    });

    it('should be able to reduce stream of G$s', async () => {
        const recipient = signers[1];
        const newFlowRate = (Number(baseFlowRate) * 2).toString()

        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        let userData = coder.encode(["address", "int96"], [recipient.address, newFlowRate])
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());

        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: newFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted


        userData = coder.encode(["address", "int96"], [recipient.address, baseFlowRate])

        const tx2 = st
            .updateFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: baseFlowRate, userData })
            .exec(signer);
        await expect(tx2).not.reverted
        await time.increase(5);

        const expectedFlow = beforeBalance.add(Number(newFlowRate) * 5)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).not.gte(expectedFlow);
        const trustlink = await pool.trusts(ethers.utils.keccak256(coder.encode(["address", "address"], [signer.address, recipient.address])));

        expect(trustlink.flowRate).equal(baseFlowRate);
        expect(trustlink.trustee).eq(recipient.address);
        expect(trustlink.idtype).eq(1);

    });

    it('should be able to delete stream of G$s', async () => {
        const recipient = signers[1];
        const truster2 = signers[2];
        const newFlowRate = (Number(baseFlowRate) * 2).toString()

        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 1)
        pool.addMember(truster2.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        await gdframework.GoodDollar.mint(truster2.address, ethers.constants.WeiPerEther);

        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        let userData = coder.encode(["address", "int96"], [recipient.address, newFlowRate])
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());

        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: newFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted
        await time.increase(5);

        const tx2 = st
            .deleteFlow({ receiver: pool.address.toString(), sender: signer.address })
            .exec(signer);
        await expect(tx2).not.reverted
        const expectedFlow = beforeBalance.add(Number(baseFlowRate) * 5)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).gte(expectedFlow);
        const trustlink = await pool.trusts(ethers.utils.keccak256(coder.encode(["address", "address"], [signer.address, recipient.address])));

        console.log(recipient.address)
        expect(trustlink.trustee).eq(recipient.address);
        expect(trustlink.flowRate).equal(0);
        expect(trustlink.idtype).eq(1);

    });

    it('should only reduce stream when one truster stream is deleted', async () => {
        const recipient = signers[1];
        const truster2 = signers[2];
        const newFlowRate = (Number(baseFlowRate) * 2).toString()

        pool.addMember(recipient.address, 1)
        pool.addMember(signer.address, 1)
        pool.addMember(truster2.address, 1)

        await gdframework.GoodDollar.mint(signer.address, ethers.constants.WeiPerEther);
        await gdframework.GoodDollar.mint(truster2.address, ethers.constants.WeiPerEther);

        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        let userData = coder.encode(["address", "int96"], [recipient.address, newFlowRate])
        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());

        const tx = st
            .createFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: newFlowRate, userData })
            .exec(signer);
        await expect(tx).not.reverted
        const tx2 = st
            .createFlow({ receiver: pool.address.toString(), sender: truster2.address, flowRate: newFlowRate, userData })
            .exec(truster2);
        await expect(tx2).not.reverted
        await time.increase(5);


        let recipientFlow = await st.getFlow({ sender: pool.address, receiver: recipient.address, providerOrSigner: ethers.provider })
        expect(Number(recipientFlow.flowRate)).eq(Number(newFlowRate) * 2)
        const tx3 = st
            .deleteFlow({ receiver: pool.address.toString(), sender: signer.address })
            .exec(signer);
        await expect(tx3).not.reverted

        const expectedFlow = beforeBalance.add(Number(baseFlowRate) * 5)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).gte(expectedFlow);
        const trustlink = await pool.trusts(ethers.utils.keccak256(coder.encode(["address", "address"], [signer.address, recipient.address])));

        expect(trustlink.trustee).eq(recipient.address);
        expect(trustlink.flowRate).equal(0);
        expect(trustlink.idtype).eq(1);

        const trustlink2 = await pool.trusts(ethers.utils.keccak256(coder.encode(["address", "address"], [truster2.address, recipient.address])));

        expect(trustlink2.trustee).eq(recipient.address);
        expect(trustlink2.flowRate).not.equal(0);
        expect(trustlink2.idtype).eq(1);

        recipientFlow = await st.getFlow({ sender: pool.address, receiver: recipient.address, providerOrSigner: ethers.provider })
        expect(recipientFlow.flowRate).eq(newFlowRate)

    });

    it('should have better trust score for multi trusts vs one', async () => {
        const recipient = signers[1];
        const recipient2 = signers[2];
        const newFlowRate = (Number(baseFlowRate) * 2).toString()
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        let userData = coder.encode(["address", "int96"], [recipient.address, newFlowRate])
        let userData2 = coder.encode(["address", "int96"], [recipient2.address, ethers.BigNumber.from(newFlowRate).mul(signers.length).toString()])

        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());

        await pool.addMember(recipient.address, 1)
        await pool.addMember(recipient2.address, 1)


        for (let truster of signers) {
            if (truster == recipient)
                continue;
            await pool.addMember(truster.address, 1)
            await gdframework.GoodDollar.mint(truster.address, ethers.constants.WeiPerEther);
            const tx = st
                .createFlow({ receiver: pool.address.toString(), sender: truster.address, flowRate: newFlowRate, userData })
                .exec(truster);
            await expect(tx).not.reverted
        }
        const tx = st
            .updateFlow({ receiver: pool.address.toString(), sender: signer.address, flowRate: ethers.BigNumber.from(newFlowRate).mul(signers.length + 1).toString(), userData: userData2 })
            .exec(signer);
        await (await tx).wait()
        await expect(tx).not.reverted
        await time.increase(5);


        let recipientFlow = await st.getFlow({ sender: pool.address, receiver: recipient.address, providerOrSigner: ethers.provider })
        expect(Number(recipientFlow.flowRate)).gte(Number(newFlowRate) * 8)

        const expectedFlow = beforeBalance.add(Number(baseFlowRate) * 5 * 8)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).gte(expectedFlow);

        const multiTrustScore = await pool.trustScore(recipient.address)
        const singleTrustScore = await pool.trustScore(recipient2.address)
        expect(multiTrustScore.div(singleTrustScore)).gt(10) // multi trust score is at least 10 times better

    });

    it.skip('should have zero trust score when flows are removed', async () => {
        const recipient = signers[1];
        const newFlowRate = (Number(baseFlowRate) * 2).toString()
        const st = await sf.loadSuperToken(gdframework.GoodDollar.address.toString());
        let userData = coder.encode(["address", "int96"], [recipient.address, newFlowRate])

        const beforeBalance = await gdframework.GoodDollar.balanceOf(pool.address.toString());

        await pool.addMember(recipient.address, 1)


        for (let truster of signers) {
            if (truster == recipient)
                continue;
            await pool.addMember(truster.address, 1)
            await gdframework.GoodDollar.mint(truster.address, ethers.constants.WeiPerEther);
            const tx = st
                .createFlow({ receiver: pool.address.toString(), sender: truster.address, flowRate: newFlowRate, userData })
                .exec(truster);
            await expect(tx).not.reverted
        }

        // const tx = st
        //     .deleteFlow({ receiver: pool.address.toString(), sender: signers[3].address })
        //     .exec(signers[3]);

        // await (await tx).wait()
        // await (await st
        //     .deleteFlow({ receiver: pool.address.toString(), sender: signers[4].address })
        //     .exec(signers[4])).wait();
        // const tx2 = st
        //     .deleteFlow({ receiver: pool.address.toString(), sender: signers[4].address })
        //     .exec(signers[4]);
        // await expect(tx2).not.reverted

        for (let truster of signers) {
            if (truster == recipient)
                continue;

            console.log("delete flow for:", truster.address)
            const tx = st
                .deleteFlow({ receiver: pool.address.toString(), sender: truster.address })
                .exec(truster);
            await expect(tx).not.reverted
            await (await tx).wait()
        }


        let recipientFlow = await st.getFlow({ sender: pool.address, receiver: recipient.address, providerOrSigner: ethers.provider })
        expect(Number(recipientFlow.flowRate)).eq(0)

        const expectedFlow = beforeBalance.add(Number(baseFlowRate) * 5 * 8)
        expect(await gdframework.GoodDollar.balanceOf(recipient.address.toString())).gte(expectedFlow);

        const multiTrustScore = await pool.trustScore(recipient.address)
        expect(multiTrustScore).eq(0)

    });
})

