// Environment configuration with fallback values
// In production, these would be replaced with actual environment variables
export const env = {
  APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
  APPWRITE_PROJECT_ID: '68d9a0ed001391986ee3',
  APPWRITE_DATABASE_ID: '68d9a2d900388514e285',
  APPWRITE_STORAGE_BUCKET_ID: '68d9a3170029fca644f0',
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



