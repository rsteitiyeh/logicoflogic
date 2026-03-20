# LogicOfLogic.com

AI education landing page — "The future is AI. AI is logic. Logic is you."

## Deployment to Cloudflare Pages

1. Connect this repo to Cloudflare Pages (Workers & Pages → Create → Pages → Connect to Git)
2. **Build command:** (leave empty)
3. **Output directory:** `/`
4. Deploy

## CRITICAL: Set Environment Variable

After first deploy:
1. Go to **Settings → Environment Variables**
2. Add: `MAILERLITE_API_KEY` = your MailerLite API key
3. Set for **Production** environment
4. Trigger a redeploy

## Connect Custom Domain

1. In your Pages project → Custom Domains → Add `logicoflogic.com`
2. Update nameservers at your registrar to Cloudflare's nameservers
3. www → apex redirect is handled by the `_redirects` file

## File Structure

```
├── index.html                Landing page (9 sections)
├── privacy-policy.html       Privacy Policy
├── terms.html                Terms of Service
├── cookie-policy.html        Cookie Policy
├── disclaimer.html           Disclaimer
├── style.css                 Styles
├── script.js                 Form handler + interactions
├── functions/api/subscribe.js Serverless API proxy to MailerLite
├── assets/                   Logo, favicon, OG image
├── downloads/                Prompt Cheat Sheet PDF
└── _redirects                www redirect rules
```

## Tech Stack

- Static HTML + CSS (no framework)
- Google Fonts (Space Grotesk + Inter)
- Cloudflare Pages (hosting + CDN + serverless functions)
- MailerLite (email marketing via secure server-side API)
