/** @type {import('next').NextConfig} */

const { version } = require('./package.json')
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const isDev = process.env.NODE_ENV !== 'production'

// Sometimes useful to disable this during development
const ENABLE_CSP_HEADER = true;
const FRAME_SRC_HOSTS = ['https://*.walletconnect.com', 'https://*.walletconnect.org','https://*.solflare.com','https://auth.particle.network/'];
const STYLE_SRC_HOSTS = ['https://*.googleapis.com']
const IMG_SRC_HOSTS = ['https://*.walletconnect.com'];
const cspHeader = `
  default-src 'self';
  script-src 'self'${isDev ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline' ${STYLE_SRC_HOSTS.join(' ')};
  connect-src *;
  img-src 'self' blob: data: ${IMG_SRC_HOSTS.join(' ')};
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' ${FRAME_SRC_HOSTS.join(' ')};
  frame-ancestors 'none';
  ${!isDev ? 'block-all-mixed-content;' : ''}
  ${!isDev ? 'upgrade-insecure-requests;' : ''}
`.replace(/\s{2,}/g, ' ').trim();
const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Access-Control-Allow-Credentials',
    value: 'true',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: '*', // http://localhost:3000 or 0.0.0.0:3000
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-CSRF-Token, X-Requested-With, X-Hub-Signature, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },

  // Note, causes a problem for firefox: https://github.com/MetaMask/metamask-extension/issues/3133
  ...(ENABLE_CSP_HEADER
    ? [
        {
          key: 'Content-Security-Policy',
          value: cspHeader,
        },
      ]
    : [])
]

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });
    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // TODO consider restricting image sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_VERSION: version,
  },

  reactStrictMode: false,
  swcMinify: true,

  sentry: {
    hideSourceMaps: true,
    tunnelRoute: "/monitoring-tunnel",
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://34.82.234.85:8000/api/:path*', // Backend API URL
      },
    ];
  },
}

const sentryWebpackPluginOptions = {
  org: "hyperlane",
  project: "warp-ui",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayIframe: true,
    excludeReplayShadowDom: true,
  },
};

module.exports = withBundleAnalyzer(withSentryConfig(nextConfig, sentryWebpackPluginOptions));