import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
export default defineConfig({root:'local',base:'./',publicDir:false,resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}},plugins:[react()],build:{outDir:'../local-dist',emptyOutDir:true},server:{host:'127.0.0.1',port:8080}});
