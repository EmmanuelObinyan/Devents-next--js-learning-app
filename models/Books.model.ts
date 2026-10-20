import mongoose,{Schema,models,Model,Types} from 'mongoose'
import Event from './Events.model'
export interface IBooking{
 eventId:mongoose.Types.ObjectId;
 email:string;
 createdAt:Date;
 updatedAt:Date;
}

const BookingSchema =new Schema <IBooking>(
  {
     eventId:{
        type:Schema.Types.ObjectId,
        ref:'Event',
        required:[true,'Event ID is required'],
     },
     email:{
        type:String,
        required:[true,'Email is required'],
        trim: true,
        lowercase:true,
        validate:{
            validator : function (email: string) {
                // RFC 5322 compliant email validation regex
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegex.test(email);
            },
              message:'please provide a valid email address'
            }
        }
     },
     {
         timestamps: true
     }
)

// Check that the referenced event exists before saving.
BookingSchema.pre("save", async function () {
  const eventExists = await Event.exists({
    _id: this.eventId,
  });

  if (!eventExists) {
    throw new Error("Cannot book: the specified event does not exist.");
  }
});

// Prevent the same email from booking the same event twice.
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true }
);

// Support finding all bookings belonging to an email.
BookingSchema.index({ email: 1 });

// index on an eventId for faster queries
BookingSchema.index({eventId:1})

const Booking: Model<IBooking> =
  (models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;