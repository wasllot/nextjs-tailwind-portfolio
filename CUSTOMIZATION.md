# Portfolio Customization Guide

This guide helps you customize this portfolio for your own profile.

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wasllot/nextjs-tailwind-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run locally**:
   ```bash
   npm run dev
   ```

---

## Personal Information

### 1. Name and Title
Edit `src/app/layout.tsx`:
```tsx
title: {
  default: "Your Name | Full Stack Developer & Software Architect",
  template: "%s | Your Name",
},
description: "Your professional description...",
```

### 2. Contact Links
Edit these files:
- `src/components/Footer.tsx` - Email, social links
- `src/components/Sidebar.tsx` - Social media links
- `src/components/Navigation.tsx` - Logo/name

### 3. Profile Image
Replace `public/logo.webp` and `public/logo-light.webp` with your own logo.

---

## Content Sections

### About Section
Edit `src/components/LanguageContext.tsx` - translations object:
```tsx
about: {
  p1: "Your first paragraph...",
  p2: "Your second paragraph...",
  // etc.
}
```

### Experience
Edit `src/components/Experience.tsx`:
```tsx
const experiences = [
  {
    id: 1,
    company: "Your Company",
    role: "Your Role",
    period: "2020 - Present",
    descriptionKey: "exp-1",
    achievements: ["Achievement 1", "Achievement 2"],
    technologies: ["Tech 1", "Tech 2"],
  },
];
```

Add descriptions in the `expDescriptions` object.

### Projects
Edit `src/app/projects/[slug]/data.ts`:

```tsx
"your-project": {
  title: "Your Project Title",
  titleEn: "English Title",
  description: "Project description...",
  client: "Client name",
  year: "2024",
  technologies: ["React", "Node.js"],
  link: "https://yourproject.com",
  repo: "https://github.com/yourrepo",
  // ... more fields
}
```

### Blog Posts
Edit `src/app/blog/[slug]/data.ts`:
```tsx
export const blogPosts = {
  "your-post-slug": {
    title: "Your Post Title",
    titleEn: "English Title",
    date: "2024-01-15",
    content: "Spanish content...",
    contentEn: "English content...",
  },
};
```

### Testimonials
Edit `src/components/TestimonialsGrid.tsx`:
```tsx
const testimonials = [
  {
    id: 1,
    name: "Client Name",
    role: "CTO",
    company: "Company Name",
    content: "Testimonial text...",
    contentEn: "English version...",
    stack: "Technologies used",
  },
];
```

---

## Styling

### Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: #64ffda;        /* Primary accent color */
  --secondary: #8892b0;     /* Secondary text */
  --background: #0a192f;    /* Dark background */
}
```

### Theme Toggle Colors
Edit `src/components/theme-provider.tsx` to customize light/dark themes.

### Logo Ticker (Partners)
Edit `src/app/servicios/page.tsx`:
```tsx
const logos = [
  { name: "Company Name", src: "/partners/your-logo.svg" },
];
```

Add your partner logos to `public/partners/`.

---

## Features

### Language Toggle
The portfolio supports English/Spanish. Default is Spanish.
Change default in `src/components/LanguageContext.tsx`:
```tsx
const [language, setLanguage] = useState<Language>("es"); // or "en"
```

### Chat Widget
Edit `src/components/RagChatWidget.tsx`:
- Update API URL for your AI service
- Customize messages in the `labels` object

### System Status
Edit `src/components/SystemStatusWidget.tsx`:
- Add/remove services to monitor
- Update API endpoint in `src/app/api/system-status/route.ts`

---

## Deployment

### Deploy to DigitalOcean
See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables
If you add new features requiring environment variables:

1. Create `.env.local` for local development:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   ```

2. Add to DigitalOcean App Platform:
   - Go to App → Settings → Environment Variables
   - Add each variable

---

## File Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── blog/          # Blog pages
│   │   ├── projects/       # Project pages
│   │   ├── servicios/      # Services page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── components/
│       ├── About.tsx       # About section
│       ├── Experience.tsx  # Work experience
│       ├── Hero.tsx        # Hero section
│       ├── Projects.tsx     # Projects grid
│       ├── LanguageContext.tsx  # i18n
│       └── ...             # More components
├── public/
│   ├── partners/           # Partner logos
│   └── ...                # Images
└── package.json
```

---

## Common Customizations

### Add New Section
1. Create component in `src/components/`
2. Import in `src/app/page.tsx`
3. Add to main layout

### Add New Language
1. Update `LanguageContext.tsx`:
```tsx
type Language = "en" | "es" | "fr"; // Add your language
```
2. Add translations for all keys

### Remove Features
- **Chat Widget**: Remove `<RagChatWidget />` from `layout.tsx`
- **System Status**: Remove `<SystemStatusWidget />` from layout
- **Theme Toggle**: Remove `<Switchers />` from layout

---

## Troubleshooting

### Build Errors
```bash
npm run build  # Check locally first
npm run lint  # Check for linting errors
```

### Missing Translations
Add missing keys to `LanguageContext.tsx` translations object.

### Images Not Loading
Check `public/` folder and verify paths in components.

---

## License

This portfolio is MIT licensed. Feel free to use it as a template!
