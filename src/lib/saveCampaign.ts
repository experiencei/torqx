// // utils/saveCampaign.ts
// import { db, auth } from "@/lib/firebase";
// import { doc, setDoc } from "firebase/firestore";

// export async function saveCampaign(campaignData: any, creatives: File[]) {
//   const user = auth.currentUser;
//   if (!user) throw new Error("User not authenticated");

//   const campaignId = doc(db, "campaigns").id; // auto-id
//   const creativeUrls: string[] = [];

//   for (const file of creatives) {
//     const url = await (await import("./uploadCreatives")).uploadCreative(file, user.uid, campaignId);
//     creativeUrls.push(url);
//   }

//   await setDoc(doc(db, "campaigns", campaignId), {
//     ...campaignData,
//     creatives: creativeUrls,
//     userId: user.uid,
//     createdAt: new Date().toISOString(),
//   });

//   return campaignId;
// }
