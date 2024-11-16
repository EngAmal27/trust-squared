import { BigInt } from "@graphprotocol/graph-ts"
import { TrustUpdated as TrustUpdatedEvent } from "../generated/TrustPool/TrustPool"
import { Member, TrustLink, TrustUpdated } from "../generated/schema"

export function handleTrustUpdated(event: TrustUpdatedEvent): void {
  let entity = new TrustUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.truster = event.params.truster
  entity.recipient = event.params.recipient
  entity.newTrust = event.params.newTrust
  entity.totalTrusteeInFlow = event.params.totalTrusteeInFlow
  entity.totalTrusterOutFlow = event.params.totalTrusterOutFlow
  entity.prevTrustScore = event.params.prevTrustScore
  entity.newTrustScore = event.params.newTrustScore

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let recipient = Member.load(event.params.recipient)
  let truster = Member.load(event.params.truster)
  if (!recipient) {
    recipient = new Member(event.params.recipient)
    recipient.inFlowRate = BigInt.zero();
    recipient.outFlowRate = BigInt.zero();
  }

  recipient.inFlowRate = event.params.totalTrusteeInFlow
  recipient.trustScore = event.params.newTrustScore
  recipient.save()

  if (!truster) {
    truster = new Member(event.params.truster)
    truster.inFlowRate = BigInt.zero()
    truster.trustScore = BigInt.zero();
  }
  truster.outFlowRate = event.params.totalTrusterOutFlow;
  truster.save()

  let linkid = event.params.truster.toHexString() + "_" + event.params.recipient.toHexString()
  let trustlink = TrustLink.load(linkid);
  if (!trustlink) {
    trustlink = new TrustLink(linkid)
    trustlink.truster = event.params.truster
    trustlink.trustee = event.params.recipient
  }
  trustlink.flowRate = event.params.newTrust
  trustlink.save()
}
