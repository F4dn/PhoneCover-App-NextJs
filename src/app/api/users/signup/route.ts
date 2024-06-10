import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import {NextRequest , NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(req : NextRequest){
    try {
        const reqBody = await req.json();
        const  {userName , email , password} = reqBody;
        // validation
        console.log(reqBody);
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error : "user already exists"} , {status : 400});
        }

        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password , salt);
        const newUser = new User({userName , email , password : hashedPassword});
        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email

        await sendEmail({email, emailType : "VERIFY" , userId : savedUser._id});

        return NextResponse.json({
            message : "User registered sucessully",
            success : true,
            savedUser
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500});
    }
}