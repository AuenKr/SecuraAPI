"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!file) {
        return toast({
          title: "Error",
          description: "File not selected",
          variant: "destructive",
        });
      }

      // Get presigned url
      const response = await fetch("/api/openapi", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!response.ok)
        return toast({
          title: "Error",
          description: "Internal Server Error",
          variant: "destructive",
        });

      const result = await response.json();

      const upload = await fetch(result.preSignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "text/yaml",
        },
        body: file,
      });

      if (upload.ok) {
        const response = await fetch("/api/openapi", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.name,
            fileLocation: result.fileLocation,
          }),
        });
        if (!response.ok) {
          return toast({
            title: "Error",
            description: "Error while saving file",
            variant: "destructive",
          });
        }
        return toast({
          title: "Success",
          description:
            "Your API specification has been uploaded successfully. We will start the security testing process shortly.",
        });
      }
      throw new Error("Fail to upload file after getting pre-signed url");
    } catch (err) {
      console.log("error ", err);
      toast({
        title: "Error",
        description: "Fail to upload file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Upload Your API Spec
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Provide your OpenAPI specification and backend URL to start the
              security testing process.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-center"
                >
                  OpenAPI Specification (YAML)
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span>Upload a file</span>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      </label>
                      <Input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".yaml,.yml"
                      />
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      YAML file up to 10MB
                    </p>
                  </div>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Upload"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
