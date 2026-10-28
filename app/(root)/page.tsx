import React from "react";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {Suspense} from 'react'
import {IEvent} from '@/models/Events.model'
// import { events } from "@/lib/constant";

const base_url=process.env.NEXT_PUBLIC_BASE_URL
async function Eventlist(){
    
    const response = await fetch(`${base_url}/api/events`);
    const { events } = await response.json()
  return (
                <div className="mt-20 space-y-7">
                    <h3>Featured Events</h3>
 
                    <ul className="events">
                       { events && events.length > 0 &&
                        events.map((event :IEvent)=>(
                            <li key={event.title} className="list-none" >
                               <EventCard {...event} />
                            </li>
                        ))
                       }
                    </ul>
                </div>
  );
}


export default function Homepage(){
    return(
        <section> 
          <h1 className="text-center capitalize">the Hub for every dev <br /> Event You can't Miss</h1>
           <p className="text-center mt-5">Hackathons eventlist, Meetups and Conferences All in one Place</p>
           <ExploreBtn />
           <Suspense fallback={<p>..loading</p>}>
              <Eventlist/>
            </Suspense>
        </section>
    )
}