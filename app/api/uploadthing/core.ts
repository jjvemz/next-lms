import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const f = createUploadthing();

const handleAuth = (req: NextRequest) => {
  try {
    // Convert NextRequest to a standard Request object
    const standardRequest = new Request(req.url, {
      headers: req.headers,
      method: req.method,
      body: req.body,
    });

    const { userId } = getAuth(standardRequest);
    if (!userId) throw new Error("Unauthorized");

    return { userId };
  } catch (error) {
    console.error("Error in handleAuth middleware:", error);
    throw error;
  }
};

export const ourFileRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware((req) => {
      console.log("Running middleware for courseImage");
      return handleAuth(req);
    })
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware((req) => {
      console.log("Running middleware for courseAttachment");
      return handleAuth(req);
    })
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
  chapterVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware((req) => {
      console.log("Running middleware for chapterVideo");
      return handleAuth(req);
    })
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;