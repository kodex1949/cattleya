import { createClient } from "@/lib/supabase/server";

export type CollectionEditorialBlock = {
  id: string;
  collection_handle: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  media_type: "image" | "video" | null;
  media_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
  position_index: number;
};

export async function getCollectionEditorialBlocks(
  collectionHandle: string
): Promise<CollectionEditorialBlock[]> {
  const supabase = await createClient();

  console.log(
    "REQUESTED COLLECTION HANDLE:",
    collectionHandle
  );

  const { data, error } = await supabase
    .from("collection_editorial_blocks")
    .select(`
      id,
      collection_handle,
      eyebrow,
      title,
      description,
      media_type,
      media_url,
      cta_label,
      cta_href,
      position_index,
      is_active
    `)
    .eq("collection_handle", collectionHandle)
    .eq("is_active", true)
    .order("position_index", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Collection editorial blocks error:",
      error.message
    );

    return [];
  }

  console.log(
    "SUPABASE EDITORIAL BLOCKS:",
    JSON.stringify(data, null, 2)
  );

  return data ?? [];
}