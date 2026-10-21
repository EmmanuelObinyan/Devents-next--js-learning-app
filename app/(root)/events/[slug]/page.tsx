
import React, { Suspense } from 'react';
import {notFound} from 'next/navigation'
type Props = {
  params: Promise<{ slug: string }>;
};

const EventDetails = async ({ params }: Props) => {
  const { slug } = await params;
 
  return <div>Event Details for {slug}</div>;
};

const EventListDetails = ({ params }: Props) => {
  return (
    <Suspense fallback={<p>Loading event details...</p>}>
      <EventDetails params={params} />
    </Suspense>
  );
};

export default EventListDetails;
