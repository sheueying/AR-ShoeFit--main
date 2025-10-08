# Deployment Guide for Netlify

## Problem
The website looks different on Netlify vs localhost because:
- **Localhost**: Webpack dev server bundles JavaScript on-the-fly
- **Netlify**: Needs pre-built files in the `dist` folder

## Solution
I've configured the project to build properly for Netlify deployment.

## Files Changed

### 1. `netlify.toml` (NEW)
- Tells Netlify how to build your project
- Build command: `npm install && npm run build`
- Publish directory: `dist`

### 2. `package.json`
- Updated `build` script to work cross-platform
- Webpack bundles `src/index.js` → `dist/main.js`
- Copies all files from `public/` to `dist/`
- Copies DeepAR resources to `dist/deepar-resources/`

### 3. `webpack.config.js`
- Fixed effects path: `public/effects/`
- Fixed dev server port: 8888

## How to Deploy to Netlify

### Option 1: Drag & Drop (Quick Test)
1. Run `npm run build` in your terminal
2. Drag the `dist` folder to Netlify's deploy zone
3. Your site will be live!

### Option 2: Git Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically:
   - Run `npm install`
   - Run `npm run build`
   - Deploy the `dist` folder
4. Every time you push to GitHub, Netlify auto-deploys!

## Testing Locally Before Deploy
```bash
# Build the production version
npm run build

# Check the dist folder - this is what Netlify will serve
# You can test it with a simple HTTP server:
npx http-server dist -p 8080
```

## What Gets Deployed
The `dist` folder will contain:
- `index.html` - Your AR interface
- `main.js` - Bundled JavaScript (from `src/index.js`)
- `effects/` - All shoe AR effects
- `deepar-resources/` - DeepAR library files
- All other assets from `public/`

## Important Notes
- Always test with `npm run build` before deploying
- The `dist` folder is gitignored (it's generated on build)
- Netlify builds from scratch each time, so all dependencies are fresh
