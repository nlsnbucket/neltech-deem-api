export const environment = {
  port: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};
