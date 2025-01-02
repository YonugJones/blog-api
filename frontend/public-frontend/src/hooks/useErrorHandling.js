import { useState } from 'react';

const useErrorHandling = () => {
  const [error, setError] = useState(null);

  const handleError = (errorResponse) => {
    if (errorResponse.response) {
      setError(errorResponse.response.data.message || 'An error occured');
    } else if (errorResponse.request) {
      setError('No response from the server. Please try again later')
    } else {
      setError(errorResponse.message)
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError }
}

export default useErrorHandling;