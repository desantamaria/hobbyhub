import { createClient } from "@supabase/supabase-js";

const URL = "https://murkrwvgdyakrrontcqt.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cmtyd3ZnZHlha3Jyb250Y3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMjIyOTcsImV4cCI6MjAxNDY5ODI5N30.mlpFJCrZOIXToi648RzSlZ6IHbG_EFPQcShEFBmtxx4";

export const supabase = createClient(URL, API_KEY);
