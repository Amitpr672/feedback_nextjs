import mongoose, {Schema, Document} from "mongoose";

//model and schema :- what & how

export interface Message extends Document{
    content: string,
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    isAcceptingMessage: boolean,
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is rewuired'],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code expiry is required"]
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) 
               ||  (mongoose.model<User>("User", UserSchema)) //updating or creating db

export default UserModel;