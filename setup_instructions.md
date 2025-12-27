# Proxmox Deployment Instructions

## 1. Prerequisites
- A Proxmox TurnKey Node.js Container.
- SSH Access enabled.
- `plink` (PuTTY Link) installed on your local machine (optional, used by automation script).

## 2. One-Click Deployment (Recommended)
Run the PowerShell script from your local machine:
```powershell
.\deploy_remote.ps1
```
This script will:
1. SSH into the server using credentials in `deploy_config.json`.
2. Install system dependencies (Git, PM2, Cron).
3. Clone the repository (using the token in config).
4. Install Node.js dependencies.
5. Setup the PM2 service and Cron job.

## 3. Manual Deployment
If you prefer to run commands manually, SSH into your server and run:

```bash
# Install Essentials
apt-get update && apt-get install -y git cron

# Setup Directory
mkdir -p /var/www/au-home-loan-calculator
cd /var/www/au-home-loan-calculator

# Clone (Replace <TOKEN> with your GitHub token)
git clone https://dennii.inc%40gmail.com:<TOKEN>@github.com/DeNNiiInc/AU-HomeLoan-Calculator.git .

# Install Packages
npm install
npm install -g pm2 serve

# Start App
./update_version.sh
pm2 start "npm start" --name "loan-calculator"
pm2 save
pm2 startup

# Setup Cron for Auto-Updates
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/au-home-loan-calculator/deploy.sh >> /var/www/au-home-loan-calculator/deploy.log 2>&1") | crontab -
```
