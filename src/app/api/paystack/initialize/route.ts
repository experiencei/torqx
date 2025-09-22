import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, campaignId } = body;

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount, // amount already multiplied by 100 in frontend
        metadata: { campaignId },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/campaign/success`,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data.data); // ✅ return only useful payload
  } catch (err: any) {
    console.error("Paystack init error:", err);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}
