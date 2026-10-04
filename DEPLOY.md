# Deployment guide

## Prerequisites
- GitHub account
- Vercel account (free tier is enough)
- Your Web3Forms access key from https://web3forms.com

---

## 1. Create the GitHub repository

After `gh auth login`, run from the project folder:

```bash
gh repo create zilina-child-care --public --source=. --remote=origin --push
```

This creates the repo and pushes `main` in one step.

---

## 2. Import into Vercel

1. Go to https://vercel.com/new
2. Click **Add GitHub Account** (if not connected), then authorize.
3. Find the **zilina-child-care** repository and click **Import**.
4. Vercel detects Vite automatically. Leave framework preset as **Vite** and build command as `vite build`.
5. Before clicking **Deploy**, add the environment variable (see step 3 below).
6. Click **Deploy**.

---

## 3. Add the Web3Forms environment variable

In the Vercel project dashboard → **Settings** → **Environment Variables**:

| Name | Value | Environments |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | your key from web3forms.com | Production, Preview, Development |

**Then redeploy** (Deployments → ⋯ → Redeploy) so the variable takes effect.

---

## 4. Add a custom domain

In the Vercel project dashboard → **Settings** → **Domains**, enter your domain (e.g. `zilinachildcare.com`).

Vercel will show you the DNS records to add. Add only the records Vercel asks for (A or CNAME for the root and/or www).

### ⚠️  Important: do NOT change your MX records or nameservers

Your email (`info@zilinachildcare.com`) runs on the same domain.
- **Do not change your nameservers** to Vercel's.
- **Do not delete or modify your MX records.**
- Add only the specific **A record** (root domain) or **CNAME record** (www subdomain) that Vercel asks for.
- Leave everything else—MX, SPF, DKIM, DMARC, and any other records—exactly as they are.

If your registrar does not support apex-domain CNAMEs, use Vercel's provided A record (four IP addresses) for the root domain, and a CNAME for `www`.

---

## 5. After deployment

- Test the contact form: submit the Apply form and check that `info@zilinachildcare.com` receives the message.
- Test the language switcher in both English and Russian.
- Test on mobile (360 px) and desktop (1280 px).

---

## Local development

Because the project folder name contains `&`, the local production build is blocked by a Rollup path limitation. The dev server works fine:

```bash
npm run dev
```

For a local production build, run from a path without special characters, or push to GitHub and let Vercel build it (Vercel runs on Linux where the path is clean).
