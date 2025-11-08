# Product Management App

A modern React-based product management application built with TypeScript and Vite.

## Features

- User authentication (Login/Register pages) with form validation
- Product listing and management
- API integration with backend for authentication and product management
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
- **API**: RESTful API with cookie-based JWT authentication
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
├── services/
│   └── api.ts           # API service functions for auth and products
├── components/
│   ├── Navbar.tsx       # Navigation component
│   └── Layout.tsx       # Layout component (wraps pages with Navbar)
├── pages/
│   ├── Login.tsx        # User login page with Formik & Yup validation
│   ├── Register.tsx     # User registration page with Formik & Yup validation
│   └── ProductList.tsx  # Product listing page
├── types/
│   ├── api.ts          # API request/response TypeScript types
│   └── auth.ts         # Authentication related TypeScript types
├── utils/
│   └── validation.ts    # Yup validation schemas for forms
└── assets/              # Static assets
```

## API Integration

The application integrates with a backend API at `http://localhost:5000/api` for authentication and product management.

### Authentication Routes (/auth/\*)

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout from current device
- `POST /auth/logout-all` - Logout from all devices
- `GET /auth/profile` - Get user profile (requires auth)
- `PUT /auth/profile` - Update user profile (requires auth)
- `PUT /auth/change-password` - Change password (requires auth)

### Product Routes (/products/\*) - All require authentication

- `POST /products` - Create a new product
- `GET /products` - Get all products (with optional query params: page, limit, search, category, sortBy, sortOrder)
- `GET /products/stats` - Get product statistics
- `GET /products/:id` - Get single product by ID
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID

All product routes require JWT authentication via cookie. Use `POST /auth/login` to authenticate.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
