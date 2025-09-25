// Environment setup for runtime configuration
export const setupEnvironment = () => {
  // This would typically be injected at build time or runtime
  // For development, these are placeholder values
  if (typeof window !== 'undefined') {
    (window as any).__ENV__ = {
      APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: '68d0f5640038dcb583d3',
      APPWRITE_DATABASE_ID: '68d546c5002442ba8d85',
      APPWRITE_STORAGE_BUCKET_ID: '68d54819001c338ffb7e',
      FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK-7fd2f8c66eb2bca8618d8526214ef96f-X',
      MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoiZXhwZXJpZW5jZWlxIiwiYSI6ImNtZndmaGNtdjAxazUya3F2M2o4ZDNiaDAifQ.7Ykq_IIVcg8zgDRY0PxtRQ'
    };
  }
};

// Auto-setup when this module is imported
if (typeof window !== 'undefined') {
  setupEnvironment();
}