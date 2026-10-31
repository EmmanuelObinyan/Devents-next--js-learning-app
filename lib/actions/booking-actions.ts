"use server"

import { Booking } from "@/models";
import dbConnect from "../mongodb";

export const createBooking= async({eventId,email}:{eventId:string; email:string})=>{
   try{
  await dbConnect();
  await Booking.create({
    eventId,
    email,
  })
   return{success:true}
   }
   catch(err){
      console.error("create booking failed", err);
      return{success:false, error:err}
   }
}