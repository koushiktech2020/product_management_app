# Product Management App

A modern React-based product management application built with TypeScript and Vite.

## Features

- User authentication (Login/Register pages) with form validation
- Product listing and management
- Data fetching with TanStack React Query
- Responsive design with Bootstrap 5
- Modern React 19 with TypeScript
- Fast development with Vite
- Client-side routing with React Router DOM
- Form validation utilities
- HTTP requests with Axios
- ESLint for code quality
- Custom CSS styling

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 (via CDN), Custom CSS
- **Forms**: Formik (form handling)
- **Validation**: Yup (schema validation)
- **HTTP Client**: Axios
- **Data Fetching**: TanStack React Query
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/koushiktech2020/product_management_app.git
   cd product_management_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Pages

- **Home (/)**: User login page (default route)
- **Register (/register)**: User registration page
- **Products (/products)**: Product listing and management page

## Navigation

The application includes a responsive navigation bar that allows easy navigation between all pages.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── App.tsx              # Main application component (uses routes from routes.tsx)
├── routes.tsx           # Centralized route configuration (React Router v7)
├── main.tsx             # Application entry point
├── index.css            # Global styles and custom CSS
├── components/
│   ├── Navbar.tsx       # Navigation component
│   └── Layout.tsx       # Layout component (wraps pages with Navbar)
├── pages/
│   ├── Login.tsx        # User login page with Formik & Yup validation
│   ├── Register.tsx     # User registration page with Formik & Yup validation
│   └── ProductList.tsx  # Product listing page
├── types/
│   └── auth.ts          # Authentication related TypeScript types
├── utils/
│   └── validation.ts    # Yup validation schemas for forms
└── assets/              # Static assets
```

## Routing

- All routes are defined in `src/routes.tsx` using React Router v7's `RouteObject` type.
- Routes are configured as individual top-level routes, each wrapped with the Layout component for consistent navigation.
- Navigation between pages uses `Link` from React Router DOM instead of anchor tags for client-side routing.
- App.tsx imports and uses these routes for clean and maintainable structure.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
