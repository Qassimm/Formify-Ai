import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable("json_forms", {
  id: serial("id").primaryKey(),
  jsonForm: text("jsonForm").notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdDate: varchar("createdDate", { length: 255 }).notNull(),
  theme: varchar("theme"),
  background: varchar("background")
});
