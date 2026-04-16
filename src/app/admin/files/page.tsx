"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import toast from "react-hot-toast";
import type { FileUpload } from "@/lib/types";
import { Upload, Trash2, Download, FileText, Image as ImageIcon, File } from "lucide-react";

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return ImageIcon;
  if (type.includes("pdf") || type.includes("doc")) return FileText;
  return File;
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from("file_uploads").select("*").order("created_at", { ascending: false });
    setFiles((data as FileUpload[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const path = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("files").upload(path, file);
      if (uploadError) { toast.error(`Failed to upload ${file.name}`); continue; }
      const { data: { publicUrl } } = supabase.storage.from("files").getPublicUrl(path);
      await supabase.from("file_uploads").insert({ file_name: file.name, file_url: publicUrl, file_size: file.size, file_type: file.type, category: "general" });
    }
    toast.success("Files uploaded!");
    setUploading(false);
    load();
    e.target.value = "";
  }

  async function deleteFile(file: FileUpload) {
    if (!confirm(`Delete ${file.file_name}?`)) return;
    const storagePath = file.file_url.split("/files/")[1];
    if (storagePath) { await supabase.storage.from("files").remove([decodeURIComponent(storagePath)]); }
    const { error } = await supabase.from("file_uploads").delete().eq("id", file.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-[var(--text-secondary)]">Upload and manage files</p>
        </div>
        <label><Button loading={uploading}><Upload size={16} className="mr-2" /> Upload Files</Button><input type="file" multiple onChange={handleUpload} className="hidden" ref={(input) => { const btn = input?.previousElementSibling; if (btn) (btn as HTMLElement).onclick = () => input.click(); }} /></label>
      </div>
      {files.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-16 text-center">
          <Upload size={48} className="mx-auto mb-4 text-[var(--text-secondary)]/40" />
          <p className="text-[var(--text-secondary)]">No files yet. Drop or upload files to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file) => {
            const Icon = getFileIcon(file.file_type);
            return (
              <div key={file.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-tertiary)]"><Icon size={20} className="text-[var(--accent)]" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.file_name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{formatSize(file.file_size)} \u00b7 {file.file_type || "Unknown"} \u00b7 {new Date(file.created_at).toLocaleDateString()}</p>
                </div>
                <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"><Download size={16} /></a>
                <button onClick={() => deleteFile(file)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
