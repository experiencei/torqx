// Flutterwave payment integration
import { getEnvVar } from './env';

export interface FlutterwavePaymentData {
  amount: number;
  currency: string;
  email: string;
  phone_number?: string;
  name: string;
  tx_ref: string;
  callback_url?: string;
  redirect_url?: string;
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
}

export interface FlutterwaveResponse {
  status: 'successful' | 'cancelled' | 'failed';
  transaction_id: string;
  tx_ref: string;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (data: any) => void;
  }
}

export const flutterwaveService = {
  // Initialize payment
  async initializePayment(paymentData: FlutterwavePaymentData): Promise<FlutterwaveResponse> {
    return new Promise((resolve, reject) => {
      // Load Flutterwave script if not already loaded
      if (!window.FlutterwaveCheckout) {
        const script = document.createElement('script');
        script.src = 'https://checkout.flutterwave.com/v3.js';
        script.onload = () => {
          this.processPayment(paymentData, resolve, reject);
        };
        script.onerror = () => {
          reject(new Error('Failed to load Flutterwave script'));
        };
        document.head.appendChild(script);
      } else {
        this.processPayment(paymentData, resolve, reject);
      }
    });
  },

  processPayment(
    paymentData: FlutterwavePaymentData, 
    resolve: (value: FlutterwaveResponse) => void,
    reject: (reason: any) => void
  ) {
    try {
      window.FlutterwaveCheckout({
        public_key: getEnvVar('FLUTTERWAVE_PUBLIC_KEY'),
        tx_ref: paymentData.tx_ref,
        amount: paymentData.amount,
        currency: paymentData.currency,
        country: 'NG',
        payment_options: 'card,mobilemoney,ussd,banktransfer',
        customer: {
          email: paymentData.email,
          phone_number: paymentData.phone_number || '',
          name: paymentData.name,
        },
        customizations: {
          title: paymentData.customizations?.title || 'Torqx AI Campaign Payment',
          description: paymentData.customizations?.description || 'Payment for DOOH advertising campaign',
          logo: paymentData.customizations?.logo || '',
        },
        callback: (response: any) => {
          // Handle successful payment
          resolve({
            status: response.status,
            transaction_id: response.transaction_id,
            tx_ref: response.tx_ref,
          });
        },
        onclose: () => {
          // Handle payment cancellation
          resolve({
            status: 'cancelled',
            transaction_id: '',
            tx_ref: paymentData.tx_ref,
          });
        },
      });
    } catch (error) {
      reject(error);
    }
  },

  // Verify payment on the backend (this would typically be done server-side)
  async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      // In a real application, this would be a server-side call
      // For now, we'll simulate a successful verification
      console.log('Verifying payment:', transactionId);
      return true;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  },

  // Generate transaction reference
  generateTxRef(): string {
    return `TRX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
};