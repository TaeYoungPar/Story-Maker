import supabase from "@/utils/supabase";

export async function uploadImage({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from("upload")
    .upload(filePath, file);
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("upload").getPublicUrl(data.path);
  return publicUrl;
}

export async function deleteImagesInPath(path: string) {
  const { data: files, error: fetchFilesError } = await supabase.storage
    .from("upload")
    .list(path);

  if (!files || files.length === 0) {
    return;
  }

  if (fetchFilesError) throw fetchFilesError;

  const { error: removeError } = await supabase.storage
    .from("upload")
    .remove(files.map((file) => `${path}/${file.name}`));

  if (removeError) throw removeError;
}
