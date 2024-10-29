import * as nodemailer from 'nodemailer';
import SwaggerParser from "@apidevtools/swagger-parser";
import { formatApi } from './parse';
import fs from 'fs';
import { emailWithOTP } from '@/components/email';

export async function openApiParserTest() {
  try {
    const parser = new SwaggerParser();
    const json = await parser.parse("src/openapiSpec/blog.yaml");
    const result = formatApi(json);

    const opPath = "src/openapiSpec/blogFinal.json"
    fs.writeFileSync(opPath, JSON.stringify(result))
    console.log("Save to ", opPath)
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function sendEmail(email: string, otp: number, name: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_ENDPOINT,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const subject = "Verify Account for SecuraAPI"
    await transporter.sendMail({
      from: `${process.env.SMTP_EMAIL}`,
      sender: `${process.env.SMTP_EMAIL}`,
      subject: subject,
      html: emailWithOTP(email, otp, name),
      to: email
    })
    return true;
  } catch (erro) {
    console.log("fail to sent email")
    return false;
  }
}