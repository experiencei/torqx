import {
  Client,
  Account,
  Databases,
  Storage,
  Query,
} from "appwrite";
import { getEnvVar } from "./envs";

const client = new Client();
 
client
  .setEndpoint(getEnvVar("APPWRITE_ENDPOINT"))
  .setProject(getEnvVar("APPWRITE_PROJECT_ID"));

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = getEnvVar("APPWRITE_DATABASE_ID");
export const COLLECTIONS = {
  MEDIA: "media",
  PLAYLISTS: "playlists", 
  SCREENS: "screens",
  BUSINESS_PROFILES: "business_profiles",
  PLAYLIST_ITEMS: "playlist_items",
};

// Storage Bucket ID
export const STORAGE_BUCKET_ID = getEnvVar(
  "APPWRITE_STORAGE_BUCKET_ID",
);

export async function getLastUploadedFile(userId: string) {
  try {
    // Query MEDIA collection for the latest document belonging to this user
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.MEDIA, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
      Query.limit(1),
    ]);

    if (!res.documents.length) return null;

    const doc = res.documents[0];

    // Always construct a working view URL
    const viewUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${doc.fileId}/view?project=68d9a0ed001391986ee3`;

    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      name: doc.name,
      originalName: doc.originalName,
      type: doc.type?.startsWith("image") ? "image" : "video",
      size: doc.size,
      fileId: doc.fileId,
      url: viewUrl,
      duration: doc.duration,
      userId: doc.userId,
    };
  } catch (err) {
    console.error("Error fetching last uploaded file:", err);
    return null;
  }
}


// Helper functions
export const appwriteService = {
  // Authentication
  async createUser(
    email: string,
    password: string,
    name: string,
  ) {
    try {
      const response = await account.create(
        "unique()",
        email,
        password,
        name,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(
        email,
        password,
      );
      return session;
    } catch (error) {
      throw error;
    }
  },

  async loginWithGoogle() {
  try {
    await account.createOAuth2Session(
      "google",
      `${window.location.origin}/screens`, // Success URL
      // `${window.location.origin}/auth`    // Failure URL (you can adjust)
    );
  } catch (error) {
    throw error;
  }
}
,

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  },

  // Media Management
  async uploadFile(file: File) {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        "unique()",
        file,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createMediaFile(mediaData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.MEDIA,
        "unique()",
        mediaData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getMediaFiles(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.MEDIA,
        [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteMediaFile(fileId: string) {
    try {
      const response = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.MEDIA,
        fileId,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Playlist Management
  async createPlaylist(playlistData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        "unique()",
        playlistData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getPlaylists(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updatePlaylist(playlistId: string, data: any) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        playlistId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deletePlaylist(playlistId: string) {
    try {
      const response = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        playlistId,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
 
  // Screen Management
  async createScreen(screenData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        "unique()",
        screenData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getScreens(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateScreen(screenId: string, data: any) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        screenId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteScreen(screenId: string) {
    try {
      const response = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        screenId,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  

  // Business Profile Management
  async createBusinessProfile(profileData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.BUSINESS_PROFILES,
        "unique()",
        profileData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getBusinessProfile(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.BUSINESS_PROFILES,
        [Query.equal("userId", userId)],
      );
      return response.documents[0] || null;
    } catch (error) {
      throw error;
    }
  },

  async updateBusinessProfile(profileId: string, data: any) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.BUSINESS_PROFILES,
        profileId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Generate pairing code for screens
  generatePairingCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  },

  // async getFilePreview(fileId: string) {
  //   try {
  //     const url = storage.getFilePreview(
  //       STORAGE_BUCKET_ID,
  //       fileId,
  //     );
  //     return url;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async getFileView(fileId: string) {
  //   try {
  //     const url = storage.getFileView(
  //       STORAGE_BUCKET_ID,
  //       fileId,
  //     );
  //     return url;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

 async getFilePreview(fileId: string) {
    try {
      const maybe = storage.getFilePreview(STORAGE_BUCKET_ID, fileId);
      // storage.getFilePreview may return a string or an object with .href or a thenable — normalize:
      const resolved = await Promise.resolve(maybe);
      if (!resolved) return "";
      if (typeof resolved === "string") return resolved;
      if (typeof resolved === "object" && "href" in resolved) return String((resolved as any).href);
      return String(resolved);
    } catch (error) {
      console.error("getFilePreview error:", error);
      throw error;
    }
  },

  async getFileView(fileId: string) {
    try {
      const maybe = storage.getFileView(STORAGE_BUCKET_ID, fileId);
      const resolved = await Promise.resolve(maybe);
      if (!resolved) return "";
      if (typeof resolved === "string") return resolved;
      if (typeof resolved === "object" && "href" in resolved) return String((resolved as any).href);
      return String(resolved);
    } catch (error) {
      console.error("getFileView error:", error);
      throw error;
    }
  },

  
};


export function resolveFileUrl(fileId: string): string {
  if (!fileId) return "";
  return `${client.config.endpoint}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/view?project=${client.config.project}`;
}

// export async function getLastUploadedFile() {
//   try {
//     const res = await storage.listFiles(STORAGE_BUCKET_ID);
//     if (!res.files.length) return null;

//     // sort descending by $createdAt
//     const sorted = res.files.sort(
//       (a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
//     );

//     return sorted[0]; // last uploaded
//   } catch (err) {
//     console.error("Error fetching last uploaded file:", err);
//     return null;
//   }
// }





// Fetch all media files for a user
export async function getUserMediaFiles(userId: string) {
  try {
    // Get all docs for this user
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.MEDIA, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"), // newest first
    ]);

    return res.documents.map((doc) => ({
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      name: doc.name,
      originalName: doc.originalName,
      type: doc.type?.startsWith("image") ? "image" : "video",
      size: doc.size,
      fileId: doc.fileId,
      url: `https://fra.cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${doc.fileId}/view?project=68d9a0ed001391986ee3`,
      duration: doc.duration,
      userId: doc.userId,
      thumbnailUrl: doc.thumbnailUrl,
    }));

    console.log("res" , res)
  } catch (err) {
    console.error("Error fetching user media files:", err);
    return [];
  }
}


export { client, Query };