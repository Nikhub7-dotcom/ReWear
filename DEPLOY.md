Deploying ReWear to GitHub Pages
===============================

Quick steps to enable GitHub Pages deployment via the included GitHub Actions workflow:

1. Update `package.json` repository/homepage
   - Replace `<OWNER>` and `<REPO>` placeholders in `package.json` with your GitHub username (owner) and repository name.

2. (Optional) If you deploy to a repository page (not a user/organization site), set Vite base:
   - Either set `VITE_BASE` in a `.env` file: `VITE_BASE=/your-repo-name/`
   - Or let Actions detect the repo name automatically (workflow uses `GITHUB_REPOSITORY`).

3. Push to the `main` branch
   - The workflow `.github/workflows/deploy.yml` runs on pushes to `main`, builds, and publishes `dist/` to the `gh-pages` branch.

4. Enable GitHub Pages in repository settings
   - Go to Settings → Pages and ensure GitHub Pages is set to `gh-pages` branch and root folder.

Local test build
----------------
Run locally to verify the build:

```bash
npm ci
npm run build
# serve the `dist` folder with any static server (e.g. `npx serve dist`)
```

If you want a branch-based deploy (different branch) or to use another deploy action, update `.github/workflows/deploy.yml` accordingly.
