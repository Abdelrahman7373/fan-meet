'use client';

import { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined> ();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [values, setValues] = useState({dateTime: new Date(), description: '', link: '',});
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if(!client || !user) return;

    try {
      if(!values.dateTime) {toast({title: 'Please Select a Date and Time!',});}


      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if(!call) throw new Error('Call failed!');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Meeting';

      await call.getOrCreate({
        data: {starts_at: startsAt, custom: {description}}
      })
      setCallDetails(call);

      if(!values.description) {router.push(`/meeting/${call.id}`)}

      toast({title: 'Meeting Started!',});
    } catch (error) {
      console.log(error);
      toast({title: 'Failed to create meeting!',});
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Remove the specific string from the input value
    const cleanedValue = newValue.replace(/fan-meet\.vercel\.app/g, '');
    setValues({ ...values, link: cleanedValue });
  };

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard img='/icons/add-meeting.svg' title='New Meeting' description='Start an instant meeting' className='bg-orange-1' handleClick={() => setMeetingState('isInstantMeeting')} />
      <HomeCard img='/icons/schedule.svg' title='Schedule Meeting' description='Plan your meeting' className='bg-blue-1' handleClick={() => setMeetingState('isScheduleMeeting')} />
      <HomeCard img='/icons/recordings.svg' title='View Recordings' description="Check out meetings you've recorded" className='bg-purple-1' handleClick={() => router.push('/recordings')} />
      <HomeCard img='/icons/join-meeting.svg' title='Join Meeting' description='Join meeting with invitation link' className='bg-yellow-1' handleClick={() => setMeetingState('isJoiningMeeting')} />
      {!callDetails ? (
        <MeetingModal isOpen={meetingState === 'isScheduleMeeting'} onClose={() => setMeetingState(undefined)} title='Schedule a Meeting' handleClick={createMeeting}>
          <div className="flex flex-col gap-2 5">
            <label className='text-base text-normal leading-[22px] dark:text-sky-2 text-black'>Add a Description</label>
            <Textarea className='border-none dark:bg-dark-3 bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => setValues({...values, description: e.target.value})} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label>Select Date and Time!</label>
            <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({...values, dateTime: date!})} showTimeSelect timeFormat='h:mm aa' timeIntervals={5} timeCaption='time' dateFormat='MMMM d, EEEE, yyyy, h:mm aa' className='w-full rounded dark:bg-dark-3 bg-slate-50 focus:outline-none p-2' />
          </div>
        </MeetingModal>
      ): (
        <MeetingModal isOpen={meetingState === 'isScheduleMeeting'} onClose={() => setMeetingState(undefined)} title='Meeting Scheduled' className='text-center' buttonText='Copy Meeting Link' handleClick={() => {navigator.clipboard.writeText(meetingLink); toast({ title: 'Link Copied' }); setMeetingState(undefined); window.location.reload();}} image='/icons/checked.svg' buttonIcon='/icons/copy.svg' />
      )}
      <MeetingModal isOpen={meetingState === 'isInstantMeeting'} onClose={() => setMeetingState(undefined)} title='Start a New Meeting' className='text-center' buttonText='Start Meeting' handleClick={createMeeting} />

      <MeetingModal isOpen={meetingState === 'isJoiningMeeting'} onClose={() => setMeetingState(undefined)} title='Paste The Link Here' className='text-center' buttonText='Start Meeting' handleClick={() => router.push(values.link)}>
        <Input placeholder='Invite Link' className='border-none dark:bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={handleChange} />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
