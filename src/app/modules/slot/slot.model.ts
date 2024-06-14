import { model, Schema } from 'mongoose';
import { ISlot } from './slot.interface';

const slotSchema = new Schema<ISlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

export const Slot = model<ISlot>('Slot', slotSchema);
