"use client";
import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";

import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function Uploader() {
  const handleChangeStatus = ({ meta, remove }, status: any) => {
    console.log("inside Change status");
    console.log("status : ", status);
    console.log("meta : ", meta);
    console.log("remove : ", remove);
  };

  const handleSubmit = async (files) => {
    console.log("Submit btn clicked");
    console.log(files);
    const f = files[0];

    // GET request: presigned URL
    // const response = await axios({
    //   method: "POST",
    //   url: "/api/openapi",
    // });
    // console.log(response.data);
    // const url = await response.data.preSignedUrl;
    // PUT request: upload file to S3
    // const result = await fetch(response.data.uploadURL, {
    //   method: "PUT",
    //   body: f["file"],
    // });
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Drop A File"
      styles={{
        dropzone: { width: 400, height: 200 },
        dropzoneActive: { borderColor: "green" },
      }}
    />
  );
}

export function UploaderMain({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [currFile, setCurrFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log("file", event.target.files[0]);
      setFile(event.target.files[0]);
      setCurrFile(event.target.files[0]);
    }
  };
  return (
    <div>
      <Label htmlFor="file-upload" className="block text-sm font-medium">
        OpenAPI Specification (YAML)
      </Label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="flex text-sm">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
            >
              <span>Upload a file</span>
              <Input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept=".yaml,.yml"
              />
            </label>
            <p className="pl-1 text-muted-foreground">or drag and drop</p>
          </div>
          <p className="text-xs text-muted-foreground">YAML file up to 5MB</p>
        </div>
      </div>
      {currFile && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected file: {currFile.name}
        </p>
      )}
    </div>
  );
}
