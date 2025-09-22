// // utils/uploadCreative.ts
// import { storage } from "./firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export async function uploadCreative(file: File, userId: string, campaignId: string) {
//   // Validate file type
//   if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
//     throw new Error("Only image and video files are allowed");
//   }

//   // If video, validate length
//   if (file.type.startsWith("video/")) {
//     const videoEl = document.createElement("video");
//     videoEl.src = URL.createObjectURL(file);
//     await new Promise((resolve) => (videoEl.onloadedmetadata = resolve));
//     if (videoEl.duration > 30) {
//       throw new Error("Video must be 30 seconds or shorter");
//     }
//   }

//   const fileRef = ref(storage, `users/${userId}/campaigns/${campaignId}/${file.name}`);
//   const snapshot = await uploadBytes(fileRef, file);
//   return await getDownloadURL(snapshot.ref);
// }
