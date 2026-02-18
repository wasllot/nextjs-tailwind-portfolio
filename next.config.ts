import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents the site from being embedded in iframes (clickjacking protection)
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Helps protect against XSS attacks
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Prevents the browser from MIME-sniffing a response away from the declared content-type
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controls which referrer information is sent with requests
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Content Security Policy - restricts where resources can be loaded from
          {
            key: "Content-Security-Policy",
            value: 
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.dicebear.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' blob: data: https:; " +
              "font-src 'self' data:; " +
              "connect-src 'self' https:; " +
              "frame-ancestors 'none';",
          },
          // Prevents Google from showing cached version
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
          // Hides X-Powered-By header
          {
            key: "X-Powered-By",
            value: "NextJS",
          },
        ],
      },
    ];
  },
  // Disable server signature
  poweredByHeader: false,
  // Enable strict mode
  reactStrictMode: true,
};

export default nextConfig;
