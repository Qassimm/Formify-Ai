

import { db } from '@/configs/db'
import { JsonForms } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'



export async function GET(req, { params }) {
  try {
    const { id } = await params;
    console.log("ID:", id);

    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, Number(id)));

      // console.log("Raw result:", result);
      // console.log("jsonForm type:", typeof result[0]?.jsonForm);
      // console.log("jsonForm value:", result[0]?.jsonForm);

    if (!result[0]) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const jsonForm = typeof result[0].jsonForm === "string"
      ? JSON.parse(result[0].jsonForm)
      : result[0].jsonForm;

    return NextResponse.json({ data: jsonForm });

  } catch (err) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await db.update(JsonForms)
      .set({ jsonForm: JSON.stringify(body.formData) })  // ✅ DB update
      .where(eq(JsonForms.id, Number(id)))
      .returning()

    return NextResponse.json({ data: updated[0] })
  } catch (err) {
    console.error("Error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}