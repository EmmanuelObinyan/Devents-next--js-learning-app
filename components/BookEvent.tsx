"use client"
import React from 'react'
import {useState} from 'react'
const BookEvent = () => {
    const[email,setEmail]=useState('')
    const[submitted,setSubmitted]=useState<Boolean>(false)

    const handleSubmit=(e:React.FormEvent)=>{
            e.preventDefault()

            setTimeout(()=>{
            setSubmitted(true)
            },1000)
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