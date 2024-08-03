import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const router = useRouter();
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if(!isMeetingOwner) return null;


  return (
    <Button onClick={async () => {await call.endCall(); router.push('/');}} className='bg-[#FF3131] text-white hover:bg-[#FF3131]'>
      End Call For All
    </Button>
  )
}

export default EndCallButton