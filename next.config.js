/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_ID: '',
        GOOGLE_CLIENT_SECRET: '',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_UTL_INTERNAL: 'http://localhost:3000',
        NEXTAUTH_SECRET: ''
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
};
    
module.exports = nextConfig;