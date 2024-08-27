'use client';

import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Component() {
  const [file, setFile] = useState<File | null>(null);
  const [backendUrl, setBackendUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError('Please select an OpenAPI specification file.');
      return;
    }

    if (!backendUrl) {
      setError('Please enter the backend URL endpoint.');
      return;
    }

    setIsLoading(true);

    // Here you would typically send the file and backendUrl to your server
    // For this example, we'll simulate an API call with a timeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
      setSuccess(true);
    } catch (err) {
      setError(
        'An error occurred while processing your request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
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
                  className="block text-sm font-medium"
                >
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
                      <p className="pl-1 text-muted-foreground">
                        or drag and drop
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
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
              <div>
                <Label
                  htmlFor="backend-url"
                  className="block text-sm font-medium"
                >
                  Backend URL Endpoint
                </Label>
                <div className="mt-1">
                  <Input
                    id="backend-url"
                    name="backend-url"
                    type="url"
                    required
                    className="block w-full"
                    placeholder="https://api.example.com/v1"
                    value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your API specification has been uploaded successfully. We will
                  start the security testing process shortly.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Start Security Testing'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
