import mongoose, { Schema, Document } from 'mongoose';

export interface IEmergencyContact extends Document {
    id: string;
    name: string;
    phone: string;
    description: string;
}

const EmergencyContactSchema = new Schema<IEmergencyContact>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IEmergencyContact>('EmergencyContact', EmergencyContactSchema);
