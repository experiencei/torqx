"use client";

import React, { useState, useEffect } from "react";
import { BudgetSection } from "./BudgetSection";
import { TargetLocationSection } from "./TargetLocationSection";
import { VenueTypesSection } from "./VenueTypesSection";
import { SchedulingGridSection } from "./SchedulingGridSection";
import { BrandSection } from "./BrandSection";
import { CreativesUploadSection } from "./CreativesUploadSection";
import { Button } from "@/components/ui/button";
import { Save, Menu, Play } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Client, Account, Databases, Permission, Role } from "appwrite";

/**
 * IMPORTANT env vars:
 * NEXT_PUBLIC_APPWRITE_ENDPOINT
 * NEXT_PUBLIC_APPWRITE_PROJECT_ID
 * NEXT_PUBLIC_APPWRITE_DATABASE_ID
 * NEXT_PUBLIC_APPWRITE_CAMPAIGNS_COLLECTION_ID
 * NEXT_PUBLIC_APPWRITE_CREATIVE_COLLECTION_ID
 */

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const CAMPAIGNS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_CAMPAIGNS_COLLECTION_ID || "";
const CREATIVE_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_CREATIVE_COLLECTION_ID || "";

export default function Campaigns({
  sidebarCollapsed,
  setSidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}) {
  const [budget, setBudget] = useState(50000);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [campaignId] = useState(uuidv4());
  const [loading, setLoading] = useState(false);

  // CPM logic (₦50,000 CPM = 1000 impressions)
  const cpm = 50000;
  const estimatedImpressions = Math.floor((budget / cpm) * 1000);
  const screensCount = Math.floor(budget / 1000);
  const maxCapacity = estimatedImpressions > 5000;

  // fetch logged in email (optional)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserEmail(user.email || "");
      } catch (err) {
        console.warn("No logged-in user found", err);
      }
    };
    fetchUser();
  }, []);

  // Save campaign to Appwrite (no payment) — sets status = draft / pending_payment
  const handleSaveCampaign = async () => {
    let user: any;
    try {
      user = await account.get();
    } catch {
      alert("You must be logged in to save a campaign.");
      return;
    }

    if (!budget || budget <= 0) {
      alert("Please set a valid budget.");
      return;
    }

    if (!uploadedFiles.length) {
      alert("Please upload at least one creative.");
      return;
    }

    setLoading(true);

    const campaignDoc = {
      campaignId,
      userId: user.$id,
      userEmail: user.email || null,
      brandName,
      industry,
      budget,
      startDate,
      endDate,
      selectedCountry,
      selectedVenues,
      creatives: uploadedFiles.map((f) => ({
        id: f.id,
        name: f.name,
        url: f.url,
        status: f.status,
      })),
      estimatedImpressions,
      screensCount,
      status: "draft", // or 'pending_payment' if you later connect Paystack
      createdAt: new Date().toISOString(),
    };

    try {
      if (!DATABASE_ID || !CAMPAIGNS_COLLECTION_ID) {
        throw new Error("Missing DB/collection environment variables for campaigns.");
      }

      // save campaign doc
      await databases.createDocument(
        DATABASE_ID,
        CAMPAIGNS_COLLECTION_ID,
        campaignId,
        campaignDoc,
        // [
        //   Permission.read(Role.any()), // allow public read (adjust to your needs)
        // ],
        [
          Permission.write(Role.user(user.$id)), // only owner can write
        ]
      );

      // Optionally link each creative doc to this campaign (best-effort; don't fail the whole flow)
      if (CREATIVE_COLLECTION_ID) {
        for (const f of uploadedFiles) {
          try {
            // patch creative document to reference campaign (non-blocking if fails)
            await databases.updateDocument(DATABASE_ID, CREATIVE_COLLECTION_ID, f.id, {
              campaignId,
              status: "assigned",
              updatedAt: new Date().toISOString(),
            });
          } catch (err) {
            console.warn("Failed to update creative document (non-blocking):", f.id, err);
          }
        }
      } else {
        console.warn("CREATIVE_COLLECTION_ID missing; creative docs won't be updated.");
      }

      alert("Campaign saved successfully (draft). You can integrate payment later to publish.");
    } catch (err) {
      console.error("Error saving campaign:", err);
      alert("Failed to save the campaign. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-white">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-black hover:bg-gray-100"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-black">Create Campaign</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Set up your digital out-of-home advertising campaign</p>
          </div>
        </div>

        <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50 hidden md:flex">
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-[35%] p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <BudgetSection
            budget={budget}
            setBudget={setBudget}
            estimatedImpressions={estimatedImpressions}
            cpm={cpm}
            screensCount={screensCount}
            maxCapacity={maxCapacity}
          />
        </div>

        <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-white">
          <TargetLocationSection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          <VenueTypesSection selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} />

          <SchedulingGridSection />

          <BrandSection brandName={brandName} setBrandName={setBrandName} industry={industry} setIndustry={setIndustry} />

          {/* Creatives upload — pass callback to receive uploaded files */}
          <CreativesUploadSection
            campaignId={campaignId}
            brandName={brandName}
            industry={industry}
            venues={selectedVenues}
            budget={budget}
            onFilesChange={(files) => setUploadedFiles(files)}
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-8 py-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveCampaign} disabled={loading}>
          <Play className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : "Save Campaign (no payment)"}
        </Button>
      </div>
    </>
  );
}
