// Environment configuration with fallback values
// In production, these would be replaced with actual environment variables
export const env = {
   APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: '68d0f5640038dcb583d3',
      APPWRITE_DATABASE_ID: '68d546c5002442ba8d85',
      APPWRITE_STORAGE_BUCKET_ID: '68d54819001c338ffb7e',
      FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK-7fd2f8c66eb2bca8618d8526214ef96f-X',
      MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoiZXhwZXJpZW5jZWlxIiwiYSI6ImNtZndmaGNtdjAxazUya3F2M2o4ZDNiaDAifQ.7Ykq_IIVcg8zgDRY0PxtRQ'
};
 
// Helper function to get environment variables
export const getEnvVar = (key: keyof typeof env): string => {
  // Try to get from runtime environment first
  if (typeof window !== 'undefined' && (window as any).__ENV__) {
    return (window as any).__ENV__[key] || env[key];
  }
  
  // Fallback to static config
  return env[key];
};