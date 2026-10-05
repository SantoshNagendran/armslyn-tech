# Armslyn Tech — Single Page Hero

Modern, cinematic web development studio hero section built with **React**, **Vite**, **Tailwind CSS**, and **TypeScript**.

## Features

- **Fullscreen Looping Background Video**: High-definition video with `autoPlay`, `loop`, `muted`, and `playsInline`.
- **Instrument Serif & Inter Typography**: Editorial typography with responsive scaling and selective foreground/muted contrast.
- **Liquid Glass Aesthetics**: Modern glassmorphic borders with luminosity blend, backdrop blur, and gradient mask.
- **Micro-Animations**: Staggered `fade-rise` entrance animations for heading, subtext, and CTA buttons.
- **GitHub Pages Ready**: Static relative asset routing (`base: './'`) and automated CI/CD workflow.

---

## Deploying to GitHub Pages

### 1. Create a Repository on GitHub
Create a new public repository on [github.com/new](https://github.com/new) (e.g. `armslyn-tech` or `our-web`).

### 2. Connect Remote and Push
Run the following in PowerShell / Terminal in this project directory:
```bash
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub: `Settings` → `Pages`.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow will automatically trigger, build the static files, and deploy your site to:
   ```
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

### Alternative: Direct Deploy via npm
If you prefer not using GitHub Actions, you can deploy directly with:
```bash
npm run deploy
```
*(This builds the site and pushes the `dist` folder to a `gh-pages` branch).*

---

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production static bundle
npm run build
```
