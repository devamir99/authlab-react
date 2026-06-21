import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/auth';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password and confirmation must match')
      .required('Password confirmation is required')
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authAPI.register({
        name: values.name,
        email: values.email,
        password: values.password
      });

      if (result.success) {
        setSuccess(result.message);
        // Auto login after successful registration
        setTimeout(() => {
          login(result.user, `mock_token_${result.user.id}_${Date.now()}`);
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Server connection error. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Breadcrumb
          items={[
            { labelKey: 'breadcrumb.home', to: '/' },
            { labelKey: 'breadcrumb.authHub', to: '/auth' },
            { labelKey: 'breadcrumb.email', to: '/auth/email' },
            { labelKey: 'breadcrumb.register' },
          ]}
        />
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create New Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            or{' '}
            <Link
              to="/auth/email/login"
              className="font-medium text-primary hover:underline"
            >
              sign in to existing account
            </Link>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg py-8 px-6 shadow-2xl rounded-2xl border border-white/20">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {success}
                  </div>
                )}

                <FormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  placeholder="Enter your full name"
                  required
                />

                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  placeholder="example@email.com"
                  required
                />

                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  placeholder="Enter your password"
                  required
                />

                <FormInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                  placeholder="Re-enter your password"
                  required
                />

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
                  >
                    {loading ? (
                      <Loader size="small" text="" />
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Back to Home
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;

