# 📚 SunnahReads

A modern web application for discovering and exploring Islamic literature, built with Next.js 15 and PayloadCMS.

## ✨ Features

- **📖 Book Library**: Browse and search through a comprehensive collection of Islamic books
- **✍️ Author Profiles**: Explore detailed author pages
- **🔍 Smart Search**: Powerful search functionality for books and authors
- **🎨 Modern UI**: Built with Tailwind CSS and Radix UI components
- **🌙 Dark Mode**: Theme switching with next-themes
- **⚡ Fast Performance**: Powered by Next.js 15 with Turbopack
- **📊 Content Management**: Admin panel powered by PayloadCMS
- **☁️ Cloud Storage**: S3-compatible storage integration

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **React**: React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: react-type-animation

### Backend & CMS
- **CMS**: [PayloadCMS 3](https://payloadcms.com/)
- **Database**: PostgreSQL (via Supabase)
- **Storage**: S3-compatible storage (AWS S3)
- **Rich Text Editor**: Lexical Editor
- **GraphQL**: Built-in GraphQL API

### Developer Tools
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Linting**: ESLint 9
- **Image Processing**: Sharp

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **PostgreSQL** database (or Supabase account)
- **S3-compatible storage** (AWS S3, Cloudflare R2, etc.)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yasiralamriki/sunnahreads.git
cd sunnahreads
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URI=postgresql://user:password@host:port/database

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=/

# S3 Storage
S3_ENDPOINT=https://your-s3-endpoint.com
S3_REGION=auto
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=your-bucket-name
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Access the admin panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the PayloadCMS admin interface.

## 📁 Project Structure

```
sunnahreads/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (app)/        # Public-facing pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── books/           # Books listing
│   │   │   ├── book/[slug]/     # Individual book pages
│   │   │   ├── authors/         # Authors listing
│   │   │   └── author/[slug]/   # Individual author pages
│   │   └── (payload)/    # PayloadCMS admin
│   │       ├── admin/           # Admin interface
│   │       └── api/             # API routes
│   ├── collections/       # PayloadCMS collections
│   │   ├── Authors.ts
│   │   ├── Books.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── components/        # React components
│   │   ├── home/
│   │   ├── navbar/
│   │   └── ui/                  # Reusable UI components
│   ├── lib/               # Utility functions
│   ├── payload.config.ts  # PayloadCMS configuration
│   └── index.css          # Global styles
├── components.json        # shadcn/ui configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json
```

## 🗄️ Database Collections

### Books
- Title, author
- Cover images

### Authors
- Name

### Media
- Image and file uploads
- S3 storage integration
- Automatic optimization

### Users
- Admin authentication
- Role-based access control

## 🔧 Available Scripts

```bash
# Development with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## 🎨 Customization

### Adding New UI Components

This project uses shadcn/ui components. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

### Modifying Collections

Edit collection files in `src/collections/` to customize the data structure for your needs.

### Styling

- Global styles: `src/index.css`
- Tailwind configuration: `tailwind.config.js`
- Component styles: Use Tailwind utility classes

## 📦 Deployment

### Replit (Recommended)

1. Push your code to GitHub
2. Import the repository in Replit
3. Configure environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

Make sure to set all required environment variables on your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PayloadCMS](https://payloadcms.com/) for the excellent headless CMS
- [Next.js](https://nextjs.org/) for the powerful React framework

## 📞 Contact

**Yasir Alamriki** - [@yasiralamriki](https://github.com/yasiralamriki)

Project Link: [https://github.com/yasiralamriki/sunnahreads](https://github.com/yasiralamriki/sunnahreads)

---
