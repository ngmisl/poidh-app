import React, { useEffect, useState } from 'react';

import { useBountyContext } from '@/components/bounty/BountyProvider';
import NoProof from '@/components/bounty/NoProof';
import ProofList from '@/components/bounty/ProofList';
import Voting from '@/components/bounty/Voting';

import {  bountyCurrentVotingClaim, getClaimsByBountyId} from '@/app/context/web3';

import { Claim } from '@/types/web3';




const BountyProofs = ({ bountyId }: { bountyId: string }) => {
  const [claimsData, setClaimsData] = useState<Claim[] | null>(null);
  const [currentVotingClaim, setCurrentVotingClaim] = useState<number | null>(null); 
  const { isMultiplayer, isOwner, bountyData, isBountyClaimed} = useBountyContext()!;



  useEffect(() => {
    // setYouOwner(null); 
    if (bountyId) {
      // getParticipants(bountyId)
      // .then((openBounty) => { 
      //   setOpenBounty(openBounty.addresses.length === 0 ? false : true);
      // })
      // .catch(console.error);  
      getClaimsByBountyId(bountyId)
      .then(data => setClaimsData(data))
      .catch(console.error);
  
      (async () => {
        const currentVotingClaim = await bountyCurrentVotingClaim(bountyId);
        setCurrentVotingClaim(currentVotingClaim);
      })();
    }
  }, [bountyId]);
  

  console.log("current voting claim:", currentVotingClaim)

  return (
    <div>
      <div className='flex flex-col gap-x-2 py-4 border-b border-dashed'>
      {/* <div>Currently voting on: {currentVotingClaim === 0 ? "no claim for vote selected" : currentVotingClaim}</div> */}
      <div>
      <span>({claimsData ? claimsData.length : 0})</span>
      <span>claims</span></div>
      </div>
      {claimsData && claimsData.length > 0 ? 
      <ProofList bountyId={bountyId} currentVotingClaim={currentVotingClaim}  openBounty={isMultiplayer} youOwner={isOwner}  data={claimsData} /> 
      : <NoProof bountyId={bountyId}/>
      } 
      
     




    </div>
  );
};

export default BountyProofs;