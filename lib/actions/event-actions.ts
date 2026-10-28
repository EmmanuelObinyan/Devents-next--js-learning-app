"use server"
import dbConnect from "../mongodb"
import { Event } from "@/models";
import {serialize} from '@/lib/serialize'
export const getSimilarEventsBySlug = async(slug:string) => {
    "use cache"
    try{
  await dbConnect();

  const event = await Event.findOne({
    slug
  })
  const events= await Event.find({_id: 
  {$ne:event?._id},tags: {$in:event?.tags}
  }).lean()

  return serialize(events)
    }
    catch{
        return []
    }
}
