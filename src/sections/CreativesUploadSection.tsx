"use client";

import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  X,
  Image,
  FileVideo,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Client, Account, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const storage = new Storage(client);

const BUCKET_ID = "68d11568000196a6400e";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  status: "uploading" | "success" | "error";
}

export function CreativesUploadSection({
  campaignId,
  onFilesChange,
}: {
  campaignId: string;
  onFilesChange: (files: UploadedFile[]) => void;
}) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  /** --- Drag & Drop Handlers --- */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  /** --- Input Upload --- */
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  /** --- File Handling with Appwrite --- */
  const handleFiles = async (files: File[]) => {
    let user;
    try {
      user = await account.get();
    } catch {
      alert("You must be logged in to upload creatives.");
      return;
    }

    for (const file of files) {
      const fileId = uuidv4();

      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        status: "uploading",
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      try {
        const storageRes = await storage.createFile(BUCKET_ID, fileId, file);

        const fileUrl = storage.getFilePreview(BUCKET_ID, storageRes.$id);

        const updatedFile = {
          ...newFile,
          url: fileUrl,
          status: "success" as const,
        };

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? updatedFile : f))
        );
        onFilesChange([...uploadedFiles, updatedFile]);
      } catch (err) {
        console.error("Upload failed:", err);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "error" as const } : f
          )
        );
      }
    }
  };

  /** --- Remove File --- */
  const removeFile = (fileId: string) => {
    const updated = uploadedFiles.filter((f) => f.id !== fileId);
    setUploadedFiles(updated);
    onFilesChange(updated);
  };

  /** --- Helpers --- */
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="bg-white border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">Creative Upload</h3>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h4 className="text-black mb-2">Drag & drop your creatives here</h4>
        <p className="text-gray-600 mb-4">or</p>
        <Button
          variant="outline"
          className="border-gray-300 text-black hover:bg-gray-50"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          Browse Files
        </Button>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h5 className="text-black font-medium mb-4">
            Uploaded Creatives ({uploadedFiles.length})
          </h5>
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-gray-50 rounded-lg p-4 relative border border-gray-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {file.type.startsWith("image/") ? (
                      file.status === "success" ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Image className="w-6 h-6 text-gray-500" />
                      )
                    ) : (
                      <FileVideo className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {formatFileSize(file.size)}
                    </p>

                    <div className="flex items-center mt-2">
                      {file.status === "uploading" && (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-gray-600">
                            Uploading...
                          </span>
                        </div>
                      )}
                      {file.status === "success" && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-600">Ready</span>
                        </div>
                      )}
                      {file.status === "error" && (
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-xs text-red-600">Failed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="absolute top-2 right-2 w-6 h-6 p-0 text-gray-500 hover:text-black hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
