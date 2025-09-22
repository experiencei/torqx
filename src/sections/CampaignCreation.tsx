"use client";

import React, { useState } from "react";
import { BudgetSection } from "./BudgetSection";
import { TargetLocationSection } from "./TargetLocationSection";
import { VenueTypesSection } from "./VenueTypesSection";
import { SchedulingGridSection } from "./SchedulingGridSection";
import { BrandSection } from "./BrandSection";
import { CreativesUploadSection } from "./CreativesUploadSection";
import { Button } from "@/components/ui/button";
import { Save, Play, Menu } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export function CampaignCreation({
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
  const [loading, setLoading] = useState(false);

  const [campaignId] = useState(uuidv4());

  // ✅ CPM logic (₦50,000 CPM = 1000 impressions)
  const cpm = 50000;
  const estimatedImpressions = Math.floor((budget / cpm) * 1000);
  const screensCount = Math.floor(budget / 1000);
  const maxCapacity = estimatedImpressions > 5000;

  /** --- Launch Campaign via API + Paystack redirect --- */
  const handleLaunchCampaign = async () => {
    try {
      const user = await account.get();

      if (!budget || budget <= 0) {
        alert("Please set a valid budget before launching.");
        return;
      }
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one creative before launching.");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/paystack/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          amount: budget * 100, // Paystack works in kobo
          campaignId,
          brandName,
          industry,
          startDate,
          endDate,
          selectedCountry,
          selectedVenues,
          uploadedFiles,
        }),
      });

      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Unable to initiate payment. Please try again.");
      }
    } catch (err) {
      console.error("Error launching campaign:", err);
      alert("Something went wrong. Please try again.");
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
            <h1 className="text-xl md:text-2xl font-semibold text-black">
              Create Campaign
            </h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Set up your digital out-of-home advertising campaign
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-gray-300 text-black hover:bg-gray-50 hidden md:flex"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-black hover:bg-gray-50 md:hidden"
        >
          <Save className="w-4 h-4" />
        </Button>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Column - Budget Section */}
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

        {/* Right Column - Form Sections */}
        <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-white">
          <TargetLocationSection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          <VenueTypesSection
            selectedVenues={selectedVenues}
            setSelectedVenues={setSelectedVenues}
          />

          <SchedulingGridSection />

          <BrandSection
            brandName={brandName}
            setBrandName={setBrandName}
            industry={industry}
            setIndustry={setIndustry}
          />

          {/* Pass files up from child */}
          <CreativesUploadSection
            campaignId={campaignId}
            onFilesChange={setUploadedFiles}
          />
        </div>
      </div>

      {/* Bottom Sticky CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-8 py-4">
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleLaunchCampaign}
          disabled={loading}
        >
          <Play className="w-4 h-4 mr-2" />
          {loading ? "Processing..." : "Review & Launch Campaign"}
        </Button>
      </div>
    </>
  );
}


// "use client";

// import React, { useState } from "react";
// import { BudgetSection } from "./BudgetSection";
// import { TargetLocationSection } from "./TargetLocationSection";
// import { VenueTypesSection } from "./VenueTypesSection";
// import { SchedulingGridSection } from "./SchedulingGridSection";
// import { BrandSection } from "./BrandSection";
// import { CreativesUploadSection } from "./CreativesUploadSection";
// import { Button } from "@/components/ui/button";
// import { Save, Play, Menu } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Client, Account } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const account = new Account(client);

// export function CampaignCreation({
//   sidebarCollapsed,
//   setSidebarCollapsed,
// }: {
//   sidebarCollapsed: boolean;
//   setSidebarCollapsed: (collapsed: boolean) => void;
// }) {
//   const [budget, setBudget] = useState(50000);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
//   const [brandName, setBrandName] = useState("");
//   const [industry, setIndustry] = useState("");
//   const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [campaignId] = useState(uuidv4());

//   // ✅ CPM logic (₦50,000 CPM = 1000 impressions per ₦50,000)
//   const cpm = 50000;
//   const estimatedImpressions = Math.floor((budget / cpm) * 1000);
//   const screensCount = Math.floor(budget / 1000);
//   const maxCapacity = estimatedImpressions > 5000;

//   /** --- Launch Campaign (Paystack + Verify API) --- */
//   const handleLaunchCampaign = async () => {
//     let user: any;
//     try {
//       user = await account.get();
//     } catch {
//       alert("You must be logged in.");
//       return;
//     }

//     if (!budget || budget <= 0) {
//       alert("Please set a valid budget before launching.");
//       return;
//     }
//     if (uploadedFiles.length === 0) {
//       alert("Please upload at least one creative before launching.");
//       return;
//     }

//     setLoading(true);

//     const handler = (window as any).PaystackPop.setup({
//       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//       email: user.email,
//       amount: budget * 100, // Paystack works in kobo
//       currency: "NGN",
//       callback: async (response: any) => {
//         console.log("✅ Payment success:", response);

//         try {
//           // 🔹 Call backend API to verify + save to Appwrite
//           const res = await fetch("/api/paystack/verify", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               reference: response.reference,
//               campaignData: {
//                 campaignId,
//                 userId: user.$id,
//                 budget,
//                 brandName,
//                 industry,
//                 startDate,
//                 endDate,
//                 selectedCountry,
//                 selectedVenues,
//               },
//               uploadedFiles,
//             }),
//           });

//           const data = await res.json();
//           if (data.success) {
//             alert("🎉 Campaign launched successfully!");
//           } else {
//             alert("❌ Failed to save campaign.");
//           }
//         } catch (err) {
//           console.error("Error verifying payment:", err);
//           alert("Error verifying payment.");
//         } finally {
//           setLoading(false);
//         }
//       },
//       onClose: () => {
//         setLoading(false);
//         alert("Payment cancelled.");
//       },
//     });

//     handler.openIframe();
//   };

//   return (
//     <>
//       {/* Header */}
//       <header className="px-4 md:px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-white">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//             className="text-black hover:bg-gray-100"
//           >
//             <Menu className="w-4 h-4" />
//           </Button>
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold text-black">
//               Create Campaign
//             </h1>
//             <p className="text-gray-600 mt-1 text-sm md:text-base">
//               Set up your digital out-of-home advertising campaign
//             </p>
//           </div>
//         </div>
//         <Button
//           variant="outline"
//           className="border-gray-300 text-black hover:bg-gray-50 hidden md:flex"
//         >
//           <Save className="w-4 h-4 mr-2" />
//           Save Draft
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           className="border-gray-300 text-black hover:bg-gray-50 md:hidden"
//         >
//           <Save className="w-4 h-4" />
//         </Button>
//       </header>

//       {/* Main Body */}
//       <div className="flex-1 flex flex-col lg:flex-row">
//         {/* Left Column - Budget Section */}
//         <div className="w-full lg:w-[35%] p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
//           <BudgetSection
//             budget={budget}
//             setBudget={setBudget}
//             estimatedImpressions={estimatedImpressions}
//             cpm={cpm}
//             screensCount={screensCount}
//             maxCapacity={maxCapacity}
//           />
//         </div>

//         {/* Right Column - Form Sections */}
//         <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-white">
//           <TargetLocationSection
//             selectedCountry={selectedCountry}
//             setSelectedCountry={setSelectedCountry}
//             startDate={startDate}
//             setStartDate={setStartDate}
//             endDate={endDate}
//             setEndDate={setEndDate}
//           />

//           <VenueTypesSection
//             selectedVenues={selectedVenues}
//             setSelectedVenues={setSelectedVenues}
//           />

//           <SchedulingGridSection />

//           <BrandSection
//             brandName={brandName}
//             setBrandName={setBrandName}
//             industry={industry}
//             setIndustry={setIndustry}
//           />

//           {/* Pass files up from child */}
//           <CreativesUploadSection
//             campaignId={campaignId}
//             onFilesChange={setUploadedFiles}
//           />
//         </div>
//       </div>

//       {/* Bottom Sticky CTA */}
//       <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-8 py-4">
//         <Button
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//           onClick={handleLaunchCampaign}
//           disabled={loading}
//         >
//           <Play className="w-4 h-4 mr-2" />
//           {loading ? "Processing..." : "Review & Launch Campaign"}
//         </Button>
//       </div>
//     </>
//   );
// }
