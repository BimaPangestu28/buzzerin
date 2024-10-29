export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  TIMEOUT: 30000,
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Credentials": "true",
  },
} as const;

export const getApiConfig = () => {
  const env = process.env.NODE_ENV;
  
  switch(env) {
    case 'production':
      return {
        ...API_CONFIG,
        BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
      };
    case 'development':
      return {
        ...API_CONFIG,
        BASE_URL: "http://localhost:8080/api",
      };
    case 'test':
      return {
        ...API_CONFIG,
        BASE_URL: "http://localhost:8080/api",
      };
    default:
      return API_CONFIG;
  }
};