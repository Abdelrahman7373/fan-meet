'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({ setIsSetupComplete }: {setIsSetupComplete: (value: boolean) => void}) => {
  const [isMicCamON, setIsMicCamON] = useState(false);


  const call = useCall();

  if(!call) throw new Error('useCall must be used within StreamCall Component!!!!!!!!');


  useEffect(() => {
    if(isMicCamON) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamON, call?.camera, call?.microphone]);


  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input type='checkbox' checked={isMicCamON} onChange={(e) => setIsMicCamON(e.target.checked)} />
          Join with Mic and Camera Off
        </label>
        <div className="text-white">
          <DeviceSettings />
        </div>
      </div>
      <Button className='relative bottom-2 rounded-md bg-green-500 px-4 py-2.5 text-white hover:bg-green-400' onClick={() => {call.join(); setIsSetupComplete(true);}}>
        Join Meeting Now!
      </Button>
    </div>
  )
}

export default MeetingSetup
