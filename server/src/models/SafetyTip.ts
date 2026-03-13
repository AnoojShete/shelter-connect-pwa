import mongoose, { Schema, Document } from 'mongoose';

export interface ISafetyTip extends Document {
    id: string;
    title: string;
    description: string;
}

const SafetyTipSchema = new Schema<ISafetyTip>(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ISafetyTip>('SafetyTip', SafetyTipSchema);
