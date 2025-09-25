// Environment setup for runtime configuration
export const setupEnvironment = () => {
  // This would typically be injected at build time or runtime
  // For development, these are placeholder values
  if (typeof window !== 'undefined') {
    (window as any).__ENV__ = {
      APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: '68d0f5640038dcb583d3',
      APPWRITE_DATABASE_ID: '68d11538003d04474891',
      APPWRITE_STORAGE_BUCKET_ID: '68d11568000196a6400e',
      FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK_TEST-XXXXXXXXXXXXXXXXXXXXXXXX-X',
      MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoiZXhwZXJpZW5jZWlxIiwiYSI6ImNtZndmaGNtdjAxazUya3F2M2o4ZDNiaDAifQ.7Ykq_IIVcg8zgDRY0PxtRQ'
    };
  }
};

// Auto-setup when this module is imported
if (typeof window !== 'undefined') {
  setupEnvironment();
}