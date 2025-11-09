# Product Management App

A modern React-based product management application built with TypeScript and Vite.

## Features

- **Enhanced User Authentication**: Login/Register with secure API integration using user ID from server responses
- User logout functionality with API integration
- Product listing and management
- Protected routes with robust authentication checks
- API integration with backend for authentication and product management
- Responsive design with Bootstrap 5
- Modern React 19 with TypeScript
- Fast development with Vite
- Client-side routing with React Router DOM
- Form validation utilities
- HTTP requests with Axios (direct implementation for optimal performance)
- ESLint for code quality
- Custom CSS styling

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 (via CDN), Custom CSS
- **Forms**: Formik (form handling)
- **Validation**: Yup (schema validation)
- **HTTP Client**: Axios (direct implementation for optimal performance)
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
│   ├── api.ts          # Backward compatibility exports (used by existing components)
│   ├── http.ts         # Axios configuration with interceptors
│   ├── auth.ts         # Authentication API functions with endpoint parameters
│   ├── products.ts     # Product management API functions with endpoint parameters
│   └── endpoints/
│       ├── index.ts    # Endpoint exports
│       ├── auth.ts     # Authentication endpoint constants
│       └── products.ts # Product endpoint constants
├── utils/
│   └── urlBuilder.ts   # Shared URL building utility with query parameter support
├── components/
│   ├── Layout.tsx       # Layout component (wraps pages with Navbar)
│   ├── Loading.tsx      # Reusable loading spinner component
│   ├── PrivateRoute.tsx # Component for protecting authenticated routes
│   ├── PublicRoute.tsx  # Component for public routes with auth redirect
│   └── Navbar.tsx       # Navigation component
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

## Authentication System

The application uses a robust authentication system with the following features:

- **Secure State Management**: Uses user ID from API responses instead of boolean flags for more secure authentication state
- **Cookie-Based JWT**: Server-side JWT authentication with HTTP-only cookies
- **Client-Side Storage**: User ID stored in localStorage for client-side auth checks
- **Route Protection**: PrivateRoute and PublicRoute components for conditional rendering
- **Auto-Redirect**: Authenticated users redirected from login/register pages, unauthenticated users redirected from protected pages
- **Logout Functionality**: API-based logout with localStorage cleanup

### Authentication Flow

1. User registers/logs in via API
2. Server returns user data including unique `_id`
3. Client stores `userId` in localStorage
4. Route protection checks for `userId` presence
5. Logout removes `userId` and calls API logout endpoint

## Services Architecture

The application uses a modular services architecture for better maintainability and scalability:

### HTTP Layer (`services/http.ts`)

- **Axios Configuration**: Centralized axios instance with base URL and credentials
- **Request Interceptors**: For adding headers or modifying requests
- **Response Interceptors**: For handling common errors like 401 unauthorized
- **Error Handling**: Automatic logout on authentication failures

### Authentication Service (`services/auth.ts`)

- **User Registration**: `register()` - Create new user accounts
- **User Login**: `login()` - Authenticate users and return session
- **User Logout**: `logout()` / `logoutAll()` - End user sessions
- **Profile Management**: `getProfile()`, `updateProfile()`, `changePassword()`

### Products Service (`services/products.ts`)

- **CRUD Operations**: Create, read, update, delete products
- **Product Queries**: `getAll()` with filtering and pagination support
- **Statistics**: `getStats()` for product analytics
- **Individual Products**: `getById()`, `update()`, `delete()` by product ID

### Service Imports

```typescript
// Clean imports
import { authAPI } from "@/services/auth";
import { productsAPI } from "@/services/products";

// Or use the barrel export
import { authAPI, productsAPI } from "@/services";
```

## Endpoint Management

The application uses a centralized endpoint management system for better maintainability:

### Endpoint Constants

- **Auth Endpoints** (`services/endpoints/auth.ts`): All authentication-related API paths
- **Product Endpoints** (`services/endpoints/products.ts`): All product-related API paths

### Benefits

- **Centralized Management**: All endpoints in one place for easy updates
- **Type Safety**: TypeScript types for endpoint validation
- **Query Parameter Flexibility**: Easy to add filters, search, pagination
- **Future-Proof**: Built-in support for complex filtering scenarios
- **Maintainability**: Easy to change API versions or base paths

### Usage Examples

```typescript
// Basic usage (no query params)
authAPI.login(credentials);
productsAPI.getAll();

// With query parameters for filtering
productsAPI.getAll(
  { page: 1, limit: 10 }, // Standard query params
  { name: "laptop", category: "electronics", price_min: 500 } // Additional filters
);

// Custom endpoint with params (for testing)
productsAPI.getById("123", { include: "reviews,images" });
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
