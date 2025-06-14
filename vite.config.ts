import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '31.97.133.34',
    },
    preview: {
        allowedHosts: ['oohahplatform.com', 'web.oohahplatform.com'],
    },
});