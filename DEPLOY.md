# Deployment Guide

Since the application is now a standalone static site (no database needed!), you can deploy it for free using **Vercel** or **Netlify**.

## Option 1: Vercel (Recommended)
1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and sign up with your Git provider.
3. Click **"Add New Project"**.
4. Import your repository.
5. In the **Build and Output Settings**, ensure:
   - Framework Preset: **Next.js**
   - Root Directory: `client`
6. Click **Deploy**.

## Option 2: Netlify
1. Push your code to a GitHub repository.
2. Go to [netlify.com](https://netlify.com) and log in.
3. Click **"Add new site"** -> **"Import an existing project"**.
4. Search for your repo and select it.
5. In the build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/out`
6. Click **Deploy site**.

## Why this works for free
The "Server" and "Database" have been removed. The app now runs entirely in the user's browser, meaning it costs almost nothing to host and fits within the free tiers of these platforms easily.
