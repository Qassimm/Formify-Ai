import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_2hZAXSaGl8pd@ep-delicate-morning-an2wopiy-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  }
});
