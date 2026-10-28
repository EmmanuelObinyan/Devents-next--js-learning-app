import BookEvent from "@/components/BookEvent";
import {Suspense} from 'react'
import { notFound } from "next/navigation";
import { getSimilarEventsBySlug } from "@/lib/actions/event-actions";
import {IEvent} from '@/models/Events.model'
import EventCard from "@/components/EventCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row gap-2 items-center">
    <img src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventListDetails = async ({ params }: PageProps) => {
  const { slug } = await params;
  let data;
  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!request.ok) {
      if (request.status === 404) {
        notFound();
      }

      throw new Error(`Failed to fetch event: ${request.statusText}`);
    }

    const response = await request.json();
    data = response.data;

    if (!data) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = data;

  const bookings = 10;

  const similarEvents:IEvent[] =await getSimilarEventsBySlug(slug)
  return (
    <section id="event">
      <div className="header">
        <h1>Event description</h1>
        <p className="">{description}</p>
      </div>

      <div className="details">
        {/* left side- event content */}
        <div className="content">
          <img
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-2 gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/web/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem
              icon="/web/icons/clock.svg"
              alt="clock"
              label={time}
            />
            <EventDetailItem
              icon="/web/icons/pin.svg"
              alt="pin"
              label={location}
            />
            <EventDetailItem
              icon="/web/icons/mode.svg"
              alt="mode"
              label={mode}
            />
            <EventDetailItem
              icon="/web/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>
          <EventAgenda agendaItems={agenda } />
          <section className="flex-col gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>
        {/* right side - booking form */}
        <div className="content">
          <aside className="signup-card">
            <p className="text-lg font-semibold">Book Your spot</p>
            {bookings > 0 ? (
              <p className="text-sm">
                join {bookings} people who have already booked their spot
              </p>
            ) : (
              <p className="text-sm">be the first to book your spot</p>
            )}
            <BookEvent />
          </aside>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>
          {
            similarEvents.length > 0 && similarEvents.map((card: IEvent)=>(
              <EventCard key={card.slug} {...card} />
            ))
          }
      </div>
    </section>
  );
};

const EventSlug = ({ params }: PageProps) => {

  return (
    <Suspense fallback={<p>Loading event...</p>}>
      <EventListDetails params={params} />
    </Suspense>
  );
};

export default EventSlug;