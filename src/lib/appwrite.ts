// import { Client, Account } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // your Appwrite endpoint
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // your project ID

// export const account = new Account(client);
// export default client;

import {
  Client,
  Account,
  Databases,
  Storage,
  Query,  ID, Permission, Role 
} from "appwrite";
import { getEnvVar } from "./env";

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
  CAMPAIGNS: "campaigns",
  VENUES: "venues",
  CREATIVES: "creatives",
  PAYMENTS: "payments",
  USER_GALLERIES: "user_galleries",
};

// Storage Bucket ID
export const STORAGE_BUCKET_ID = getEnvVar(
  "APPWRITE_STORAGE_BUCKET_ID",
);

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
      `${window.location.origin}/dashboard`, // Success URL
      `${window.location.origin}/auth`    // Failure URL (you can adjust)
    );
  } catch (error) {
    throw error;
  }
} ,


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

  // Campaigns
  async createCampaign(campaignData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CAMPAIGNS,
        "unique()",
        campaignData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getCampaigns(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CAMPAIGNS,
        [Query.equal("userId", userId)],
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateCampaign(campaignId: string, data: any) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.CAMPAIGNS,
        campaignId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Venues
  async getVenues() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.VENUES,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 // Creatives/Gallery
// async uploadFile(file: File, userId: string) {
//   try {
//     const response = await storage.createFile(
//       STORAGE_BUCKET_ID,
//       ID.unique(), // ✅ not "unique()"
//       file,
//       [
//         Permission.read(Role.any()),              // or Role.user(userId) if you want private
//         Permission.write(Role.user(userId)),
//         Permission.update(Role.user(userId)),
//         Permission.delete(Role.user(userId)),
//       ]
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// } ,


//   async getUserGallery(userId: string) {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         COLLECTIONS.USER_GALLERIES,
//         [Query.equal("userId", userId)],
//       );
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   async addToGallery(galleryData: any) {
//     try {
//       const response = await databases.createDocument(
//         DATABASE_ID,
//         COLLECTIONS.USER_GALLERIES,
//         "unique()",
//         galleryData,
//       );
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },


async uploadFile(file: File, userId: string) {
    if (!userId) throw new Error('uploadFile: userId is required');

    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file,
        [
          // public read so images render in gallery for everyone.
          // If you want private files, change Permission.read(Role.any()) -> Permission.read(Role.user(userId))
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getUserGallery(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USER_GALLERIES,
        [Query.equal('userId', userId)],
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async addToGallery(galleryData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USER_GALLERIES,
        ID.unique(),
        galleryData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Let GalleryPage's toUrl handle whatever this returns (string / Response / Blob)
  // async getFileView(fileId: string) {
  //   try {
  //     return storage.getFileView(STORAGE_BUCKET_ID, fileId);
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // async getFilePreview(fileId: string, width?: number, height?: number) {
  //   try {
  //     // method parameters depend on SDK version; this call will be forwarded to Appwrite SDK
  //     return storage.getFilePreview(STORAGE_BUCKET_ID, fileId, width, height);
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  
  // Payments
  async createPayment(paymentData: any) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PAYMENTS,
        "unique()",
        paymentData,
      );
      return response;
    } catch (error) {
      throw error;
    }
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

  // In lib/appwrite.ts
// async getFileView(fileId: string) {
//   try {
//     const url = storage.getFileView(STORAGE_BUCKET_ID, fileId);
//     return url.href ?? url;  // ensure plain string
//   } catch (error) {
//     throw error;
//   }
// },

// async getFilePreview(fileId: string, width = 400, height = 400) {
//   try {
//     const url = storage.getFilePreview(STORAGE_BUCKET_ID, fileId, width, height);
//     return url.href ?? url;
//   } catch (error) {
//     throw error;
//   }
// },

// async getFileView(fileId: string) {
//   const result = storage.getFileView(STORAGE_BUCKET_ID, fileId);
//   return (result as any).href ?? String(result);
// } ,

// async getFilePreview(fileId: string, width = 400, height = 400) {
//   const result = storage.getFilePreview(STORAGE_BUCKET_ID, fileId, width, height);
//   return (result as any).href ?? String(result);
// } ,




};

export async function getUserGallery(userId: string) {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.USER_GALLERIES, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
    ]);

    return res.documents.map((doc: any) => {
      const viewUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/68d54819001c338ffb7e/files/${doc.fileId}/view?project=68d0f5640038dcb583d3`;
      const previewUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/68d54819001c338ffb7e/files/${doc.fileId}/view?project=68d0f5640038dcb583d3&width=400&height=300&quality=80`;

      return {
        ...doc,
        previewUrl,
        viewUrl,
      };
    });
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return [];
  }
}

export { client, Query };