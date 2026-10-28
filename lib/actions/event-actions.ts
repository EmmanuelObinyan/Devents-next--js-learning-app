"use server"
import dbConnect from "../mongodb"
import { Event } from "@/models";
import {serialize} from '@/lib/serialize'
export const getSimilarEventsBySlug = async(slug:string) => {
    "use cache"
  await dbConnect();

  const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean()
  if (!event) return []

  const events = await Event.find({
    _id: { $ne: event._id },
    tags: { $in: event.tags },
  }).limit(6).lean()

  return serialize(events)
}
