import { useState, useCallback } from 'react';

export const useAuthForm = (onSuccess) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const setApiErrors = (apiErrors) => {
    if (Array.isArray(apiErrors)) {
      const errorMap = {};
      apiErrors.forEach((error) => {
        errorMap[error.param] = error.msg;
      });
      setErrors(errorMap);
    } else {
      setErrors({ general: apiErrors });
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    setApiErrors,
    loading,
    setLoading,
    handleChange,
    validateForm,
  };
};

export default useAuthForm;
