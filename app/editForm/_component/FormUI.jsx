import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import FieldEdit from "./FieldEdit";

const renderField = (field) => {
  const fieldType = field?.fieldType?.toLowerCase?.() || "text";
  const options = Array.isArray(field?.options)
    ? field.options.filter((opt) => opt && String(opt).trim() !== "")
    : [];

  switch (fieldType) {
    case "select":
      return (
        <Select name={field?.formName}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder={field?.placeholderName || "Select..."} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.length > 0 ? (
                options.map((item, i) => (
                  <SelectItem key={i} value={String(item)}>{item}</SelectItem>
                ))
              ) : (
                <SelectItem value="no-options" disabled>No options</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      );

    case "textarea":
      return (
        <Textarea
          name={field?.formName}
          placeholder={field?.placeholderName || ""}
          className="mt-1 w-full"
        />
      );

    case "radio":
      return (
        <RadioGroup name={field?.formName} className="mt-2 flex flex-col gap-2">
          {options.length > 0 ? (
            options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <RadioGroupItem value={String(opt)} id={`${field?.formName}-radio-${i}`} />
                <Label htmlFor={`${field?.formName}-radio-${i}`}>{opt}</Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No options available</p>
          )}
        </RadioGroup>
      );

    case "checkbox":
      return (
        <div className="mt-2 flex flex-col gap-2">
          {options.length > 0 ? (
            options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <Checkbox id={`${field?.formName}-checkbox-${i}`} name={field?.formName} value={String(opt)} />
                <Label htmlFor={`${field?.formName}-checkbox-${i}`}>{opt}</Label>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-3">
              <Checkbox id={field?.formName} name={field?.formName} />
              <Label htmlFor={field?.formName}>{field?.formLabel}</Label>
            </div>
          )}
        </div>
      );

    default:
      return (
        <Input
          type={fieldType}
          placeholder={field?.placeholderName || ""}
          name={field?.formName || ""}
          className="mt-1 w-full"
        />
      );
  }
};

const FormUI = ({ formData, onUpdateField, deleteField , selectedTheme}) => {
  if (!formData) return null;

  const fields = Array.isArray(formData?.formFields) ? formData.formFields : [];
  return (
    <div className="p-5  border md:w-[700px] rounded-lg" data-theme ={selectedTheme}>
      <div className="mt-4 mb-8">
        <h2 className="font-bold text-center text-2xl">
          {formData?.formTitle}
        </h2>
        <h2 className="text-sm  text-center">
          {formData?.formSubheading}
        </h2>
      </div>

      {fields.map((field, index) => (
        <div key={index} className="my-3 ">
          {field?.fieldType?.toLowerCase?.() !== "checkbox" && (
            <label className="text-sm font-medium">
              {field?.formLabel}{" "}
              {field?.required && <span className="text-red-500">*</span>}
            </label>
          )}
          {renderField(field)}

          <div>
            <FieldEdit defaultValue={field} onUpdate={(value) => onUpdateField(value, index)}
              deleteField={()=> deleteField(index)}/>
          </div>
        </div>
      ))}
      <button className="btn btn-primary">Submit</button>
    </div>
  );
};

export default FormUI;