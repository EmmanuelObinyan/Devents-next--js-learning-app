import {NextRequest,NextResponse} from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Event } from '@/models/index'

type RouteParams ={
    params:Promise<{
        slug :string}>;
}
// GET API/EVENTS/[SLUG]
export async function GET(req:NextRequest,{params}:RouteParams){
    try{
      await dbConnect()
    //   get the slug from the URL using params
    const {slug}=await params;
    if(slug.trim() === '' || !slug || typeof slug !== "string") return NextResponse.json({error:"invalid or slug slug detail"},{status:400})
      const cleanslug=slug.toLowerCase().trim()
        const eventdata= await Event.findOne(
            {
                slug:cleanslug
            }
        ).lean()

        // check if it exists
        if(!eventdata) return NextResponse.json({
            message:`Event with slug ${cleanslug} not found`
        },{status: 404})


        return NextResponse.json({
            message:"Event gotten successfully",
            data :eventdata
        },{
            status:200
        })
    }
    catch(e){
    // error  handling
      if(process.env.NODE_ENV === "development"){
        console.error('error fetching event by slug',e)
      }
    //   handle specific error types
    if(e instanceof Error){
        // handle database connection problem
        if(e.message.includes('MONGODB_URL')){
            return NextResponse.json({  message:"Database configuration error"},{status:500})
    }

    return NextResponse.json({  message:"failed to fetch events", error:e.message},{status:500})
}
    
//  handle unknown errors
return NextResponse.json({ message:"unexpected error occured"},{status:500})

    }

}