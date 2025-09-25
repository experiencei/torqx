// "use client";

// import React, { useState, useCallback } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Upload,
//   X,
//   Image,
//   FileVideo,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Client, Account, Storage } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const account = new Account(client);
// const storage = new Storage(client);

// const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;

// interface UploadedFile {
//   id: string;
//   name: string;
//   type: string;
//   size: number;
//   url: string;
//   status: "uploading" | "success" | "error";
//   fileType: "creative"; // 🔹 tagging creatives
// }

// export function CreativesUploadSection({
//   campaignId,
//   onFilesChange,
// }: {
//   campaignId: string;
//   onFilesChange: (files: UploadedFile[]) => void;
// }) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isDragOver, setIsDragOver] = useState(false);

//   /** --- Drag & Drop Handlers --- */
//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     handleFiles(files);
//   }, []);

//   /** --- Input Upload --- */
//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(Array.from(e.target.files));
//     }
//   };

//   /** --- File Handling with Appwrite --- */
//   const handleFiles = async (files: File[]) => {
//     let user;
//     try {
//       user = await account.get();
//     } catch {
//       alert("You must be logged in to upload creatives.");
//       return;
//     }

//     for (const file of files) {
//       const fileId = uuidv4();

//       const newFile: UploadedFile = {
//         id: fileId,
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         url: URL.createObjectURL(file),
//         status: "uploading",
//         fileType: "creative",
//       };

//       setUploadedFiles((prev) => [...prev, newFile]);

//       try {
//         const storageRes = await storage.createFile(BUCKET_ID, fileId, file);

//         const fileUrl = storage.getFileView(BUCKET_ID, storageRes.$id);

//         const updatedFile: UploadedFile = {
//           ...newFile,
//           url: fileUrl,
//           status: "success",
//         };

//         setUploadedFiles((prev) =>
//           prev.map((f) => (f.id === fileId ? updatedFile : f))
//         );

//         // 🔹 Always pass the fresh list
//         setTimeout(() => {
//           onFilesChange((prev => {
//             const updatedList = [...uploadedFiles, updatedFile];
//             return updatedList;
//           })(uploadedFiles));
//         }, 0);

//       } catch (err) {
//         console.error("Upload failed:", err);
//         setUploadedFiles((prev) =>
//           prev.map((f) =>
//             f.id === fileId ? { ...f, status: "error" as const } : f
//           )
//         );
//       }
//     }
//   };

//   /** --- Remove File --- */
//   const removeFile = (fileId: string) => {
//     const updated = uploadedFiles.filter((f) => f.id !== fileId);
//     setUploadedFiles(updated);
//     onFilesChange(updated);
//   };

//   /** --- Helpers --- */
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   return (
//     <Card className="bg-white border-gray-200 p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-black mb-6">Creative Upload</h3>

//       {/* Upload Zone */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//           isDragOver
//             ? "border-purple-500 bg-purple-50"
//             : "border-gray-300 hover:border-gray-400"
//         }`}
//       >
//         <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
//         <h4 className="text-black mb-2">Drag & drop your creatives here</h4>
//         <p className="text-gray-600 mb-4">or</p>
//         <Button
//           variant="outline"
//           className="border-gray-300 text-black hover:bg-gray-50"
//           onClick={() => document.getElementById("file-input")?.click()}
//         >
//           Browse Files
//         </Button>
//         <input
//           id="file-input"
//           type="file"
//           multiple
//           accept="image/*,video/*"
//           className="hidden"
//           onChange={handleFileInput}
//         />
//       </div>

//       {/* Uploaded Files */}
//       {uploadedFiles.length > 0 && (
//         <div className="mt-6">
//           <h5 className="text-black font-medium mb-4">
//             Uploaded Creatives ({uploadedFiles.length})
//           </h5>
//           <div className="grid grid-cols-2 gap-4">
//             {uploadedFiles.map((file) => (
//               <div
//                 key={file.id}
//                 className="bg-gray-50 rounded-lg p-4 relative border border-gray-200"
//               >
//                 <div className="flex items-start space-x-3">
//                   <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//                     {file.type.startsWith("image/") ? (
//                       file.status === "success" ? (
//                         <img
//                           src={file.url}
//                           alt={file.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       ) : (
//                         <Image className="w-6 h-6 text-gray-500" />
//                       )
//                     ) : (
//                       <FileVideo className="w-6 h-6 text-gray-500" />
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-black text-sm font-medium truncate">
//                       {file.name}
//                     </p>
//                     <p className="text-gray-600 text-xs">
//                       {formatFileSize(file.size)}
//                     </p>

//                     <div className="flex items-center mt-2">
//                       {file.status === "uploading" && (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                           <span className="text-xs text-gray-600">
//                             Uploading...
//                           </span>
//                         </div>
//                       )}
//                       {file.status === "success" && (
//                         <div className="flex items-center space-x-2">
//                           <CheckCircle className="w-4 h-4 text-green-600" />
//                           <span className="text-xs text-green-600">Ready</span>
//                         </div>
//                       )}
//                       {file.status === "error" && (
//                         <div className="flex items-center space-x-2">
//                           <AlertTriangle className="w-4 h-4 text-red-600" />
//                           <span className="text-xs text-red-600">Failed</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeFile(file.id)}
//                     className="absolute top-2 right-2 w-6 h-6 p-0 text-gray-500 hover:text-black hover:bg-gray-200"
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }

// "use client";

// import React, { useState, useCallback } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Upload,
//   X,
//   Image,
//   FileVideo,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Client, Account, Storage, Databases } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const account = new Account(client);
// const storage = new Storage(client);
// const databases = new Databases(client);

// const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;
// const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
// const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

// interface UploadedFile {
//   id: string;
//   name: string;
//   type: string;
//   size: number;
//   url: string;
//   status: "uploading" | "success" | "error";
//   fileType: "creative";
// }

// interface Props {
//   campaignId: string;
//   brandName: string;
//   industry: string;
//   venues: string[];
//   budget: number;
//   onFilesChange: (files: UploadedFile[]) => void;
// }

// const industryTagsMap: Record<string, string[]> = {
//   Technology: ["tech", "innovation", "digital"],
//   Healthcare: ["health", "wellness", "medical"],
//   Finance: ["finance", "banking", "money"],
//   "Food & Beverage": ["food", "restaurant", "hospitality"],
//   Automotive: ["cars", "auto", "transport"],
//   Fashion: ["fashion", "style", "clothing"],
//   "Sports & Fitness": ["fitness", "sports", "health"],
//   Entertainment: ["movies", "music", "events"],
//   "Travel & Tourism": ["travel", "tourism", "adventure"],
//   Other: ["general", "advertising"],
// };

// export function CreativesUploadSection({
//   campaignId,
//   brandName,
//   industry,
//   venues,
//   budget,
//   onFilesChange,
// }: Props) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isDragOver, setIsDragOver] = useState(false);

//   /** --- Drag & Drop Handlers --- */
//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     handleFiles(files);
//   }, []);

//   /** --- Input Upload --- */
//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(Array.from(e.target.files));
//     }
//   };

//   /** --- File Handling with Appwrite --- */
//   const handleFiles = async (files: File[]) => {
//     let user;
//     try {
//       user = await account.get();
//     } catch {
//       alert("You must be logged in to upload creatives.");
//       return;
//     }

//     for (const file of files) {
//       const fileId = uuidv4();

//       const newFile: UploadedFile = {
//         id: fileId,
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         url: URL.createObjectURL(file),
//         status: "uploading",
//         fileType: "creative",
//       };

//       setUploadedFiles((prev) => [...prev, newFile]);

//       try {
//         // 1. Upload to Appwrite Storage
//         const storageRes = await storage.createFile(BUCKET_ID, fileId, file);
//         const fileUrl = storage.getFileView(BUCKET_ID, storageRes.$id);

//         // 2. Generate tags based on industry
//         const tags = industryTagsMap[industry] || ["general"];

//         // 3. Save metadata to Appwrite Database (status "pending" until payment callback)
//         await databases.createDocument(DB_ID, COLLECTION_ID, fileId, {
//           campaignId,
//           brandName,
//           industry,
//           tags,
//           venues,
//           fileId: storageRes.$id,
//           fileUrl,
//           fileType: "creative",
//           status: "pending",
//           userId: user.$id,
//           budget,
//         });

//         // 4. Update state with success
//         const updatedFile: UploadedFile = {
//           ...newFile,
//           url: fileUrl,
//           status: "success",
//         };

//         setUploadedFiles((prev) =>
//           prev.map((f) => (f.id === fileId ? updatedFile : f))
//         );

//         onFilesChange([...uploadedFiles, updatedFile]);
//       } catch (err) {
//         console.error("Upload failed:", err);
//         setUploadedFiles((prev) =>
//           prev.map((f) =>
//             f.id === fileId ? { ...f, status: "error" as const } : f
//           )
//         );
//       }
//     }
//   };

//   /** --- Remove File --- */
//   const removeFile = (fileId: string) => {
//     const updated = uploadedFiles.filter((f) => f.id !== fileId);
//     setUploadedFiles(updated);
//     onFilesChange(updated);
//   };

//   /** --- Helpers --- */
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   return (
//     <Card className="bg-white border-gray-200 p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-black mb-6">Creative Upload</h3>

//       {/* Upload Zone */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//           isDragOver
//             ? "border-purple-500 bg-purple-50"
//             : "border-gray-300 hover:border-gray-400"
//         }`}
//       >
//         <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
//         <h4 className="text-black mb-2">Drag & drop your creatives here</h4>
//         <p className="text-gray-600 mb-4">or</p>
//         <Button
//           variant="outline"
//           className="border-gray-300 text-black hover:bg-gray-50"
//           onClick={() => document.getElementById("file-input")?.click()}
//         >
//           Browse Files
//         </Button>
//         <input
//           id="file-input"
//           type="file"
//           multiple
//           accept="image/*,video/*"
//           className="hidden"
//           onChange={handleFileInput}
//         />
//       </div>

//       {/* Uploaded Files */}
//       {uploadedFiles.length > 0 && (
//         <div className="mt-6">
//           <h5 className="text-black font-medium mb-4">
//             Uploaded Creatives ({uploadedFiles.length})
//           </h5>
//           <div className="grid grid-cols-2 gap-4">
//             {uploadedFiles.map((file) => (
//               <div
//                 key={file.id}
//                 className="bg-gray-50 rounded-lg p-4 relative border border-gray-200"
//               >
//                 <div className="flex items-start space-x-3">
//                   <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//                     {file.type.startsWith("image/") ? (
//                       file.status === "success" ? (
//                         <img
//                           src={file.url}
//                           alt={file.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       ) : (
//                         <Image className="w-6 h-6 text-gray-500" />
//                       )
//                     ) : (
//                       <FileVideo className="w-6 h-6 text-gray-500" />
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-black text-sm font-medium truncate">
//                       {file.name}
//                     </p>
//                     <p className="text-gray-600 text-xs">
//                       {formatFileSize(file.size)}
//                     </p>

//                     <div className="flex items-center mt-2">
//                       {file.status === "uploading" && (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                           <span className="text-xs text-gray-600">
//                             Uploading...
//                           </span>
//                         </div>
//                       )}
//                       {file.status === "success" && (
//                         <div className="flex items-center space-x-2">
//                           <CheckCircle className="w-4 h-4 text-green-600" />
//                           <span className="text-xs text-green-600">Ready</span>
//                         </div>
//                       )}
//                       {file.status === "error" && (
//                         <div className="flex items-center space-x-2">
//                           <AlertTriangle className="w-4 h-4 text-red-600" />
//                           <span className="text-xs text-red-600">Failed</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeFile(file.id)}
//                     className="absolute top-2 right-2 w-6 h-6 p-0 text-gray-500 hover:text-black hover:bg-gray-200"
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }






// "use client";

// import React, { useState, useCallback } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Upload,
//   X,
//   Image,
//   FileVideo,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Client, Account, Storage, Databases, Permission, Role } from "appwrite";

// /**
//  * IMPORTANT env vars (set these in Vercel / .env.local)
//  * NEXT_PUBLIC_APPWRITE_ENDPOINT
//  * NEXT_PUBLIC_APPWRITE_PROJECT_ID
//  * NEXT_PUBLIC_BUCKET_ID
//  * NEXT_PUBLIC_APPWRITE_DATABASE_ID
//  * NEXT_PUBLIC_APPWRITE_CREATIVE_COLLECTION_ID
//  */

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const account = new Account(client);
// const storage = new Storage(client);
// const databases = new Databases(client);

// const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID || "";
// const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
// const CREATIVE_COLLECTION_ID =
//   process.env.NEXT_PUBLIC_APPWRITE_CREATIVE_COLLECTION_ID || "";

// interface UploadedFile {
//   id: string;
//   name: string;
//   type: string;
//   size: number;
//   url: string; // viewable URL (string)
//   status: "uploading" | "success" | "error";
//   fileType: "creative";
// }

// interface Props {
//   campaignId: string;
//   brandName?: string;
//   industry?: string;
//   venues?: string[];
//   budget?: number;
//   onFilesChange: (files: UploadedFile[]) => void;
// }

// // simple industry -> tag mapping
// const industryTagsMap: Record<string, string[]> = {
//   Technology: ["tech", "innovation", "digital"],
//   Healthcare: ["health", "wellness", "medical"],
//   Finance: ["finance", "banking", "money"],
//   "Food & Beverage": ["food", "restaurant", "hospitality"],
//   Automotive: ["cars", "auto", "transport"],
//   Fashion: ["fashion", "style", "clothing"],
//   "Sports & Fitness": ["fitness", "sports", "health"],
//   Entertainment: ["movies", "music", "events"],
//   "Travel & Tourism": ["travel", "tourism", "adventure"],
//   Other: ["general", "advertising"],
// };

// export function CreativesUploadSection({
//   campaignId,
//   brandName,
//   industry,
//   venues = [],
//   budget,
//   onFilesChange,
// }: Props) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isDragOver, setIsDragOver] = useState(false);

//   // Quick env checks
//   if (!BUCKET_ID) {
//     console.error("BUCKET_ID not set (NEXT_PUBLIC_BUCKET_ID).");
//   }
//   if (!DATABASE_ID || !CREATIVE_COLLECTION_ID) {
//     // warn but let uploads continue (we'll not fail upload on DB error)
//     console.warn(
//       "Database or collection env var not set. Appwrite DB writes will be skipped or may fail.",
//       { DATABASE_ID, CREATIVE_COLLECTION_ID }
//     );
//   }

//   /** Drag & Drop */
//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     handleFiles(files);
//   }, []);

//   /** Input file */
//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(Array.from(e.target.files));
//     }
//   };

//   /** Core upload routine */
//   const handleFiles = async (files: File[]) => {
//     let user;
//     try {
//       user = await account.get();
//     } catch (err) {
//       alert("You must be logged in to upload creatives.");
//       return;
//     }

//     for (const file of files) {
//       const fileId = uuidv4();

//       const newFile: UploadedFile = {
//         id: fileId,
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         url: URL.createObjectURL(file),
//         status: "uploading",
//         fileType: "creative",
//       };

//       // add to UI immediately
//       setUploadedFiles((prev) => {
//         const next = [...prev, newFile];
//         try {
//           onFilesChange(next);
//         } catch {
//           /* swallow */
//         }
//         return next;
//       });

//       try {
//         // 1. Upload to Appwrite Storage
//         const storageRes = await storage.createFile(BUCKET_ID, fileId, file);
//         // getFileView returns a URL string
//         const fileUrl = storage.getFileView(BUCKET_ID, storageRes.$id) as string;

//         // 2. build metadata
//         const tags = (industry && industryTagsMap[industry]) || ["general"];
//         const metadata = {
//           campaignId,
//           brandName: brandName ?? null,
//           industry: industry ?? null,
//           tags,
//           venues,
//           fileId: storageRes.$id,
//           fileUrl,
//           fileType: "creative",
//           status: "pending", // pending until manual review / payment
//           userId: user.$id,
//           size: file.size,
//           mimeType: file.type,
//           name: file.name,
//           uploadedAt: new Date().toISOString(),
//           budget: budget ?? null,
//         };

//         // 3. Try saving metadata to Appwrite DB but DON'T let DB error break the upload
//         if (DATABASE_ID && CREATIVE_COLLECTION_ID) {
//           try {
//             // try create with same id as fileId for easy lookup later.
//             // include read permission = public, write permissions = owner
//             await databases.createDocument(
//               DATABASE_ID,
//               CREATIVE_COLLECTION_ID,
//               fileId,
//               metadata,
//               [
//                 // public read
//                 Permission.read(Role.any()),
//               ],
//               [
//                 // write only by owner (user)
//                 Permission.write(Role.user(user.$id)),
//               ]
//             );
//           } catch (dbErr) {
//             // don't propagate — log and continue
//             console.warn("Failed to create creative DB document (upload still succeeded):", dbErr);
//           }
//         } else {
//           console.warn("Skipping DB write because DATABASE_ID or CREATIVE_COLLECTION_ID is missing.");
//         }

//         // 4. mark file success in UI
//         const updatedFile: UploadedFile = { ...newFile, url: fileUrl, status: "success" };

//         setUploadedFiles((prev) => {
//           const updated = prev.map((f) => (f.id === fileId ? updatedFile : f));
//           try {
//             onFilesChange(updated);
//           } catch {
//             /* swallow */
//           }
//           return updated;
//         });
//       } catch (err) {
//         console.error("Upload failed:", err);
//         // mark that file as error
//         setUploadedFiles((prev) =>
//           prev.map((f) =>
//             f.id === fileId ? { ...f, status: "error" as const } : f
//           )
//         );
//         // still call onFilesChange (so parent knows)
//         setTimeout(() => {
//           try {
//             onFilesChange(
//               uploadedFiles.map((f) =>
//                 f.id === fileId ? { ...f, status: "error" as const } : f
//               )
//             );
//           } catch {}
//         }, 0);
//       }
//     }
//   };

//   /** Remove File (UI only) */
//   const removeFile = (fileId: string) => {
//     const updated = uploadedFiles.filter((f) => f.id !== fileId);
//     setUploadedFiles(updated);
//     try {
//       onFilesChange(updated);
//     } catch {}
//   };

//   /** Helpers */
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   return (
//     <Card className="bg-white border-gray-200 p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-black mb-6">Creative Upload</h3>

//       {/* Upload Zone */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//           isDragOver ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"
//         }`}
//       >
//         <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
//         <h4 className="text-black mb-2">Drag & drop your creatives here</h4>
//         <p className="text-gray-600 mb-4">or</p>
//         <Button
//           variant="outline"
//           className="border-gray-300 text-black hover:bg-gray-50"
//           onClick={() => document.getElementById("file-input")?.click()}
//         >
//           Browse Files
//         </Button>
//         <input
//           id="file-input"
//           type="file"
//           multiple
//           accept="image/*,video/*"
//           className="hidden"
//           onChange={handleFileInput}
//         />
//       </div>

//       {/* Uploaded Files */}
//       {uploadedFiles.length > 0 && (
//         <div className="mt-6">
//           <h5 className="text-black font-medium mb-4">Uploaded Creatives ({uploadedFiles.length})</h5>
//           <div className="grid grid-cols-2 gap-4">
//             {uploadedFiles.map((file) => (
//               <div key={file.id} className="bg-gray-50 rounded-lg p-4 relative border border-gray-200">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//                     {file.type.startsWith("image/") ? (
//                       file.status === "success" ? (
//                         // file.url is string
//                         // If Appwrite returns a signed url, it will be a string usable directly
//                         <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg" />
//                       ) : (
//                         <Image className="w-6 h-6 text-gray-500" />
//                       )
//                     ) : (
//                       <FileVideo className="w-6 h-6 text-gray-500" />
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-black text-sm font-medium truncate">{file.name}</p>
//                     <p className="text-gray-600 text-xs">{formatFileSize(file.size)}</p>

//                     <div className="flex items-center mt-2">
//                       {file.status === "uploading" && (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                           <span className="text-xs text-gray-600">Uploading...</span>
//                         </div>
//                       )}
//                       {file.status === "success" && (
//                         <div className="flex items-center space-x-2">
//                           <CheckCircle className="w-4 h-4 text-green-600" />
//                           <span className="text-xs text-green-600">Ready</span>
//                         </div>
//                       )}
//                       {file.status === "error" && (
//                         <div className="flex items-center space-x-2">
//                           <AlertTriangle className="w-4 h-4 text-red-600" />
//                           <span className="text-xs text-red-600">Failed</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeFile(file.id)}
//                     className="absolute top-2 right-2 w-6 h-6 p-0 text-gray-500 hover:text-black hover:bg-gray-200"
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }


// "use client";

// import React, { useState, useCallback } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Upload,
//   X,
//   Image,
//   FileVideo,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Client, Account, Storage } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const account = new Account(client);
// const storage = new Storage(client);

// const BUCKET_ID = "68d11568000196a6400e";

// interface UploadedFile {
//   id: string;
//   name: string;
//   type: string;
//   size: number;
//   url: string;
//   status: "uploading" | "success" | "error";
// }

// export function CreativesUploadSection({
//   campaignId,
//   onFilesChange,
// }: {
//   campaignId: string;
//   onFilesChange: (files: UploadedFile[]) => void;
// }) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isDragOver, setIsDragOver] = useState(false);

//   /** --- Drag & Drop Handlers --- */
//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     handleFiles(files);
//   }, []);

//   /** --- Input Upload --- */
//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(Array.from(e.target.files));
//     }
//   };

//   /** --- File Handling with Appwrite --- */
//   const handleFiles = async (files: File[]) => {
//     let user;
//     try {
//       user = await account.get();
//     } catch {
//       alert("You must be logged in to upload creatives.");
//       return;
//     }

//     for (const file of files) {
//       const fileId = uuidv4();

//       const newFile: UploadedFile = {
//         id: fileId,
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         url: URL.createObjectURL(file),
//         status: "uploading",
//       };

//       setUploadedFiles((prev) => [...prev, newFile]);

//       try {
//         const storageRes = await storage.createFile(BUCKET_ID, fileId, file);

//         const fileUrl = storage.getFilePreview(BUCKET_ID, storageRes.$id);

//         const updatedFile = {
//           ...newFile,
//           url: fileUrl,
//           status: "success" as const,
//         };

//         setUploadedFiles((prev) =>
//           prev.map((f) => (f.id === fileId ? updatedFile : f))
//         );
//         onFilesChange([...uploadedFiles, updatedFile]);
//       } catch (err) {
//         console.error("Upload failed:", err);
//         setUploadedFiles((prev) =>
//           prev.map((f) =>
//             f.id === fileId ? { ...f, status: "error" as const } : f
//           )
//         );
//       }
//     }
//   };

//   /** --- Remove File --- */
//   const removeFile = (fileId: string) => {
//     const updated = uploadedFiles.filter((f) => f.id !== fileId);
//     setUploadedFiles(updated);
//     onFilesChange(updated);
//   };

//   /** --- Helpers --- */
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   return (
//     <Card className="bg-white border-gray-200 p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-black mb-6">Creative Upload</h3>

//       {/* Upload Zone */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//           isDragOver
//             ? "border-purple-500 bg-purple-50"
//             : "border-gray-300 hover:border-gray-400"
//         }`}
//       >
//         <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
//         <h4 className="text-black mb-2">Drag & drop your creatives here</h4>
//         <p className="text-gray-600 mb-4">or</p>
//         <Button
//           variant="outline"
//           className="border-gray-300 text-black hover:bg-gray-50"
//           onClick={() => document.getElementById("file-input")?.click()}
//         >
//           Browse Files
//         </Button>
//         <input
//           id="file-input"
//           type="file"
//           multiple
//           accept="image/*,video/*"
//           className="hidden"
//           onChange={handleFileInput}
//         />
//       </div>

//       {/* Uploaded Files */}
//       {uploadedFiles.length > 0 && (
//         <div className="mt-6">
//           <h5 className="text-black font-medium mb-4">
//             Uploaded Creatives ({uploadedFiles.length})
//           </h5>
//           <div className="grid grid-cols-2 gap-4">
//             {uploadedFiles.map((file) => (
//               <div
//                 key={file.id}
//                 className="bg-gray-50 rounded-lg p-4 relative border border-gray-200"
//               >
//                 <div className="flex items-start space-x-3">
//                   <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//                     {file.type.startsWith("image/") ? (
//                       file.status === "success" ? (
//                         <img
//                           src={file.url}
//                           alt={file.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       ) : (
//                         <Image className="w-6 h-6 text-gray-500" />
//                       )
//                     ) : (
//                       <FileVideo className="w-6 h-6 text-gray-500" />
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-black text-sm font-medium truncate">
//                       {file.name}
//                     </p>
//                     <p className="text-gray-600 text-xs">
//                       {formatFileSize(file.size)}
//                     </p>

//                     <div className="flex items-center mt-2">
//                       {file.status === "uploading" && (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                           <span className="text-xs text-gray-600">
//                             Uploading...
//                           </span>
//                         </div>
//                       )}
//                       {file.status === "success" && (
//                         <div className="flex items-center space-x-2">
//                           <CheckCircle className="w-4 h-4 text-green-600" />
//                           <span className="text-xs text-green-600">Ready</span>
//                         </div>
//                       )}
//                       {file.status === "error" && (
//                         <div className="flex items-center space-x-2">
//                           <AlertTriangle className="w-4 h-4 text-red-600" />
//                           <span className="text-xs text-red-600">Failed</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeFile(file.id)}
//                     className="absolute top-2 right-2 w-6 h-6 p-0 text-gray-500 hover:text-black hover:bg-gray-200"
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }


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
import { Client, Account, Storage, Databases, Permission, Role } from "appwrite";

/**
 * IMPORTANT env vars (set these in Vercel / .env.local)
 * NEXT_PUBLIC_APPWRITE_ENDPOINT
 * NEXT_PUBLIC_APPWRITE_PROJECT_ID
 * NEXT_PUBLIC_BUCKET_ID
 * NEXT_PUBLIC_APPWRITE_DATABASE_ID
 * NEXT_PUBLIC_APPWRITE_CREATIVE_COLLECTION_ID
 */

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID || "";
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const CREATIVE_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_CREATIVE_COLLECTION_ID || "";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string; // viewable URL (string)
  status: "uploading" | "success" | "error";
  fileType: "creative";
}

interface Props {
  campaignId: string;
  brandName?: string;
  industry?: string;
  venues?: string[];
  budget?: number;
  onFilesChange: (files: UploadedFile[]) => void;
}

// simple industry -> tag mapping
const industryTagsMap: Record<string, string[]> = {
  Technology: ["tech", "innovation", "digital"],
  Healthcare: ["health", "wellness", "medical"],
  Finance: ["finance", "banking", "money"],
  "Food & Beverage": ["food", "restaurant", "hospitality"],
  Automotive: ["cars", "auto", "transport"],
  Fashion: ["fashion", "style", "clothing"],
  "Sports & Fitness": ["fitness", "sports", "health"],
  Entertainment: ["movies", "music", "events"],
  "Travel & Tourism": ["travel", "tourism", "adventure"],
  Other: ["general", "advertising"],
};

export function CreativesUploadSection({
  campaignId,
  brandName,
  industry,
  venues = [],
  budget,
  onFilesChange,
}: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Quick env checks
  if (!BUCKET_ID) {
    console.error("BUCKET_ID not set (NEXT_PUBLIC_BUCKET_ID).");
  }
  if (!DATABASE_ID || !CREATIVE_COLLECTION_ID) {
    // warn but let uploads continue (we'll not fail upload on DB error)
    console.warn(
      "Database or collection env var not set. Appwrite DB writes will be skipped or may fail.",
      { DATABASE_ID, CREATIVE_COLLECTION_ID }
    );
  }

  /** Drag & Drop */
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

  /** Input file */
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  /** Core upload routine */
  const handleFiles = async (files: File[]) => {
    let user;
    try {
      user = await account.get();
    } catch (err) {
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
        fileType: "creative",
      };

      // add to UI immediately
      setUploadedFiles((prev) => {
        const next = [...prev, newFile];
        try {
          onFilesChange(next);
        } catch {
          /* swallow */
        }
        return next;
      });

      try {
        // 1. Upload to Appwrite Storage
        const storageRes = await storage.createFile(BUCKET_ID, fileId, file);
        // getFileView returns a URL string
        const fileUrl = storage.getFileView(BUCKET_ID, storageRes.$id) as string;

        // 2. build metadata
        const tags = (industry && industryTagsMap[industry]) || ["general"];
        const metadata = {
          campaignId,
          brandName: brandName ?? null,
          industry: industry ?? null,
          tags,
          venues,
          fileId: storageRes.$id,
          fileUrl,
          fileType: "creative",
          status: "pending", // pending until manual review / payment
          userId: user.$id,
          size: file.size,
          mimeType: file.type,
          name: file.name,
          uploadedAt: new Date().toISOString(),
          budget: budget ?? null,
        };

        // 3. Try saving metadata to Appwrite DB but DON'T let DB error break the upload
        if (DATABASE_ID && CREATIVE_COLLECTION_ID) {
          try {
            // try create with same id as fileId for easy lookup later.
            // include read permission = public, write permissions = owner
            await databases.createDocument(
              DATABASE_ID,
              CREATIVE_COLLECTION_ID,
              fileId,
              metadata,
              // [
              //   // public read
              //   Permission.read(Role.any()),
              // ],
              [
                // write only by owner (user)
                Permission.write(Role.user(user.$id)),
              ]
            );
          } catch (dbErr) {
            // don't propagate — log and continue
            console.warn("Failed to create creative DB document (upload still succeeded):", dbErr);
          }
        } else {
          console.warn("Skipping DB write because DATABASE_ID or CREATIVE_COLLECTION_ID is missing.");
        }

        // 4. mark file success in UI
        const updatedFile: UploadedFile = { ...newFile, url: fileUrl, status: "success" };

        setUploadedFiles((prev) => {
          const updated = prev.map((f) => (f.id === fileId ? updatedFile : f));
          try {
            onFilesChange(updated);
          } catch {
            /* swallow */
          }
          return updated;
        });
      } catch (err) {
        console.error("Upload failed:", err);
        // mark that file as error
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "error" as const } : f
          )
        );
        // still call onFilesChange (so parent knows)
        setTimeout(() => {
          try {
            onFilesChange(
              uploadedFiles.map((f) =>
                f.id === fileId ? { ...f, status: "error" as const } : f
              )
            );
          } catch {}
        }, 0);
      }
    }
  };

  /** Remove File (UI only) */
  const removeFile = (fileId: string) => {
    const updated = uploadedFiles.filter((f) => f.id !== fileId);
    setUploadedFiles(updated);
    try {
      onFilesChange(updated);
    } catch {}
  };

  /** Helpers */
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
          isDragOver ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"
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
          <h5 className="text-black font-medium mb-4">Uploaded Creatives ({uploadedFiles.length})</h5>
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-gray-50 rounded-lg p-4 relative border border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {file.type.startsWith("image/") ? (
                      file.status === "success" ? (
                        // file.url is string
                        // If Appwrite returns a signed url, it will be a string usable directly
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Image className="w-6 h-6 text-gray-500" />
                      )
                    ) : (
                      <FileVideo className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm font-medium truncate">{file.name}</p>
                    <p className="text-gray-600 text-xs">{formatFileSize(file.size)}</p>

                    <div className="flex items-center mt-2">
                      {file.status === "uploading" && (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-gray-600">Uploading...</span>
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
