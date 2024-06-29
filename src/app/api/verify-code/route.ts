import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username: decodedUsername})

        if(!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 500 }
            )
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date() // user code expiry shall be more than present time 

        if(isCodeValid && isCodeNotExpired) {
            // since user is saved, then send message 
            user.isVerified = true
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "Account Verified Successfully"
                }, 
                { status: 200}
            )

        } 
        // if code is expired 
        else if(!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Code has Expired. Please sign up again to get the new code"
                },
                { status: 400 }
            )
        }

        //if code is incorrect
        else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification Code"
                },
                { status: 400}
            )
        }

    } catch (error) {
        console.error("Error checking verification code", error)
        return Response.json(
            {
                success: false,
                message: "Error checking verification code"
            },
            { status: 500 } 
        )
    }
}

