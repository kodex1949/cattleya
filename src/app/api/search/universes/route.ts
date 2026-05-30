import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type SearchUniverseRow = {
  id: string;
  label: string;
  title: string;
  description: string;
  query: string;
  media_type: "image" | "video";
  media_url: string;
  sort_order: number;
};

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json([]);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("search_universes")
    .select(
      "id, label, title, description, query, media_type, media_url, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Search universes error:", error.message);
    return NextResponse.json([]);
  }

  return NextResponse.json((data ?? []) as SearchUniverseRow[]);
}