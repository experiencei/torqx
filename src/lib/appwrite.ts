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
  Query,
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
      // Create OAuth2 session with Google
      await account.createOAuth2Session(
        "google",
        `${window.location.origin}`, // Success URL
        `${window.location.origin}`, // Failure URL
      );
    } catch (error) {
      throw error;
    }
  },

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

  async getUserGallery(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USER_GALLERIES,
        [Query.equal("userId", userId)],
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
        "unique()",
        galleryData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

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

  async getFilePreview(fileId: string) {
    try {
      const url = storage.getFilePreview(
        STORAGE_BUCKET_ID,
        fileId,
      );
      return url;
    } catch (error) {
      throw error;
    }
  },

  async getFileView(fileId: string) {
    try {
      const url = storage.getFileView(
        STORAGE_BUCKET_ID,
        fileId,
      );
      return url;
    } catch (error) {
      throw error;
    }
  },
};

export { client, Query };