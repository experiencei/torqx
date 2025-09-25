import React, { useState, useEffect } from 'react';
import { BudgetSection } from './BudgetSection';
import { TargetLocationSection } from './TargetLocationSection';
import { VenueTypesSection } from './VenueTypesSection';
import { SchedulingGridSection } from './SchedulingGridSection';
import { BrandSection } from './BrandSection';
import { CreativesUploadSection } from './CreativesUploadSection';
import { Button } from './ui/button';
import { Save, Play, Menu, CreditCard } from 'lucide-react';
import { useAuth } from '../lib/Authcontext';
import { appwriteService } from '../lib/appwrite';
import { flutterwaveService } from '../lib/flutterwave';
import { toast } from 'sonner';

interface CampaignCreationProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export function CampaignCreation({ sidebarCollapsed, setSidebarCollapsed }: CampaignCreationProps) {
  const { user } = useAuth();
  const [budget, setBudget] = useState(500000);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [uploadedCreatives, setUploadedCreatives] = useState<any[]>([]);
  const [scheduleData, setScheduleData] = useState<any>({});
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Calculate dynamic metrics based on budget (adjusted for Naira)
  const estimatedImpressions = Math.floor(budget * 0.02);
  const cpm = 450;
  const screensCount = Math.floor(budget / 10000);
  const maxCapacity = estimatedImpressions > 50000;

  // Check if campaign is complete
  const isCampaignComplete = () => {
    return (
      budget > 0 &&
      selectedCountry &&
      startDate &&
      endDate &&
      selectedVenues.length > 0 &&
      brandName &&
      industry &&
      uploadedCreatives.length > 0 &&
      selectedLocations.length > 0
    );
  };

  const saveDraft = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const campaignData = {
        userId: user.$id,
        budget,
        selectedCountry,
        startDate,
        endDate,
        selectedVenues,
        brandName,
        industry,
        uploadedCreatives,
        scheduleData,
        selectedLocations,
        estimatedImpressions,
        cpm,
        screensCount,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await appwriteService.createCampaign(campaignData);
      toast.success('Campaign draft saved successfully');
    } catch (error: any) {
      toast.error('Failed to save draft: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const launchCampaign = async () => {
    if (!user || !isCampaignComplete()) {
      toast.error('Please complete all campaign details before launching');
      return;
    }

    setIsPaymentLoading(true);
    try {
      // Generate transaction reference
      const txRef = flutterwaveService.generateTxRef();

      // Initialize payment
      const paymentResponse = await flutterwaveService.initializePayment({
        amount: budget,
        currency: 'NGN',
        email: user.email,
        name: user.name,
        tx_ref: txRef,
        customizations: {
          title: 'Torqx AI Campaign Payment',
          description: `Payment for ${brandName} DOOH Campaign`,
        }
      });

      if (paymentResponse.status === 'successful') {
        // Verify payment
        const isVerified = await flutterwaveService.verifyPayment(paymentResponse.transaction_id);
        
        if (isVerified) {
          // Save campaign with payment details
          const campaignData = {
            userId: user.$id,
            budget,
            selectedCountry,
            startDate,
            endDate,
            selectedVenues,
            brandName,
            industry,
            uploadedCreatives,
            scheduleData,
            selectedLocations,
            estimatedImpressions,
            cpm,
            screensCount,
            status: 'active',
            paymentStatus: 'paid',
            transactionId: paymentResponse.transaction_id,
            txRef: paymentResponse.tx_ref,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await appwriteService.createCampaign(campaignData);
          
          // Record payment
          await appwriteService.createPayment({
            userId: user.$id,
            campaignId: 'campaign_id', // This would be the actual campaign ID
            amount: budget,
            currency: 'NGN',
            status: 'successful',
            transactionId: paymentResponse.transaction_id,
            txRef: paymentResponse.tx_ref,
            createdAt: new Date().toISOString()
          });

          toast.success('Campaign launched successfully!');
        } else {
          toast.error('Payment verification failed');
        }
      } else if (paymentResponse.status === 'cancelled') {
        toast.info('Payment was cancelled');
      } else {
        toast.error('Payment failed');
      }
    } catch (error: any) {
      toast.error('Failed to process payment: ' + error.message);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-8 py-6 border-b border-border flex justify-between items-center bg-background">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">Create Campaign</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Set up your digital out-of-home advertising campaign</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="hidden md:flex"
          onClick={saveDraft}
          disabled={isLoading}
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="md:hidden"
          onClick={saveDraft}
          disabled={isLoading}
        >
          <Save className="w-4 h-4" />
        </Button>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Column - Budget Section */}
        <div className="w-full lg:w-[35%] p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-border bg-background">
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
        <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 bg-background">
          <TargetLocationSection 
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
          />
          
          <VenueTypesSection 
            selectedVenues={selectedVenues}
            setSelectedVenues={setSelectedVenues}
          />
          
          <SchedulingGridSection 
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
          />
          
          <BrandSection 
            brandName={brandName}
            setBrandName={setBrandName}
            industry={industry}
            setIndustry={setIndustry}
          />
          
          <CreativesUploadSection 
            uploadedCreatives={uploadedCreatives}
            setUploadedCreatives={setUploadedCreatives}
          />
        </div>
      </div>

      {/* Bottom Sticky CTA */}
      <div className="sticky bottom-0 bg-background border-t border-border px-4 md:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="sm:w-auto"
            onClick={saveDraft}
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button 
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
            onClick={launchCampaign}
            disabled={!isCampaignComplete() || isPaymentLoading}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {isPaymentLoading ? 'Processing Payment...' : 'Pay & Launch Campaign'}
          </Button>
        </div>
        {!isCampaignComplete() && (
          <p className="text-sm text-muted-foreground mt-2">
            Complete all sections to enable campaign launch
          </p>
        )}
      </div>
    </>
  );
}