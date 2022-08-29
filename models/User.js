import mongooose from "mongoose"

const UserSchema = new mongooose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
}, 
{
    timestamps: true,
})

export default mongooose.model("User", UserSchema)