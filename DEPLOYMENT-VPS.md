# VPS / Droplet Deployment Guide

This guide covers how to deploy the portfolio to a Digital Ocean Droplet (or any VPS) using GitHub Actions via SSH.

## Prerequisites

1.  **Server Setup**:
    - Build: Ubuntu 22.04 / 24.04
    - Node.js 20+ installed
    - Git installed
    - PM2 installed (`npm install -g pm2`)

2.  **Initial Server Configuration (Run once on server)**:
    ```bash
    # Navigate to web root
    cd /var/www/html
    
    # Clone repository (first time only)
    git clone https://github.com/wasllot/nextjs-tailwind-portfolio.git .
    
    # Install dependencies
    npm install
    
    # Build
    npm run build
    
    # Start with PM2
    pm2 start npm --name "portfolio" -- start
    pm2 save
    ```

## GitHub Secrets Setup

Go to **Settings > Secrets and variables > Actions** in your repository and add:

| Secret Name | Value |
|-------------|-------|
| `HOST` | Your Server IP (e.g., `64.227.84.249`) |
| `SSH_PRIVATE_KEY` | The private key content (`cat ~/.ssh/id_rsa` or similar) |

## Workflow

On every push to `main`:
1.  **Quality Check**: Runs Lint & Build verification.
2.  **Deploy**:
    - Connects to server via SSH.
    - Pulls latest code (`git pull`).
    - Installs dependencies.
    - Rebuilds application.
    - Restarts PM2 process.

## Troubleshooting

- **Permission Denied**: Ensure the SSH key public part is in `~/.ssh/authorized_keys` on the server.
- **PM2 Not Found**: Ensure PM2 is in the global path or use full path.
- **Directory**: Ensure `/var/www/html` is empty before cloning or has the correct git remote.
