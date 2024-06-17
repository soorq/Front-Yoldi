/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        loader: 'default',
        domains: ['frontend-test-api.yoldi.agency']
    }
};

export default nextConfig;
