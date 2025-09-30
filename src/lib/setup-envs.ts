// Environment setup for runtime configuration
export const setupEnvironment = () => {
  // This would typically be injected at build time or runtime
  // For development, these are placeholder values
  if (typeof window !== 'undefined') {
    (window as any).__ENV__ = {
      APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: '68d9a0ed001391986ee3',
      APPWRITE_DATABASE_ID: '68d9a2d900388514e285',
      APPWRITE_STORAGE_BUCKET_ID: '68d9a3170029fca644f0',
      MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoiZXhwZXJpZW5jZWlxIiwiYSI6ImNtZndmaGNtdjAxazUya3F2M2o4ZDNiaDAifQ.7Ykq_IIVcg8zgDRY0PxtRQ'
    };
  }
};

// Auto-setup when this module is imported
if (typeof window !== 'undefined') {
  setupEnvironment();
}