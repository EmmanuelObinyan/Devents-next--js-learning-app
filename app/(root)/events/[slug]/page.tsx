import React from 'react'

const EventListDetails = async ({ searchParams }: { searchParams: Promise<{ slug: string }> }) => {
  const { slug } = await searchParams;

  return <div>Event Details for {slug}</div>;
};

export default EventListDetails;