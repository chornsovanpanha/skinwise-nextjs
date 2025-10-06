import { getContentType } from "@/utils/helpers/Firebase";
import { v4 as uuidv4 } from "uuid";
import { bucket } from "./admin";

export const createFileUpload = async (file: File, originalName: string) => {
  const fileName = `images/${uuidv4()}-${originalName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileRef = bucket.file(fileName);
  await fileRef.save(buffer, {
    contentType: getContentType(fileName),
    public: true,
  });
  const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  return url;
};

export const deleteFile = async (filePath: string) => {
  const fileRef = bucket.file(filePath);
  return await fileRef.delete();
};

//This stream upload is quicker
export const uploadFileStream = async (
  file: File,
  folder = "images",
  originalName: string
) => {
  const fileName = `${folder}/${uuidv4()}-${originalName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileRef = bucket.file(fileName);
  // Create a stream for uploading
  await new Promise<void>((resolve, reject) => {
    const writeStream = fileRef.createWriteStream({
      metadata: { contentType: getContentType(file.name) },
      resumable: false,
      public: true,
    });
    writeStream.on("finish", () => resolve());
    writeStream.on("error", (err) => reject(err));
    writeStream.end(buffer);
  });
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};
