import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = (req: Request) => {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("Unauthorized");

  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware((req) => handleAuth(req))
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware((req) => handleAuth(req))
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
  chapterVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware((req) => handleAuth(req))
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;