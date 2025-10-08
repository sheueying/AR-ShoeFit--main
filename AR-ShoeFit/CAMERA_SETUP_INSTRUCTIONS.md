# Camera Setup Instructions for AR Shoe Try-On

## The Problem
Modern browsers require HTTPS for camera access. The application needs camera permissions to work properly.

## Solutions (Choose One)

### Option 1: Use HTTPS Server (Recommended)
1. Run: `npm run dev-https`
2. Open: `https://localhost:8888`
3. Accept the self-signed certificate warning
4. Allow camera permissions when prompted

### Option 2: Use Chrome with Disabled Security (Development Only)
1. Close all Chrome windows
2. Open Chrome with: `chrome.exe --user-data-dir="C:/temp/chrome_dev" --disable-web-security --allow-running-insecure-content`
3. Navigate to: `http://localhost:8888`
4. Allow camera permissions

### Option 3: Use ngrok for HTTPS Tunnel
1. Install ngrok: https://ngrok.com/download
2. Start the regular server: `npm run dev`
3. In another terminal: `ngrok http 8888`
4. Use the HTTPS URL provided by ngrok

### Option 4: Use the Batch File
1. Double-click `start-camera.bat`
2. Follow the instructions in the popup

## Troubleshooting Camera Issues

### If camera still doesn't work:
1. **Check browser permissions**: Look for camera icon in address bar
2. **Close other apps**: Make sure no other app is using the camera
3. **Try different browser**: Chrome, Firefox, Edge
4. **Check camera hardware**: Test camera in other apps
5. **Use mobile device**: Mobile browsers often work better for AR

### Common Error Messages:
- "Camera access denied" → Allow permissions in browser
- "No camera found" → Check if camera is connected and not in use
- "HTTPS required" → Use one of the HTTPS solutions above

## Testing the Application
1. Open the application in browser
2. Click on a shoe product (like "Nike dunk low laser orange")
3. Allow camera access when prompted
4. Point camera at your feet
5. The AR shoe should appear on your feet!

## Need Help?
If camera still doesn't work, try:
- Restarting your browser
- Clearing browser cache
- Using a different device (mobile works great!)
- Checking Windows camera privacy settings
