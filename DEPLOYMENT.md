# Deployment Guide

This guide will help you deploy your portfolio to various platforms.

## 🚀 Quick Deploy Options

### 1. Netlify (Recommended)

1. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select your portfolio repository

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

3. **Deploy:**
   - Netlify will automatically build and deploy your site
   - You'll get a URL like `https://your-site-name.netlify.app`

### 2. Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure:**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy:**
   - Vercel will automatically deploy on every push to main branch

### 3. GitHub Pages

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"

2. **Push to Deploy:**
   - The GitHub Actions workflow will automatically build and deploy
   - Your site will be available at `https://username.github.io/repository-name`

## 🔧 Manual Deployment

### Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

### Upload to Hosting Provider

1. **Upload the `dist` folder** to your hosting provider
2. **Configure your server** to serve `index.html` for all routes (SPA routing)
3. **Set up custom domain** (optional)

## 🌐 Custom Domain Setup

### Netlify
1. Go to Site settings > Domain management
2. Add custom domain
3. Update DNS records as instructed

### Vercel
1. Go to Project settings > Domains
2. Add your custom domain
3. Update DNS records

### GitHub Pages
1. Go to repository settings > Pages
2. Add custom domain
3. Create a `CNAME` file in your repository root

## 📝 Environment Variables

If you need to add environment variables:

### Netlify
- Go to Site settings > Environment variables
- Add your variables

### Vercel
- Go to Project settings > Environment variables
- Add your variables

## 🔍 Troubleshooting

### Build Fails
- Check Node.js version (requires 20.18.1+)
- Clear cache: `npm run build -- --force`
- Check for missing dependencies

### Assets Not Loading
- Ensure all file paths are relative
- Check that assets are in the `dist` folder after build

### Routing Issues
- Ensure your hosting provider is configured for SPA routing
- All routes should serve `index.html`

### Performance Issues
- Optimize images
- Enable gzip compression
- Use CDN for assets

## 📊 Analytics & Monitoring

### Google Analytics
Add your tracking ID to the HTML head:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Netlify Analytics
- Enable in Site settings > Analytics
- No code changes required

## 🔒 Security

### HTTPS
- All major platforms provide HTTPS by default
- Ensure your custom domain has SSL certificate

### Headers
Add security headers in your hosting platform:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📱 Testing

Before deploying, test:

1. **Local build:**
   ```bash
   # Ensure you have Node.js 20.18.1+ installed
   node --version
   npm run build
   npm run preview
   ```

2. **Cross-browser testing:**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers

3. **Performance testing:**
   - Google PageSpeed Insights
   - Lighthouse audit

## 🚀 Post-Deployment

1. **Test your live site**
2. **Update your README** with the live URL
3. **Share your portfolio!**

---

Need help? Check the platform-specific documentation or create an issue in your repository. 