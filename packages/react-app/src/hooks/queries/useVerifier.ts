import { useAccount } from "wagmi";
import { API_URL } from '../../env'
import { VerifierResult, type Member } from "@/types";
import { useGenericQuery } from "./useGenericQuery";
const verifyMember = async (address?: string) => {
    if (!address) return
    return fetch(API_URL + `/api/verify?address=${address}`).then(res => res.json()) as Promise<VerifierResult>
}
export const useVerifyMember = (memberId: `0x${string}` | undefined) => {
    const queryKey = ["verifierResult", memberId || ''];
    const queryFn = () => verifyMember(memberId);
    return useGenericQuery(queryKey, queryFn);
};

export const useVerifier = () => {
    const account = useAccount()
    return useVerifyMember(account?.address)
}