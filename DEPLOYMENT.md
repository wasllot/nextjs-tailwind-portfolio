# Deployment Guide - Digital Ocean App Platform

## Prerequisites
- GitHub repository with your portfolio code
- Digital Ocean account
- (Optional) Custom domain

## Step 1: Prepare Your Repository

1. **Commit and push all changes to GitHub**:
   ```bash
   git add .
   git commit -m "feat: prepare for Digital Ocean deployment"
   git push origin main
   ```

2. **Verify your build works locally**:
   ```bash
   npm run build
   npm run start
   ```

## Step 2: Create App on Digital Ocean

1. **Navigate to App Platform**:
   - Go to [Digital Ocean Console](https://cloud.digitalocean.com/apps)
   - Click "Create App"

2. **Connect GitHub Repository**:
   - Select "GitHub" as source
   - Authorize Digital Ocean to access your repos
   - Select your portfolio repository
   - Choose the `main` branch
   - Enable "Autodeploy" (deploys automatically on push)

3. **Configure App**:
   - **Name**: `my-portfolio` (or your preferred name)
   - **Region**: Choose closest to your target audience
   - **Plan**: Basic ($5/month) or Pro ($12/month)

4. **Environment Variables** (if needed):
   - Click "Environment Variables"
   - Add any required variables (currently none needed)

5. **Build Settings** (Auto-detected):
   ```yaml
   Build Command: npm run build
   Run Command: npm run start
   ```

6. **Review and Create**:
   - Review settings
   - Click "Create Resources"
   - Wait 5-10 minutes for initial deployment

## Step 3: Configure Custom Domain (Optional)

1. **Add Domain in App Settings**:
   - Go to your app → Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `reinaldotineo.com`)

2. **Update DNS Records**:
   - Go to your domain registrar (Namecheap, GoDaddy, etc.)
   - Add the CNAME record provided by Digital Ocean:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: [provided by Digital Ocean]
     ```

3. **Enable HTTPS**:
   - Digital Ocean automatically provisions Let's Encrypt SSL
   - Wait 5-15 minutes for SSL activation

## Step 4: Verify Deployment

1. **Check Build Logs**:
   - Go to app → Runtime Logs
   - Verify "Build successful" message

2. **Visit Your Site**:
   - Click the app URL (e.g., `https://my-portfolio-xxxxx.ondigitalocean.app`)
   - Or your custom domain if configured

3. **Test Responsiveness**:
   - Test on mobile, tablet, desktop
   - Verify animations and glassmorphism effects work

## Continuous Deployment

This project uses **Digital Ocean's Auto-Deploy** feature.

### How it works:

1. **GitHub Actions CI**:
   - Runs on every push to `main` to verify code quality (Lint + Build)
   - If this fails, you'll see a red cross in GitHub, but Digital Ocean might still try to deploy unless you disable "Autodeploy" in App Settings.

2. **Digital Ocean App Platform**:
   - Automatically detects changes in the `main` branch.
   - Pulls the code, builds it, and deploys it live.
   - **No extra configuration needed** in `ci.yml`.

### Advantages:
- Zero maintenance (no tokens to rotate)
- Native integration
- Faster setup

## Monitoring & Logs

- **Runtime Logs**: Real-time application logs
- **Build Logs**: Build process details
- **Metrics**: CPU, Memory, Request stats

## Troubleshooting

### Build Fails
- Check build logs in Digital Ocean console
- Verify `npm run build` works locally
- Check for missing environment variables

### Blank Page
- Check runtime logs for JavaScript errors
- Verify all dependencies are in `dependencies` (not `devDependencies`)

### Slow Performance
- Enable App Platform caching
- Consider upgrading to Pro plan
- Use CDN for static assets

## Costs

- **Basic Plan**: $5/month (512MB RAM, 1 vCPU)
- **Pro Plan**: $12/month (1GB RAM, 1 vCPU)
- **Bandwidth**: 100GB included/month

## Useful Commands

```bash
# Local development
npm run dev

# Production build test
npm run build && npm run start

# Lint check
npm run lint
```

## Additional Resources

- [Digital Ocean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
