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

// -----------------------
// Playlist Item Helpers
// -----------------------

// Limit name length so serialized string doesn't explode
const SHORT_NAME_MAX = 50;

/**
 * Convert a playlist item into a minimal JSON string for storage.
 */
function serializePlaylistItemForServer(item: any): string {
  const minimum = {
    id: item.id,
    mediaId: item.mediaId,
    duration: item.duration ?? 0,
    order: item.order ?? 0,
    media: {
      name: (item.media?.name ?? "").toString().slice(0, SHORT_NAME_MAX),
      type: item.media?.type ?? "image",
      $id: item.media?.$id ?? item.mediaId ?? "",
    },
  };
  return JSON.stringify(minimum);
}

/**
 * Ensure playlist items are serialized strings that respect length limits.
 */
function ensureItemsAreServerFriendly(items: any[]): string[] {
  return (items || []).map((it) => {
    if (typeof it === "string") {
      if (it.length > 4800) {
        try {
          const parsed = JSON.parse(it);
          return serializePlaylistItemForServer(parsed);
        } catch {
          return it.slice(0, 4800); // fallback truncate
        }
      }
      return it;
    }
    return serializePlaylistItemForServer(it);
  });
}

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

  // async getMediaFiles(userId: string) {
  //   try {
  //     const response = await databases.listDocuments(
  //       DATABASE_ID,
  //       COLLECTIONS.MEDIA,
  //       [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

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
  // async createPlaylist(playlistData: any) {
  //   try {
  //     const response = await databases.createDocument(
  //       DATABASE_ID,
  //       COLLECTIONS.PLAYLISTS,
  //       "unique()",
  //       playlistData,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async getPlaylists(userId: string) {
  //   try {
  //     const response = await databases.listDocuments(
  //       DATABASE_ID,
  //       COLLECTIONS.PLAYLISTS,
  //       [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },


  async getPlaylists(userId?: string) {
    try {
      const queries: any[] = [Query.orderDesc("$createdAt")];
      if (userId) queries.unshift(Query.equal("userId", userId));
      console.log("Fetching playlists for user:", userId);
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        queries
      );
      console.log("Playlists fetched:", (res && res.documents) || res);
      return res;
    } catch (err) {
      console.error("getPlaylists error:", err);
      throw err;
    }
  } ,

  async getPlaylist(playlistId: string) {
    try {
      const res = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        playlistId
      );
      console.log("getPlaylist:", playlistId, res);
      return res;
    } catch (err) {
      console.error("getPlaylist error:", playlistId, err);
      throw err;
    }
  } , 

  async createPlaylist(payload: any) {
    try {
      console.log("Creating playlist with payload (raw):", payload);

      // Ensure items are converted to sanitized strings (if the server collection expects array<string>)
      const serverPayload = {
        ...payload,
        items: ensureItemsAreServerFriendly(payload.items || []),
        // store schedule as string to be safe if your schema expects a string
        schedule:
          typeof payload.schedule === "string"
            ? payload.schedule
            : JSON.stringify(payload.schedule ?? {}),
      };

      console.log("Creating playlist (server payload):", serverPayload);

      const doc = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        "unique()",
        serverPayload
      );

      console.log("Playlist created:", doc);
      return doc;
    } catch (err) {
      console.error("createPlaylist error:", err);
      throw err;
    }
  } ,

  async updatePlaylist(playlistId: string, payload: any) {
    try {
      console.log("Updating playlist:", playlistId, payload);

      const serverPayload = {
        ...payload,
      };

      // If items present, sanitize
      if (payload.items) {
        serverPayload.items = ensureItemsAreServerFriendly(payload.items);
      }

      if (payload.schedule && typeof payload.schedule !== "string") {
        serverPayload.schedule = JSON.stringify(payload.schedule);
      }

      const doc = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        playlistId,
        serverPayload
      );

      console.log("Playlist updated:", doc);
      return doc;
    } catch (err) {
      console.error("updatePlaylist error:", playlistId, err);
      throw err;
    }
  } ,

  async deletePlaylist(playlistId: string) {
    try {
      console.log("Deleting playlist:", playlistId);
      const res = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.PLAYLISTS,
        playlistId
      );
      console.log("Deleted playlist:", playlistId, res);
      return res;
    } catch (err) {
      console.error("deletePlaylist error:", playlistId, err);
      throw err;
    }
  } ,

  // -----------------------
  // Media helpers (per-playlist media items)
  // -----------------------
  async getMediaFiles(userId?: string) {
    try {
      const queries: any[] = [Query.orderAsc("order")];
      if (userId) queries.unshift(Query.equal("userId", userId));
      console.log("Fetching media files for user:", userId);
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.MEDIA,
        queries
      );
      console.log("Media fetched:", res.documents ?? res);
      return res;
    } catch (err) {
      console.error("getMediaFiles error:", err);
      throw err;
    }
  } ,
  /**
   * Upsert a media doc in `media` collection.
   * - If `mediaId` is an existing doc id => update it
   * - Otherwise try find by fileId or externalUrl, update if found
   * - Otherwise create a new document
   *
   * This function logs debug info for tracing.
   */
  async upsertMedia(mediaIdOrFileId: string | undefined | null, payload: any) {
    try {
      console.log("upsertMedia called with id/fileId:", mediaIdOrFileId, "payload:", payload);

      // 1) If mediaIdOrFileId looks like a doc id, try getDocument
      if (mediaIdOrFileId) {
        try {
          const existing = await databases.getDocument(
            DATABASE_ID,
        COLLECTIONS.MEDIA,
            mediaIdOrFileId
          );
          // If found, update
          console.log("upsertMedia -> found existing by doc id:", existing.$id);
          const updated = await databases.updateDocument(
            DATABASE_ID,
        COLLECTIONS.MEDIA,
            existing.$id,
            payload
          );
          console.log("upsertMedia -> updated:", updated);
          return updated;
        } catch (errInner) {
          // not found by id -> continue to try search by fileId / externalUrl
          console.log("upsertMedia: not found by doc id, will try by fileId/externalUrl");
        }
      }

      // 2) Try finding by fileId (if payload.fileId or mediaIdOrFileId looks like a fileId)
      const fileIdToSearch = payload.fileId ?? mediaIdOrFileId;
      if (fileIdToSearch) {
        try {
          const list = await databases.listDocuments(
            DATABASE_ID,
        COLLECTIONS.MEDIA,
            [Query.equal("fileId", fileIdToSearch), Query.limit(1)]
          );
          if (list && Array.isArray(list.documents) && list.documents.length > 0) {
            const doc = list.documents[0];
            console.log("upsertMedia -> found by fileId:", doc.$id);
            const updated = await databases.updateDocument(
              DATABASE_ID,
        COLLECTIONS.MEDIA,
              doc.$id,
              payload
            );
            console.log("upsertMedia -> updated by fileId:", updated);
            return updated;
          }
        } catch (err) {
          console.warn("upsertMedia: search by fileId failed:", err);
        }
      }

      // 3) Try finding by externalUrl if present
      if (payload.externalUrl) {
        try {
          const list = await databases.listDocuments(
            DATABASE_ID,
        COLLECTIONS.MEDIA,
            [Query.equal("externalUrl", payload.externalUrl), Query.limit(1)]
          );
          if (list && Array.isArray(list.documents) && list.documents.length > 0) {
            const doc = list.documents[0];
            console.log("upsertMedia -> found by externalUrl:", doc.$id);
            const updated = await databases.updateDocument(
              DATABASE_ID,
        COLLECTIONS.MEDIA,
              doc.$id,
              payload
            );
            console.log("upsertMedia -> updated by externalUrl:", updated);
            return updated;
          }
        } catch (err) {
          console.warn("upsertMedia: search by externalUrl failed:", err);
        }
      }

      // 4) Not found -> create
      console.log("upsertMedia -> creating new media doc with payload:", payload);
      const created = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.MEDIA,
        "unique()",
        payload
      );
      console.log("upsertMedia -> created:", created);
      return created;
    } catch (err) {
      console.error("upsertMedia error:", err);
      throw err;
    }
  },

  // async updatePlaylist(playlistId: string, data: any) {
  //   try {
  //     const response = await databases.updateDocument(
  //       DATABASE_ID,
  //       COLLECTIONS.PLAYLISTS,
  //       playlistId,
  //       data,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async deletePlaylist(playlistId: string) {
  //   try {
  //     const response = await databases.deleteDocument(
  //       DATABASE_ID,
  //       COLLECTIONS.PLAYLISTS,
  //       playlistId,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
 
  // Screen Management
  // async createScreen(screenData: any) {
  //   try {
  //     const response = await databases.createDocument(
  //       DATABASE_ID,
  //       COLLECTIONS.SCREENS,
  //       "unique()",
  //       screenData,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async getScreens(userId: string) {
  //   try {
  //     const response = await databases.listDocuments(
  //       DATABASE_ID,
  //       COLLECTIONS.SCREENS,
  //       [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async updateScreen(screenId: string, data: any) {
  //   try {
  //     const response = await databases.updateDocument(
  //       DATABASE_ID,
  //       COLLECTIONS.SCREENS,
  //       screenId,
  //       data,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async deleteScreen(screenId: string) {
  //   try {
  //     const response = await databases.deleteDocument(
  //       DATABASE_ID,
  //       COLLECTIONS.SCREENS,
  //       screenId,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },


  async getScreens(userId?: string) {
    try {
      const queries: any[] = [Query.orderDesc("$createdAt")];
      if (userId) queries.unshift(Query.equal("userId", userId));
      console.log("Fetching screens for user:", userId);
      const res = await databases.listDocuments(
       DATABASE_ID,
        COLLECTIONS.SCREENS,
        queries
      );
      console.log("Screens fetched:", res.documents ?? res);
      return res;
    } catch (err) {
      console.error("getScreens error:", err);
      throw err;
    }
  },

  async createScreen(payload: any) {
    try {
      console.log("createScreen payload:", payload);
      const doc = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        "unique()",
        payload
      );
      console.log("Screen created:", doc);
      return doc;
    } catch (err) {
      console.error("createScreen error:", err);
      throw err;
    }
  },

  async updateScreen(screenId: string, payload: any) {
    try {
      console.log("updateScreen:", screenId, payload);
      const doc = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        screenId,
        payload
      );
      console.log("Screen updated:", doc);
      return doc;
    } catch (err) {
      console.error("updateScreen error:", screenId, err);
      throw err;
    }
  },

  async deleteScreen(screenId: string) {
    try {
      console.log("deleteScreen:", screenId);
      const res = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.SCREENS,
        screenId
      );
      console.log("Screen deleted:", screenId, res);
      return res;
    } catch (err) {
      console.error("deleteScreen error:", screenId, err);
      throw err;
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
