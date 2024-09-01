"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function RefreshBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      const response = fetch("/api/parser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          refresh: true,
        }),
      });
      toast({
        title: "Success",
        description: "Completed Paring the file, added to Queue",
      });
    } catch (error) {
      console.log("Error : ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Starting Paring the file",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleClick}>
      <RefreshCw className={`${loading ? "animate-spin" : null}`} />
    </Button>
  );
}
