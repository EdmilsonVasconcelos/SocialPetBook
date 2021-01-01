import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
    tutor_id: {
        type: String
    },
    pet_id: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('post', Post);