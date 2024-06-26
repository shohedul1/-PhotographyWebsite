import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import Joi from "joi";


const schema = Joi.object({
    fristName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const { fristName, lastName, email, message } = await req.json();

        // Validate the schema
        const { error } = schema.validate({ fristName, email, lastName, message });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message,
            });
        }

        try {
            const transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'shohidulpramanik94@gmail.com',
                    pass: 'wdpp xial itsy igjp'
                }
            });

            const mailOptions = {
                from: email,
                to: "shohidulpramanik94@gmail.com",
                html: `
                <h2>Contact form Submission<h2/>
                <p><strong>Last Name:<strong/>${fristName}<p/>
                <p><strong>Last Name:<strong/>${lastName}<p/>

                <p><strong>Email:<strong/>${email}<p/>
                <p><strong>Message:<strong/>${message}<p/>
                `
            }
            await transport.sendMail(mailOptions);
            return NextResponse.json({
                success: true, 
                message: 'Submit successful'

             })

        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: 'mail has not been sent' })
        }
    } else {
        return NextResponse.json({ message: 'Method is not allow' })

    }
}