  import { NextResponse } from "next/server";
  import { db } from "@/configs/db";
  import { JsonForms } from "@/configs/schema";
  import moment from "moment";
  import { GoogleGenAI } from "@google/genai";



  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
  });


  const cleanJSON = (text) => {
    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  };

  export async function POST(req) {
    try {
      const { userInput, userEmail } = await req.json();

      const prompt = `
  description: ${userInput}

  Generate ONLY valid JSON.
  No explanation.

  STRICT RULES:
  - fieldType must be: text, email, number, tel, date, select, textarea, file
  - if fieldType = select → options must be included

  Structure:
  {
    "formTitle": "",
    "formSubheading": "",
    "formFields": [
      {
        "formName": "",
        "formLabel": "",
        "placeholderName": "",
        "fieldType": "",
        "required": true,
        "options": []
      }
    ]
  }
  `;


      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text = result.text;


      const cleaned = cleanJSON(text);
      const jsonData = JSON.parse(cleaned);


      const res = await db.insert(JsonForms)
        .values({
          jsonForm: JSON.stringify(jsonData),
          createdBy: userEmail,
          createdDate: moment().format("DD/MM/YYYY"),
        })
        .returning({ id: JsonForms.id });

      return NextResponse.json({
        success: true,
        id: res[0].id,
        data: jsonData,
      });

    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
