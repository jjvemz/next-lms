import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request, ) {
    try {
        const { userId } = getAuth(req);
        const body = await req.json();
        console.log("Request body:", body);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { title } = body;

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            }
        });
        return NextResponse.json(course);
    } catch (error) {
        console.error("[CURSOS] Error creating course:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}