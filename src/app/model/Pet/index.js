import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Pet = new Schema({
    tutor_id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    born_when: {
        type: Date,
        default: Date.now,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('pet', Pet);