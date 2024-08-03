import CallList from '@/components/CallList';
import React from 'react'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-10'>
      <h1 className='text-3xl font-bold'>Previous Meetings</h1>
      <CallList type="previous" />
    </section>
  )
}

export default Previous;
