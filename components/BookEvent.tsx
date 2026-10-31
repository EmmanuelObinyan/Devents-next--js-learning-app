"use client"
import { createBooking } from '@/lib/actions/booking-actions'
import React from 'react'
import {useState} from 'react'
type Props={
    eventId:string
}
const BookEvent = ({eventId}:Props) => {
    const[email,setEmail]=useState('')
    const[submitted,setSubmitted]=useState<Boolean>(false)

    const handleSubmit=async(e:React.FormEvent)=>{
            e.preventDefault()

            const {success, error} = await createBooking({eventId , email})

         if(success){
             setSubmitted(true)
         }
         else{
            console.error('booking creating failed', error)
         }
    }
  return (
    <div id="book-event">
        {
            submitted ? (
                <p className="text-sm">
                   thank you for signing up!
                </p>
            ):(
                <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email">Email Address</label>
              <input 
              placeholder="Enter your email address"
              id="email"
              type="email"
               value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <button type="submit" className="button-submit">Submit</button>
                </form>
            )
        }
        </div>
  )
}

export default BookEvent