"use server"
import prisma from "@/db";
import { z } from "zod";
import * as bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import { sendEmail } from "@/lib";

export async function verifyOTPAndCreateUser(email: string, name: string, password: string, otp: number) {
  try {
    if (otp < 99999 || otp > 1000000)
      return false;
    const otpResult = await prisma.oTPVerify.findFirst({
      where: {
        email: email,
        otp: otp
      }
    })
    if (!otpResult)
      return false;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name
      }
    })
    return user;
  } catch (error) {
    console.log("Error occur ", error)
    return false;
  }

}

export async function SendOTPToEmail(email: string, name: string) {
  try {
    const emailSchema = z.string().email().safeParse(email);
    if (!emailSchema.success)
      return { result: false, msg: "Invalid Email" }

    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (user) {
      throw new Error("User already signed up")
    }

    const otp = parseInt(otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false
    }))

    const otpSendData = prisma.oTPVerify.create({
      data: {
        email,
        otp
      }
    })

    const emailSend = sendEmail(email, otp, name);
    await Promise.all([otpSendData, emailSend])
    return { result: true, msg: "Email Send" }
  } catch (error: any) {
    console.log("Error : ", error)
    return { result: false, msg: error.message };
  }

}