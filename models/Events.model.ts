import mongoose,{Schema,Model,models} from 'mongoose'
import slugify from 'slugify'
import { normalizeEventDate,normalizeEventTime } from '@/lib/event-normalizers';
// typescript interface for event document
export interface IEvent{
  title:string;
  slug:string;
  description:string;
  overview:string;
  image:string;
  venue:string;
  location:string;
  date:string;
  time:string;
//   Mormalized event start date and event
  startAt:Date, 
  mode:'online' | 'offline' | 'hybrid';
  audience:string;
  agenda:string[];
  organizer:string;
  tags:string[];
  createdAt:Date;
  updatedAt:Date;
}

   const EventSchema = new Schema<IEvent>(
     {
        title:{
            type:String,
            trim:true,
            required:[true,'title is required'],
            minlength:[10,'title cannot be shorter than 10 characters'],
            maxlength:[100, 'title cannot exceed 100 characters']
        },
        slug:{
             type:String,
             unique:true,
             lowercase:true,
             trim:true
        }
        ,description:{
            type:String,
            trim:true,
            // validators
            required:[true,'overview is required'],
            maxlength:[1000,'description cannot exceed 1000 characters']
        },
        overview:{
            type:String,
            trim:true,
            required:[true,'overview is required'],
            maxlength:[500,'overview cannot exceed 500 characters']
        },
        image:{
            type:String,
            required:[true, 'image URL is required'],
            trim:true
        },
         venue:{
            type:String,
            required:[true, 'venue is required'],
            trim:true
         },
         location:{
            type:String,
            required:[true,'location is required'],
            trim:true
         },
         date:{
            type:String,
            required:[true,'date is required'],
            match: [
        /^\d{4}-\d{2}-\d{2}$/,
        "Date must use YYYY-MM-DD format",
      ],

         },
         time:{
            type:String,
            required:[true,'time is required'],
                  match: [
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Time must use 24-hour HH:mm format",
      ],
         },
         mode:{
            type:String,
            required:[true,'mode is required'],
            enum:{
                values:['online','offline','hybrid'],
                message:'mode must be either online, offline or hybrid',
            }
         },
         audience:{
            type:String,
            required:[true,'audience is required'],
            trim:true
         },
         agenda: {
            type:[String],
            required:[true, 'agenda is required'],
            validate:{
                validator:(v:string[]) => v.length > 0,
                message:'at least one agenda item is required',
            }
         },
         organizer: {
           type: String,
           required:[true,'organizer is required'],
           trim:true
         },
         tags :{
            type:[String],
            required:[true,'tags are required'],
            validate:{
                validator:(v:string[]) => v.length > 0,
                message : 'at least one tag is required'
            }
         }
   },
     {
        timestamps: true ,  
     }
   )

   // Generate the slug before saving a new or modified title.
EventSchema.pre("validate", function () {
  if (this.time) {
    console.log("Before normalization:", this.time);

    this.time = normalizeEventTime(this.time);

    console.log("After normalization:", this.time);
  }

  if (this.date) {
    this.date = normalizeEventDate(this.date);
  }

  if (this.isModified("title") && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
});
   const Event: Model<IEvent>= (models.Event as Model<IEvent>) || mongoose.model<IEvent>('Event',EventSchema)

   export default Event;