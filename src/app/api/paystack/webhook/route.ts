import { NextResponse } from "next/server";
import { Client, Databases, ID, Permission, Role } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

const DATABASE_ID = "68d11538003d04474891";
const COLLECTION_ID = "torqxai";

export async function POST(req: Request) {
  try {
    const payload = await req.json(); // ✅ parse Paystack payload

    console.log("Webhook received:", payload);

    if (payload.event === "charge.success") {
      const data = payload.data;
      const metadata = data.metadata;

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          campaignId: metadata?.campaignId,
          userEmail: data.customer.email,
          budget: data.amount / 100,
          paymentRef: data.reference,
          status: "paid",
        },
        [Permission.read(Role.any())]
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
