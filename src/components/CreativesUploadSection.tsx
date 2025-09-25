import React, { useState, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Upload,
  X,
  Image,
  FileVideo,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  status: "uploading" | "success" | "error";
}

interface CreativesUploadSectionProps {
  uploadedCreatives: any[];
  setUploadedCreatives: (creatives: any[]) => void;
}

export function CreativesUploadSection({
  uploadedCreatives,
  setUploadedCreatives,
}: CreativesUploadSectionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9);
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        status: "uploading",
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate upload process
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, status: Math.random() > 0.1 ? "success" : "error" }
              : f
          )
        );
      }, 2000);
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="bg-background border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Creative Upload
      </h3>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
            : "border-border hover:border-foreground"
        }`}
      >
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h4 className="text-foreground mb-2">
          Drag & drop your creatives here
        </h4>
        <p className="text-muted-foreground mb-4">or</p>
        <Button
          variant="outline"
          className="border border-border text-foreground hover:bg-accent"
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

      {/* Instructions */}
      <div className="mt-6 p-4 bg-accent rounded-lg">
        <h5 className="text-foreground font-medium mb-2">
          Optimal Compatibility
        </h5>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• Recommended dimensions: 1080×1920px (Portrait) or 1920×1080px (Landscape)</p>
          <p>• Supported formats: JPG, PNG, MP4, MOV</p>
          <p>• Maximum file size: 50MB per file</p>
          <p>• Video duration: 15-30 seconds recommended</p>
        </div>
      </div>

      {/* Uploaded Files Gallery */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h5 className="text-foreground font-medium mb-4">
            Uploaded Creatives ({uploadedFiles.length})
          </h5>
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-accent rounded-lg p-4 relative border border-border"
              >
                <div className="flex items-start space-x-3">
                  {/* File Preview */}
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    {file.type.startsWith("image/") ? (
                      file.status === "success" ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Image className="w-6 h-6 text-muted-foreground" />
                      )
                    ) : (
                      <FileVideo className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* File Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatFileSize(file.size)}
                    </p>

                    {/* Status */}
                    <div className="flex items-center mt-2">
                      {file.status === "uploading" && (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-muted-foreground">
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

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="absolute top-2 right-2 w-6 h-6 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
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
