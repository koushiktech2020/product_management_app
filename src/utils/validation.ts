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

// Type inference from schemas
export type LoginFormValues = yup.InferType<typeof loginValidationSchema>;
export type RegisterFormValues = yup.InferType<typeof registerValidationSchema>;