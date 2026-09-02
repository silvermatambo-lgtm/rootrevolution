# Vercel Deployment

1. Create a new GitHub repository, for example `root-revolution`.
2. Upload all files and folders from this ZIP to the repository root.
3. In Vercel choose **Add New → Project** and import the GitHub repository.
4. Vercel should detect **Vite** automatically.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

`vercel.json` already contains the SPA rewrite required for React Router routes.
