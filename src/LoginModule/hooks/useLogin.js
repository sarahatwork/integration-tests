import { useReducer, useCallback } from 'react';

function loginReducer(state, action) {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      };
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        user: action.user,
        error: null,
      };
    }
    case 'start': {
      return {
        ...state,
        status: 'pending',
        error: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useLogin() {
  const [state, dispatch] = useReducer(loginReducer, {
    status: 'idle',
    user: null,
    error: null,
  });

  const onSubmit = useCallback(
    async ({ email, password }) => {
      dispatch({ type: 'start' });
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const { token, error } = await response.json();
      if (token) {
        dispatch({
          type: 'success',
          user: { email },
        });
      } else {
        dispatch({
          type: 'error',
          error,
        });
      }
    },
    [dispatch]
  );

  return {
    onSubmit,
    state,
  };
}
