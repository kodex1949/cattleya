import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type SearchEditorialRow = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  media_type: "image" | "video";
  media_url: string;
  sort_order: number;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json([]);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("search_editorials")
    .select(
      "id, eyebrow, title, description, cta_label, cta_href, media_type, media_url, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Search editorials error:", error.message);
    return NextResponse.json([]);
  }

  return NextResponse.json((data ?? []) as SearchEditorialRow[]);
}