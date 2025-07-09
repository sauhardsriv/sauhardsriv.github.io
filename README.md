**Next.js Website Editing, Deployment, and Git Push Workflow**

This document outlines the essential commands you need to update, preview, deploy, and push your Next.js website hosted on GitHub Pages.

---

### 1. Start Local Development Server

```bash
cd /path/to/your/project
npm install          # (only if needed)
npm run dev          # Starts local server at http://localhost:3000
```

### 2. Make Edits

- Open the project in a code editor (e.g., VS Code)
- Edit content inside `pages/`, `components/`, or relevant folders
- Save and preview live at [http://localhost:3000](http://localhost:3000)

---

### 3. Deploy to GitHub Pages

```bash
npm run deploy       # Runs build, export, sitemap, and deploys to gh-pages
```



---

### 4. Commit and Push Changes to Main Branch

```bash
git add .                                # Stage all changes
git commit -m "Describe your changes"    # Commit with a message
git push origin main                     # Push to main branch on GitHub
```



