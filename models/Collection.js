import mongoose from "mongoose"

const CollectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        enum: ["books", "films", "sings", "games"],
        required: true,
    },
    imageUrl: String,
    tags: {
        type: Array,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},
    {
        timestamps: true,
    })

export default mongoose.model("Collection", CollectionSchema)