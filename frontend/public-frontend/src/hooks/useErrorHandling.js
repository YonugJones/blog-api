import { useState, useCallback } from 'react';

const useErrorHandling = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((errorResponse) => {
    if (errorResponse.response) {
      setError(errorResponse.response.data.message || 'An error occurred');
    } else if (errorResponse.request) {
      setError('No response from the server. Please try again later');
    } else {
      setError(errorResponse.message);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError }
}

export default useErrorHandling;