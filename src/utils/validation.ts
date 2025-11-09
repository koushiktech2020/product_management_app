import * as yup from 'yup';

// Yup validation schemas
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

export const productValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Product name must be at least 2 characters long')
    .max(100, 'Product name cannot exceed 100 characters')
    .required('Product name is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description cannot exceed 500 characters')
    .required('Description is required'),
  price: yup
    .number()
    .positive('Price must be a positive number')
    .max(1000000, 'Price cannot exceed ₹10,00,000')
    .required('Price is required'),
  category: yup
    .string()
    .min(2, 'Category must be at least 2 characters long')
    .max(50, 'Category cannot exceed 50 characters')
    .required('Category is required'),
  stock: yup
    .number()
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .max(10000, 'Stock cannot exceed 10,000')
    .required('Stock is required'),
});

// Type inference from schemas
export type LoginFormValues = yup.InferType<typeof loginValidationSchema>;
export type RegisterFormValues = yup.InferType<typeof registerValidationSchema>;
export type ProductFormValues = yup.InferType<typeof productValidationSchema>;