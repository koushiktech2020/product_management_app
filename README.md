# Product Management App

A modern React-based product management application built with TypeScript and Vite, featuring advanced filtering and real-time state management.

## Features

- **Enhanced User Authentication**: Login/Register with secure API integration using user ID from server responses
- User logout functionality with API integration
- **Advanced Product Filtering**: Real-time controlled filtering with useState management
- **Complete CRUD Operations**: Create, Read, Update, Delete products with real-time UI updates
- **Streamlined Component Architecture**: Clean prop-based communication between ProductList and ProductForm components
- **Beautiful UI Components**: Enhanced buttons with hover effects, gradients, and modern styling
- **Dynamic Form Headers**: Context-aware offcanvas headers with icons and appropriate titles
- **Form Validation**: Comprehensive client-side validation with user-friendly error messages
- **Quantity Management**: Track product inventory with quantity field
- **Refresh Functionality**: Reset all filters and show all products with one click
- Protected routes with robust authentication checks
- API integration with backend for authentication and product management
- Responsive design with Bootstrap 5 and Google Material Icons
- Modern React 19 with TypeScript
- Fast development with Vite
- Client-side routing with React Router DOM
- Form validation utilities
- HTTP requests with Axios (direct implementation for optimal performance)
- ESLint for code quality
- Clean Bootstrap styling (no custom CSS classes)

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 (via CDN), Google Material Icons
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
├── index.css            # Global styles (minimal, mostly Bootstrap overrides)
├── services/
│   ├── api.ts          # Backward compatibility exports (used by existing components)
│   ├── http.ts         # Axios configuration with interceptors
│   ├── auth.ts         # Authentication API functions with endpoint parameters
│   ├── products.ts     # Product management API functions with endpoint parameters
│   └── endpoints/
│       ├── index.ts    # Endpoint exports
│       ├── auth.ts     # Authentication endpoint constants
│       └── products.ts # Product endpoint constants
├── components/
│   ├── Layout.tsx       # Layout component (wraps pages with Navbar)
│   ├── Loading.tsx      # Reusable loading spinner component
│   ├── PrivateRoute.tsx # Component for protecting authenticated routes
│   ├── PublicRoute.tsx  # Component for public routes with auth redirect
│   ├── Navbar.tsx       # Navigation component
│   ├── ProductForm.tsx  # Offcanvas form component for adding/editing products (streamlined props: productId, setProductId, afterClose)
│   └── ProductFilter.tsx # Advanced filtering component with useState controlled inputs
├── pages/
│   ├── Login.tsx        # User login page with Formik & Yup validation
│   ├── Register.tsx     # User registration page with Formik & Yup validation
│   ├── ProductList.tsx  # Product listing page (refactored with clean state management)
│   └── NotFound.tsx     # 404 error page with Material Icons
├── types/
│   ├── api.ts          # API request/response TypeScript types including Product interface
│   └── auth.ts         # Authentication related TypeScript types
├── utils/
│   ├── urlBuilder.ts       # Shared URL building utility with query parameter support
│   ├── apiErrorHandler.ts  # Centralized API error handling utility
│   ├── apiWrapper.ts       # API wrapper for automatic error handling
│   ├── validation.ts       # Yup validation schemas for forms (login, register, product)
│   └── index.ts            # Utility exports
└── assets/              # Static assets
```

## Component Architecture

The application features a clean, maintainable component architecture with streamlined prop interfaces:

### ProductForm Component

The ProductForm component uses a modern prop-based approach for better separation of concerns:

```typescript
interface ProductFormProps {
  productId?: string | null; // ID of product to edit (null for new product)
  setProductId?: (id: string | null) => void; // Function to update productId
  afterClose?: () => void; // Callback after form closes
}
```

### Benefits of Streamlined Architecture

- **Simplified State Management**: ProductList manages only the productId, delegating form logic to ProductForm
- **Clean Component Communication**: Props-based interface eliminates complex state synchronization
- **Better Maintainability**: Clear separation of concerns between list and form components
- **Reduced Coupling**: Components are more independent and easier to test
- **Bootstrap Integration**: Form uses native Bootstrap offcanvas for better UX

### Usage Example

```tsx
// ProductList component
const [productId, setProductId] = useState<string | null>(null);

const handleEditProduct = (product: Product) => {
  setProductId(product._id); // Simple state update
};

const handleAfterClose = () => {
  setProductId(null); // Clean reset
};

// Clean component usage
<ProductForm
  productId={productId}
  setProductId={setProductId}
  afterClose={handleAfterClose}
/>;
```

## UI/UX Enhancements

The application features beautiful, modern UI components with enhanced user experience:

### Button Styling System

All buttons throughout the application use consistent, modern styling:

#### Primary Action Buttons (Add New Product)

- **Large size** with gradient backgrounds
- **Rounded pill shape** for modern appearance
- **Hover animations** with transform and shadow effects
- **Enhanced shadows** for depth and visual appeal

#### Secondary Action Buttons (Edit/Delete)

- **Outline style** with color-coded themes
- **Hover-to-fill effects** for better interactivity
- **Consistent rounded pill design**
- **Smooth transitions** for professional feel

#### Interactive Elements

- **Hover Effects**: Transform, shadow, and color changes
- **Smooth Transitions**: 0.3s ease animations
- **Visual Feedback**: Immediate response to user interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Product Card Design

Beautiful product cards with refined styling and comprehensive information display:

#### Card Layout & Styling

- **Secondary Border**: Elegant border using Bootstrap's secondary color
- **Subtle Shadow**: Custom soft shadow (`0 2px 8px rgba(0, 0, 0, 0.1)`) for depth without being overpowering
- **Responsive Grid**: Cards adapt beautifully across different screen sizes
- **Equal Height**: All cards maintain consistent height for visual harmony

#### Information Display

- **Product Name**: Prominent title display
- **Creator Info**: Shows who created the product
- **Description**: Full product description with flexible layout
- **Price**: Formatted price display with currency symbol
- **Quantity**: Inventory quantity with inventory icon
- **Creation Date**: Timestamp of when product was added
- **Action Buttons**: Edit and Delete buttons with hover effects

### Form Headers

Dynamic offcanvas headers with context-aware styling:

#### Add Mode

- **Title**: "Add New Product"
- **Icon**: `add_circle` (Material Icons)
- **Background**: Primary blue with white text

#### Edit Mode

- **Title**: "Edit Product"
- **Icon**: `edit` (Material Icons)
- **Background**: Primary blue with white text

#### Close Button

- **Compact Design**: 32px × 32px circular button
- **Primary Background**: Consistent with header theme
- **White Icon**: High contrast for visibility
- **Interactive Effects**: Scale and rotation animations

## Styling & Icons

The application uses a clean, maintainable styling approach:

### Bootstrap-First Design

- **Standard Bootstrap Classes**: All components use standard Bootstrap 5 classes for consistency and maintainability
- **No Custom CSS Classes**: Removed custom CSS classes in favor of Bootstrap utilities
- **Responsive Design**: Built-in Bootstrap responsive utilities for all screen sizes
- **Consistent Theming**: Uses Bootstrap's default theme with minimal overrides

### Icon System

The application supports multiple icon systems for flexibility:

#### Bootstrap Icons (Primary)

```jsx
<i className="bi bi-plus-circle-fill"></i>
<i className="bi bi-pencil-square"></i>
```

#### Google Material Icons (Alternative)

```jsx
<i className="material-icons">add</i>
<i className="material-icons">edit</i>
```

### Styling Guidelines

- **Component Structure**: Use semantic Bootstrap classes (`btn`, `form-control`, `card`, etc.)
- **Layout**: Bootstrap grid system (`row`, `col-md-6`, etc.)
- **Spacing**: Bootstrap spacing utilities (`mb-3`, `p-2`, etc.)
- **Colors**: Bootstrap color classes (`text-primary`, `bg-light`, etc.)
- **Typography**: Bootstrap text utilities (`fw-bold`, `text-muted`, etc.)

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
- `GET /products` - Get all products with advanced filtering support
- `GET /products/stats` - Get product statistics
- `GET /products/:id` - Get single product by ID
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID

#### Advanced Filtering Query Parameters

The products endpoint supports comprehensive filtering:

```typescript
interface ProductQueryParams {
  page?: number;           // Pagination page number
  limit?: number;          // Number of items per page
  name?: string;           // Search by product name (partial match)
  category?: string;       // Filter by product category
  minPrice?: number;       // Minimum price filter
  maxPrice?: number;       // Maximum price filter
  minQuantity?: number;    // Minimum quantity filter
  maxQuantity?: number;    // Maximum quantity filter
  startDate?: string;      // Filter products created after this date (YYYY-MM-DD)
  endDate?: string;        // Filter products created before this date (YYYY-MM-DD)
}
```

#### Filtering Examples

```bash
# Search by name
GET /products?name=laptop

# Filter by price range
GET /products?minPrice=100&maxPrice=1000

# Filter by date range
GET /products?startDate=2024-01-01&endDate=2024-12-31

# Combined filters
GET /products?name=phone&category=electronics&minPrice=200&maxPrice=800&startDate=2024-01-01

# Pagination with filters
GET /products?page=1&limit=10&category=electronics&minQuantity=5
```

## Advanced Filtering System

The application features a sophisticated product filtering system with real-time updates and useState-controlled components.

### Filter Components

#### ProductFilter Component
- **Controlled Inputs**: All filter fields use React useState for real-time updates
- **Offcanvas UI**: Beautiful slide-out filter panel with Bootstrap styling
- **Multiple Filter Types**: Text search, category, price range, quantity range, date range
- **Responsive Design**: Mobile-friendly filter interface

#### Filter Fields

- **Name Search**: Real-time search by product name
- **Category Filter**: Dropdown/text input for category filtering
- **Price Range**: Min/Max price inputs with number validation
- **Quantity Range**: Min/Max quantity inputs with number validation
- **Date Range**: Start/End date pickers for creation date filtering

### State Management

#### useState Controlled Filtering

```typescript
// Filter state management in ProductList component
const [filterValues, setFilterValues] = useState<ProductFilters>({
  name: "",
  category: "",
  minPrice: undefined,
  maxPrice: undefined,
  minQuantity: undefined,
  maxQuantity: undefined,
  startDate: "",
  endDate: "",
});

const handleFilterChange = (newFilters: ProductFilters) => {
  setFilterValues(newFilters); // Real-time state updates
};
```

#### Refresh Functionality

```typescript
const handleRefresh = () => {
  const resetFilters = {
    name: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    minQuantity: undefined,
    maxQuantity: undefined,
    startDate: "",
    endDate: "",
  };
  setFilterValues(resetFilters);    // Reset all filter fields
  setCurrentFilters(null);          // Clear applied filters
  fetchProducts(undefined);         // Fetch all products
};
```

### Filter Behavior

- **Real-time Updates**: Filter values update as you type
- **Apply Filters**: Click "Apply Filter" to execute search with current values
- **Reset on Refresh**: Refresh button clears all filters and shows all products
- **State Persistence**: Filter values persist until manually reset
- **Flexible Filtering**: Mix and match any combination of filters

### UI Features

- **Filter Button**: "Filter Products" button in header opens offcanvas panel
- **Refresh Button**: "Refresh" button resets all filters and reloads data
- **Apply Button**: "Apply Filter" button executes the current filter combination
- **Reset Button**: Form reset button clears all filter inputs
- **Visual Feedback**: Real-time updates show current filter state

## Product Data Structure

Products contain the following fields:

```typescript
interface ProductData {
  name: string; // Product name (required)
  description: string; // Product description (required)
  price: number; // Product price in rupees (required)
  category: string; // Product category (required)
  quantity: number; // Available quantity (required)
}
```

### Complete Product Interface

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number; // Inventory quantity
  category: string;
  createdAt: string;
  updatedAt: string;
}
```

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

## Error Handling System

The application uses a centralized error handling system for consistent API error management:

### Error Handler Utility (`utils/apiErrorHandler.ts`)

- **Standardized Error Format**: All API errors converted to consistent `ApiError` interface
- **Automatic Error Classification**: Network errors, auth errors, validation errors, etc.
- **Smart Error Messages**: User-friendly messages based on HTTP status codes
- **Authentication Handling**: Automatic logout and redirect on 401 errors
- **Configurable Behavior**: Options for logging, toast notifications, redirects

### Error Types Handled

- **HTTP Errors**: 400, 401, 403, 404, 422, 429, 500+
- **Network Errors**: Connection issues, timeouts
- **JavaScript Errors**: Unexpected runtime errors
- **Authentication Errors**: Automatic token cleanup and redirects

### Usage in Components

```typescript
import { handleApiError } from "@/utils/apiErrorHandler";

try {
  const data = await authAPI.login(credentials);
  // Handle success
} catch (error) {
  const apiError = handleApiError(error, {
    showToast: true, // Show user notification
    logError: true, // Log to console
    redirectOnAuthError: true, // Redirect on 401
  });
  // Handle standardized error
}
```

## API Wrapper System

The application uses an API wrapper system to eliminate repetitive try-catch blocks and provide consistent error handling:

### API Wrapper Utility (`utils/apiWrapper.ts`)

- **Automatic Error Handling**: No need to write try-catch in components
- **Standardized Results**: `ApiResult<T>` interface with success/error states
- **Loading States**: Built-in loading state management
- **Batch Operations**: Execute multiple API calls with single error handling
- **Retry Mechanism**: Automatic retry for failed requests

### Usage in Components

#### Basic Usage (No try-catch needed)

```typescript
import { authAPI } from "@/services/auth";

const handleLogin = async (credentials) => {
  const result = await authAPI.login(credentials);

  if (result.success) {
    // Handle success
    console.log("User logged in:", result.data);
    navigate("/products");
  } else {
    // Handle error (already processed by error handler)
    console.error("Login failed:", result.error.message);
  }
};
```

#### With Loading States

```typescript
import { useApiCall } from "@/utils/apiWrapper";

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleRegister = async (userData) => {
  const result = await useApiCall(() => authAPI.register(userData), {
    setLoading,
    setError,
    showToast: true,
  });

  if (result.success) {
    navigate("/login");
  }
};
```

#### Batch API Calls

```typescript
import { batchApiCalls } from "@/utils/apiWrapper";

const loadDashboardData = async () => {
  const [userResult, productsResult, statsResult] = await batchApiCalls([
    () => authAPI.getProfile(),
    () => productsAPI.getAll({ limit: 5 }),
    () => productsAPI.getStats(),
  ]);

  // Handle results...
};
```

#### Retry Mechanism

```typescript
import { retryApiCall } from "@/utils/apiWrapper";

const fetchWithRetry = async () => {
  const result = await retryApiCall(
    () => productsAPI.getAll({ page: 1 }),
    3, // max retries
    1000 // delay between retries
  );

  if (result.success) {
    setProducts(result.data);
  }
};
```

## Recent Updates

### v1.0.4 - Advanced Filtering System & useState Controls

- **useState Controlled Filters**: Converted all filter inputs to controlled components with real-time updates
- **Advanced Filtering**: Added comprehensive filtering by name, category, price range, quantity range, and date range
- **Refresh Button**: Added refresh functionality that resets all filters and shows all products
- **Real-time Filter Updates**: Filter values update immediately as user types
- **Improved Filter UI**: Enhanced offcanvas filter panel with better user experience
- **Updated API Parameters**: Changed from `search`/`createdAtFrom`/`createdAtTo` to `name`/`startDate`/`endDate`
- **State Management**: Proper useState management for filter persistence and reset functionality

### v1.0.3 - Refresh Button & UI Enhancements

- **Refresh Button**: Added refresh button to product list header for easy data reloading
- **Filter Reset**: Refresh button resets all active filters and shows complete product list
- **UI Consistency**: Maintained consistent button styling across all components
- **Improved UX**: Better user feedback with loading states and error handling

### v1.0.2 - UI Enhancements & Quantity Display

- **Quantity Display**: Added quantity information to product cards with inventory icon
- **Enhanced Product Cards**: Beautiful secondary border and refined shadow styling
- **Improved Card Layout**: Better visual hierarchy with comprehensive product information display
- **Icon Integration**: Added inventory icon for quantity display using Material Icons

### v1.0.1 - Form Enhancements & Data Model Updates

- **Quantity Field Standardization**: Updated data model from `stock` to `quantity` field across all components and API interfaces
- **Enhanced Form Reset Functionality**: Added proper form reset handlers for better user experience after form submission
- **Improved Form Validation**: Enhanced validation schemas with better error messaging
- **UI Polish**: Refined button styling and hover effects for improved visual feedback
- **TypeScript Improvements**: Fixed null safety issues and improved type definitions
- **Code Optimization**: Removed duplicate code and improved component efficiency

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
