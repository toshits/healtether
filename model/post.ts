import Mongoose from "mongoose";

const postSchema = new Mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    deletedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

export const Post = Mongoose.model('post', postSchema)