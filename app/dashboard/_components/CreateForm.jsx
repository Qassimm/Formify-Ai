"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const CreateFormComponent = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    try {
      setLoading(true);


      const res = await fetch("/api/createForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (data?.success && data?.id) {
        route.push(`/editForm/${data.id}`);
      }

      setOpen(false);
      setUserInput("");
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    

    <div>
      <Button variant="gradient" onClick={() => setOpen(true)}>
        + Create Form
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Write description of your form
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="my-2"
            placeholder="Write description of your form"
          />

          <div className="my-3 flex gap-2 justify-end">
            <Button
              onClick={() => setOpen(false)}
              variant="destructive"
              disabled={loading}
            >
              Cancel
            </Button>

            <Button onClick={onCreateForm} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFormComponent;
