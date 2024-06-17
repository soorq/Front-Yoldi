/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    trailingSlash: true,
    swcMinify: true,
    experimental: {
        optimizePackageImports: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            'lucide-react'
        ]
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        contentSecurityPolicy:
            'default-src \'self\'; script-src \'none\'; sandbox;',
        path: '/_next/image',
        loader: 'default',
        domains: ['frontend-test-api.yoldi.agency']
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(rule =>
            rule.test?.test?.('.svg')
        );
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/ // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/]
                },
                use: ['@svgr/webpack']
            }
        );
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    }
};

export default nextConfig;

