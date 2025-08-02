
// config/client.ts (client-safe config for frontend)
export const clientConfig = {
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL!,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL!,
};
