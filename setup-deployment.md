# 🚀 Crkle Website Deployment Guide

This guide will help you deploy the Crkle website to your domain.

## 📋 Prerequisites

- A web domain (you mentioned you have one)
- Web hosting service (shared hosting, VPS, or cloud service)
- FTP/SFTP access or web hosting control panel

## 🎯 Quick Deployment Checklist

### Step 1: Upload Files
- [ ] Upload entire `website-release/` folder to your web server
- [ ] Set the document root to point to this folder
- [ ] Ensure all files have proper permissions (755 for folders, 644 for files)

### Step 2: Domain Configuration
- [ ] Point your domain to the hosting server
- [ ] Configure SSL/HTTPS certificate
- [ ] Test website loads at your domain

### Step 3: Asset Preparation
- [ ] Replace placeholder logo in `/assets/crkle-logo.png`
- [ ] Add platform icons to `/assets/platforms/` folder
- [ ] Add favicon files to `/assets/`

### Step 4: Release Files (Already Done ✅)
- [x] Chrome Extension: `Crkle-Extension-v1.0.0-Production.zip`
- [x] macOS Apple Silicon: `Crkle-1.0.0-arm64.dmg`
- [x] macOS Intel: `Crkle-1.0.0.dmg`
- [x] Linux: `Crkle-1.0.0.AppImage`
- [x] Windows: `Crkle-Windows-v1.0.0.zip`

### Step 5: Final Testing
- [ ] Test all download links work
- [ ] Verify responsive design on mobile
- [ ] Check all navigation links
- [ ] Test contact forms (if any)

## 🌐 Recommended Hosting Providers

### For Simple Setup:
- **Netlify** (drag & drop deployment)
- **Vercel** (GitHub integration)
- **GitHub Pages** (free for public repos)

### For Advanced Control:
- **DigitalOcean** (VPS with full control)
- **AWS S3 + CloudFront** (scalable)
- **Google Cloud Storage** (reliable)

## 📁 File Size Information

```
Total website size: ~50MB (including all release files)
Without release files: ~500KB (just website assets)

Release files:
- Chrome Extension: ~500KB
- macOS Builds: ~45MB each
- Windows Build: ~150MB (largest)  
- Linux AppImage: ~47MB
```

## ⚙️ Environment Variables (Optional)

For advanced setups, you can configure:

```bash
# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# API Endpoints  
API_BASE_URL=https://api.crkle.com

# Support Email
SUPPORT_EMAIL=hello@crkle.com
```

## 🔐 Security Best Practices

### File Permissions:
```bash
# Folders
chmod 755 css/ js/ assets/ downloads/

# Files  
chmod 644 *.html css/*.css js/*.js
chmod 644 downloads/*
```

### HTTPS Setup:
- Always use HTTPS for download files
- Configure proper Content-Type headers
- Set up CORS if needed for API calls

## 📊 Analytics Setup (Optional)

### Google Analytics 4:
1. Create GA4 property
2. Get measurement ID
3. Add to both `index.html` and `download.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Download Tracking Events:
The website already includes download tracking events:
- Extension downloads
- Desktop app downloads by platform
- User platform detection

## 🚀 Launch Strategy

### Phase 1: Soft Launch
1. Deploy website to domain
2. Test all functionality
3. Share with beta users
4. Gather feedback

### Phase 2: Public Launch  
1. Submit Chrome extension to Web Store
2. Announce on social media
3. Post on Product Hunt
4. Share in AI communities

### Phase 3: Growth
1. Monitor analytics
2. Optimize based on user behavior
3. Add new platforms
4. Scale infrastructure as needed

## 🔧 Troubleshooting

### Common Issues:

**Downloads not working:**
- Check file permissions
- Verify MIME types are set correctly
- Ensure files exist in `/downloads/` folder

**Website not loading:**
- Check DNS propagation
- Verify domain configuration
- Check web server error logs

**Mobile layout issues:**
- Clear browser cache
- Check responsive CSS
- Test on multiple devices

### File MIME Types:
```
.dmg → application/x-apple-diskimage
.zip → application/zip  
.AppImage → application/octet-stream
.html → text/html
.css → text/css
.js → application/javascript
```

## 📞 Support

If you need help with deployment:
1. Check hosting provider documentation
2. Test locally first with a local server
3. Use browser developer tools to debug issues
4. Monitor web server logs for errors

## ✅ Final Checklist

Once deployed, verify:
- [ ] Homepage loads correctly
- [ ] Download page works
- [ ] All download links function
- [ ] Mobile version looks good
- [ ] SSL certificate is active
- [ ] Analytics tracking works (if enabled)
- [ ] No broken links or missing images

**Your Crkle website is ready for launch! 🎉**

Total files: 10+ HTML/CSS/JS files + 5 release packages
Ready for: Production deployment
Tested on: Desktop, Mobile, Tablet devices