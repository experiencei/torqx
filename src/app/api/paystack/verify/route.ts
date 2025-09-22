// src/app/api/paystack/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { Client, Databases, ID, Permission, Role } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!); // 👈 server-side key

const databases = new Databases(client);

const DATABASE_ID = "68d11538003d04474891";
const COLLECTION_ID = "torqxai"; // your campaigns collection

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, campaignData, uploadedFiles } = body;

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference missing" },
        { status: 400 }
      );
    }

    // ✅ Verify payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data;
    if (payment.data.status !== "success") {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }

    // ✅ Save campaign + creatives to Appwrite
    const savedDocs: any[] = [];
    for (const file of uploadedFiles) {
      const doc = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          campaignId: campaignData.campaignId,
          userId: campaignData.userId,
          budget: campaignData.budget,
          brandName: campaignData.brandName,
          industry: campaignData.industry,
          startDate: campaignData.startDate,
          endDate: campaignData.endDate,
          selectedCountry: campaignData.selectedCountry,
          selectedVenues: campaignData.selectedVenues,
          paymentRef: reference,
          fileId: file.id,
          url: file.url,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(campaignData.userId)),
          Permission.delete(Role.user(campaignData.userId)),
        ]
      );

      savedDocs.push(doc);
    }

    return NextResponse.json({
      success: true,
      message: "Campaign saved successfully",
      savedDocs,
    });
  } catch (error: any) {
    console.error("❌ Error verifying payment:", error.response?.data || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
