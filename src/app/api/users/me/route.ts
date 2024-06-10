import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import {NextRequest , NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function POST(req : NextRequest){
    const userId = await getDataFromToken(req);
    const user  = await User.findById({_id : userId}).select("-password")
    if(!user){
        return NextResponse.json({error:"Not a valid token"} , {status : 401});
    }
    return NextResponse.json({message : "User found", data : user});
}