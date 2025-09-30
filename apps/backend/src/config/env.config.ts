const schema = {
  type: "object",
  required: ["IMAGE_KIT_PUBLIC_KEY", "IMAGE_KIT_PRIVATE_KEY"],
  properties: {
    PORT: {
      type: "string",
      default: 5000,
    },
    HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    COOKIE: {
      type: "string",
      default: "supersecretcookiekey",
    },
    FRONTEND_URL: {
      type: "string",
      default: "http://localhost:3000",
    },
    IMAGE_KIT_PUBLIC_KEY: {
      type: "string",
    },
    IMAGE_KIT_PRIVATE_KEY: {
      type: "string",
    },
  },
};

export type EnvConfig = {
  PORT: number;
  HOST: string;
  COOKIE: string;
  FRONTEND_URL: string;
  IMAGE_KIT_PUBLIC_KEY: string;
  IMAGE_KIT_PRIVATE_KEY: string;
};

export const envOptions = {
  confKey: "config", // optional, default: 'config'
  schema: schema,
  dotenv: true,
};
