import mongoose, { Schema, Document } from 'mongoose';

export interface IShelter extends Document {
    id: string;
    name: string;
    distance: string;
    distanceValue: number;
    isOpen: boolean;
    bedsAvailable: number;
    totalBeds: number;
    amenities: {
        beds: boolean;
        wifi: boolean;
        food: boolean;
        medical: boolean;
        nightStay: boolean;
    };
    filters: string[];
    phone: string;
    address: string;
    description: string;
    imageUrl: string;
    hours: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

const ShelterSchema = new Schema<IShelter>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        distance: { type: String, required: true },
        distanceValue: { type: Number, required: true },
        isOpen: { type: Boolean, default: true },
        bedsAvailable: { type: Number, default: 0 },
        totalBeds: { type: Number, default: 0 },
        amenities: {
            beds: { type: Boolean, default: false },
            wifi: { type: Boolean, default: false },
            food: { type: Boolean, default: false },
            medical: { type: Boolean, default: false },
            nightStay: { type: Boolean, default: false },
        },
        filters: [{ type: String }],
        phone: { type: String, required: true },
        address: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        hours: { type: String, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    { timestamps: true }
);

export default mongoose.model<IShelter>('Shelter', ShelterSchema);
