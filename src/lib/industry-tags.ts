// Industry to tags mapping for automatic tag assignment
export const industryTagsMap: { [key: string]: string[] } = {
  "Food & Beverage": ["restaurant", "food", "bar", "cafe", "dining"],
  "Retail & Fashion": ["shopping", "fashion", "retail", "clothing", "accessories"],
  "Technology": ["tech", "software", "innovation", "digital", "electronics"],
  "Automotive": ["cars", "vehicles", "automotive", "transportation"],
  "Healthcare": ["health", "medical", "wellness", "hospital", "pharmacy"],
  "Education": ["education", "learning", "school", "university", "training"],
  "Entertainment": ["entertainment", "movies", "gaming", "events", "leisure"],
  "Finance": ["finance", "banking", "investment", "fintech", "insurance"],
  "Real Estate": ["property", "real estate", "housing", "commercial", "residential"],
  "Travel & Tourism": ["travel", "tourism", "hotels", "vacation", "destinations"]
};

export const getTagsForIndustry = (industry: string): string[] => {
  return industryTagsMap[industry] || [];
};

export const getAllIndustries = (): string[] => {
  return Object.keys(industryTagsMap);
};

export const getAllTags = (): string[] => {
  return Array.from(new Set(Object.values(industryTagsMap).flat()));
};