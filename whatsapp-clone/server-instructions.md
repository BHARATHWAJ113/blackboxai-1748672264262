# Deploying WhatsApp Clone to Your Own Server

## Step 1: Create Production Build
```bash
cd whatsapp-clone
npm run build
```
This will create a `build` folder containing the production-ready files.

## Step 2: Upload to Your Server
1. Copy the entire contents of the `build` folder to your server's web root directory (e.g., `/var/www/html/` or your designated public directory)

## Step 3: Server Configuration

### For Apache Server
Create or modify `.htaccess` file in your web root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable HTTPS (recommended for PWA)
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>

# Cache Control for Service Worker
<Files "serviceWorker.js">
  Header set Cache-Control "no-cache"
</Files>
```

### For Nginx Server
Add this to your nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build/folder;
    index index.html;

    # Enable HTTPS (recommended for PWA)
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # Cache Control for Service Worker
    location /serviceWorker.js {
        add_header Cache-Control "no-cache";
        expires -1;
    }
}
```

## Step 4: SSL Certificate (Recommended)
PWAs work best with HTTPS. You can get a free SSL certificate from Let's Encrypt:
1. Install certbot: `sudo apt-get install certbot`
2. Get certificate: `sudo certbot --nginx -d your-domain.com`

## Step 5: Test Installation
1. Open your domain in Chrome (Android) or Safari (iOS)
2. You should see an "Add to Home Screen" prompt
3. Click "Add" to install the app on your device

## Important Notes
1. HTTPS is strongly recommended for PWAs
2. Ensure all files are properly served with correct MIME types
3. The service worker needs to be served from the root directory
4. Firebase configuration in src/firebase.js must be updated with your Firebase project details

## Troubleshooting
- If PWA installation doesn't work:
  - Verify HTTPS is properly configured
  - Check if serviceWorker.js is accessible
  - Verify manifest.json is properly served
- If real-time updates don't work:
  - Check Firebase configuration
  - Verify your Firebase project settings
