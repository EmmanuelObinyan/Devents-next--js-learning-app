 import {NextRequest,NextResponse} from 'next/server'
 import {v2 as cloudinary} from 'cloudinary'
import  dbConnect from '@/lib/mongodb'
import { Event } from '@/models/index'
 export async function POST(req : NextRequest) {
       try{
           await dbConnect();
           const formData= await req.formData()
          const event = Object.fromEntries(formData.entries())
          const file=formData.get('image') as File

             if(!file) return NextResponse.json({message:'image file is required'},{status:400})
           let tags= JSON.parse(formData.get('tags') as string);
          let agenda= JSON.parse(formData.get('agenda') as string);
           
           
              // cloudinary image upload code snippet 
          const arraybuffer = await file.arrayBuffer();
          const buffer=Buffer.from(arraybuffer)


          // cloudinary code document for uploading image
          const uploadResult= await new Promise((resolve,reject) =>{
            cloudinary.uploader.upload_stream({resource_type :'image',folder:'Devent'},(error, results) =>{
              if(error) return reject(error)

                resolve(results)
            }).end(buffer)
          })
          // cloudinary code in the docs
          event.image = (uploadResult as {secure_url : string}).secure_url;
           const createEvent= await Event.create({...event,
            tags:tags,
            agenda:agenda
           })
           return NextResponse.json({message:'Event created successfully' , event:createEvent},{status:201})
       }
       catch(e){
         console.error('Event creation failed:', e)

    if (e instanceof Error && e.name === 'ValidationError') {
      return NextResponse.json(
        {
          message: 'Event validation failed',
          error: e.message,
          name:e.name
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 500 }
    )
       }
 }


 export async function GET(){
   try{
  await dbConnect();
  const events = await Event.find().sort({createdAt: -1})

  return NextResponse.json({message:'Event fetched successfully',events}, {status : 200})
   }
   catch(e){
     return NextResponse.json({message:'Event fetching failed' ,error:e},{status:500})
   }
 }

