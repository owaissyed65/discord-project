"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"
import Image from "next/image";
import {X} from "lucide-react"
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "serverImage" | "messageFile";
}
export const FileUpload = ({ onChange, value, endPoint }: FileUploadProps) => {
    const fileType = value?.split('.').pop()
    if(value && fileType !== "pdf"){
        return(
            <div className="relative h-20 w-20 object-cover">
                <Image
                fill
                src={value}
                alt="image"
                className="rounded-full object-cover"
                />
                <div className="bg-rose-500 text-white p-1 rounded-full absolute top-0 flex justify-center items-center cursor-pointer right-0 shadow-sm" onClick={()=>onChange("")}><X className="h-4 w-4"/></div>
            </div>
        )
    }
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(`ERROR! ${error.message}`);
      }}
      className="border-none"
    />
  );
};
