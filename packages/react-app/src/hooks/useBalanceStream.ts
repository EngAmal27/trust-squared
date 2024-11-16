import { GOODDOLLAR } from "@/env";
import React, { useState, useEffect, useMemo } from "react";
import { useAccount, useBalance } from "wagmi";
import { useGetMember } from "./queries/useGetMember";
import { parseEther } from "viem";

const ANIMATION_MINIMUM_STEP_TIME = 100
export const useBalanceStream = (
    account: string | undefined,
    flowRate: bigint,
) => {
    const gdBalance = useBalance({ address: account as any, token: GOODDOLLAR, query: { refetchInterval: 60000 } })

    const [balance, setBalance] = useState<bigint | undefined>(gdBalance?.data?.value);
    const [startTime, setStartTime] = useState<number>(0);

    useEffect(() => {
        setStartTime(Date.now())
    }, [gdBalance.data?.value]);


    useEffect(() => {

        let stopAnimation = false;
        let lastAnimationTimestamp = 0;

        const animationStep = (currentAnimationTimestamp: number) => {
            if (stopAnimation) {
                return;
            }
            if (gdBalance.data && currentAnimationTimestamp - lastAnimationTimestamp > ANIMATION_MINIMUM_STEP_TIME) {
                const currentTimestampBigNumber = BigInt(
                    new Date().valueOf() // Milliseconds elapsed since UTC epoch, disregards timezone.
                );
                const timePassed = BigInt(Date.now() - startTime) / 1000n
                const update = BigInt(flowRate) * timePassed;
                setBalance(gdBalance.data.value + update);
                lastAnimationTimestamp = currentAnimationTimestamp;
            }

            requestAnimationFrame(animationStep);
        };

        requestAnimationFrame(animationStep);

        return () => {
            stopAnimation = true;
        };
    }, [gdBalance, startTime]);


    return balance ? (Number(balance) / 1e18).toFixed(6) : undefined
}