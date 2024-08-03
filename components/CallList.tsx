//@ts-nocheck

'use client';

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

const CallList = ({ type }: {type: 'previous'|'upcoming'|'recordings'} ) => {
    const { previousCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const {toast} = useToast();

    const getCalls = () => {
        switch (type) {
            case 'previous':
                return previousCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    };

    const getNoCalls = () => {
        switch (type) {
            case 'previous':
                return 'No Prevoius Meetings!';
            case 'recordings':
                return 'No Recorded Meetings!';
            case 'upcoming':
                return 'No Upcoming Meetings!';
            default:
                return '';
        }
    };


    useEffect(() => {
        try {
            const fetchRecordings = async () => {
                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []);
                const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings);
                setRecordings(recordings);
            };
    
    
            if(type === 'recordings') fetchRecordings();
        } catch (error) {
            toast({ title: 'Try Again Later' });
            console.log(error);
        }
    }, [type, callRecordings]);

    const calls = getCalls();
    const noCalls = getNoCalls();

    if(isLoading) return <Loader />;

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <MeetingCard 
        key={(meeting as Call).id} 
        icon={type === 'previous' ? '/icons/Previous_Meetings.svg' : type === 'upcoming' ? '/icons/Upcoming.svg' : '/icons/Record.svg' } 
        title={(meeting as Call).state?.custom?.description?.substring(0, 30) || meeting?.filename?.substring(0, 25) || 'Personal Meeting'} 
        date={meeting.state?.startsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || meeting.start_time.toLocaleString()}
        isPreviousMeeting={type === 'previous'}
        buttonIcon1={type==='recordings' ? '/icons/play.svg' : undefined}
        handleClick={type==='recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
        link={type==='recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
        buttonText={type ==='recordings' ? 'Play' : 'Start'}
        />
      )): (<h1>{noCalls}</h1>)}
    </div>
  )
}

export default CallList
