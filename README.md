# Portfolio - Reinaldo Tineo

> Full Stack Developer & Software Architect specializing in high-performance digital experiences.

[![CI/CD](https://github.com/YOUR_USERNAME/my-portfolio/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/YOUR_USERNAME/my-portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎯 About

This is my personal portfolio showcasing my expertise in building scalable, high-performance web applications. The portfolio emphasizes clean architecture, modern design patterns, and extreme performance optimization.

**Live Demo**: [Your Live URL]

## ✨ Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Bilingual Support**: English/Spanish language toggle with `next-i18n`
- **Living Aurora Background**: Subtle animated gradient orbs using Framer Motion
- **Glassmorphism UI**: Modern semi-transparent design with backdrop blur effects
- **Dark/Light Mode**: Theme switcher with persistent preferences
- **Strategic Pillars**: Detailed breakdown of technical expertise:
  - Architecture & Strategy
  - Core Development
  - Ops & Data Engineering
  - Quality & WPO
- **Performance Optimized**: Core Web Vitals optimization, lazy loading, and code splitting
- **SEO Ready**: Semantic HTML, meta tags, and structured data
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion

### Development
- **Linting**: ESLint 9
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Deployment**: Digital Ocean App Platform

### Best Practices
- Clean Architecture
- Component-based design
- Responsive-first approach
- Accessibility (WCAG 2.1)
- Performance optimization (WPO)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
my-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD pipeline
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── About.tsx       # About section with strategic pillars
│       ├── Background.tsx  # Animated background component
│       ├── Experience.tsx  # Work experience timeline
│       ├── Hero.tsx        # Hero section
│       ├── LanguageContext.tsx  # i18n context
│       ├── Navigation.tsx  # Mobile navigation
│       ├── Projects.tsx    # Projects showcase
│       ├── Sidebar.tsx     # Desktop sidebar (glassmorphic)
│       └── ...
├── DEPLOYMENT.md           # Deployment guide
├── package.json
└── README.md
```

## 🎨 Design Philosophy

- **Premium Aesthetics**: Modern, clean design that makes a strong first impression
- **Performance-First**: Every feature is optimized for speed and efficiency
- **Accessibility**: WCAG 2.1 compliant for inclusive user experience
- **Mobile-First**: Responsive design that works perfectly on all screen sizes
- **Glassmorphism**: Semi-transparent UI elements with backdrop blur for depth

## 🌐 Deployment

This project is configured for deployment on **Digital Ocean App Platform**.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy

1. Push code to GitHub
2. Connect repository in Digital Ocean App Platform
3. Auto-deploy is configured - every push to `main` triggers deployment

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contact

**Reinaldo Tineo**  
Full Stack Developer & Software Architect

- 📧 Email: [rei.vzl@gmail.com](mailto:rei.vzl@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/reinaldotineo](https://linkedin.com/in/reinaldotineo)
- 🌐 Website: [Your Portfolio URL]

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
