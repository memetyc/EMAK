import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
     
        const {name, email, password} = await request.json();

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ message: "Mail adresi sistemde kayıtlı." }), 
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        return new NextResponse(
            JSON.stringify({ message: "Kullanıcı oluşturuldu" }), 
            { status: 201 }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Bir hata oluştu", error: error.message }), 
            { status: 500 }
        );
    }
}