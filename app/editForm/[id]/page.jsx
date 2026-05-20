"use client";
import { ArrowLeft, Loader, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import FormUI from "../_component/FormUI";
import { toast } from "sonner";
import Controller from "../_component/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("sunset");
  const [selectedBackground, setSelectedBackground] = useState("");
  const router = useRouter();
  const debounceRef = useRef(null);

  // Form data fetch

  useEffect(() => {
    if (!id) return;

    const getForm = async () => {
      try {
        const res = await fetch(`/api/editForm/${id}`);
        const result = await res.json();
        const data = result.data;

        setFormData(data);
        if (data?.theme) setSelectedTheme(data.theme);
        if (data?.background) setSelectedBackground(data.background);
      } catch (err) {
        console.error("Form fetch error:", err);
        toast.error("Form load karne mein masla hua");
      } finally {
        setLoading(false);
      }
    };

    getForm();
  }, [id]);

  // DB update — with error handling

  const onUpdateInDb = useCallback(
    async (updatedData) => {
      try {
        const res = await fetch(`/api/editForm/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData: updatedData }),
        });

        if (!res.ok) throw new Error("Update failed");
      } catch (err) {
        console.error("DB update error:", err);
        toast.error("Save nahi hua, dobara try karo");
      }
    },
    [id],
  );

  // Theme change

  const handleThemeChange = useCallback(
    (value) => {
      setSelectedTheme(value);
      const updatedData = { ...formData, theme: value };
      setFormData(updatedData);
      onUpdateInDb(updatedData);
    },
    [formData, onUpdateInDb],
  );

  // Background change

  const handleBackgroundChange = useCallback(
    (value) => {
      setSelectedBackground(value);
      const updatedData = { ...formData, background: value };
      setFormData(updatedData);
      onUpdateInDb(updatedData);
    },
    [formData, onUpdateInDb],
  );

  // Field update — debounced to avoid DB call on every keystroke

  const onUpdateField = useCallback(
    (value, index) => {
      const updatedFields = [...formData.formFields];
      updatedFields[index].formLabel = value.label;
      updatedFields[index].placeholderName = value.placeholder;
      const updatedData = { ...formData, formFields: updatedFields };

      setFormData(updatedData); // UI turant update

      // DB call 800ms baad — typing ruke to save ho
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onUpdateInDb(updatedData);
        toast.success("Updated");
      }, 800);
    },
    [formData, onUpdateInDb],
  );

  // Field delete
  const deleteField = useCallback(
    (indexToRemove) => {
      const updatedFields = formData.formFields.filter(
        (_, index) => index !== indexToRemove,
      );
      const updatedData = { ...formData, formFields: updatedFields };
      setFormData(updatedData);
      onUpdateInDb(updatedData);
    },
    [formData, onUpdateInDb],
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );

  if (!formData) return <p className="text-center mt-20">Form not found</p>;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex w-fit gap-2 items-center my-5 cursor-pointer hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Back
        </h2>
        <div className=" flex gap-2 ">
          <Link href={`/aiForm/${id}`} target="_blank">
          <Button className="flex cursor-pointer"><SquareArrowOutUpRight className="h-5 w-5 "/> Live Preview</Button>
          </Link>
          <Button className="flex cursor-pointer"> <Share2 className="h-5 w-5 "/> Share</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border p-5 rounded-lg shadow-md">
          <Controller
            selectedTheme={handleThemeChange}
            selectedBackground={handleBackgroundChange}
          />
        </div>

        <div
          className="flex justify-center md:col-span-2 border rounded-lg p-4"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUI
            formData={formData}
            onUpdateField={onUpdateField}
            deleteField={deleteField}
            selectedTheme={selectedTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
