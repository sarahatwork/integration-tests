import { renderHook, act } from '@testing-library/react-hooks';

import { useLogin } from './useLogin';

describe('useLogin', () => {
  test('initial state', () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.state).toEqual({
      status: 'idle',
      user: null,
      error: null,
    });
  });

  test('successful login flow', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockResolvedValue({ json: () => ({ token: '123' }) });

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.onSubmit({
        email: 'test@email.com',
        password: 'password',
      });
    });

    // sets state to pending
    expect(result.current.state).toEqual({
      status: 'pending',
      user: null,
      error: null,
    });

    await waitForNextUpdate();

    // sets state to resolved, stores email address
    expect(result.current.state).toEqual({
      status: 'resolved',
      user: {
        email: 'test@email.com',
      },
      error: null,
    });
  });

  test('error login flow', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockResolvedValue({ json: () => ({ error: 'invalid password' }) });

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.onSubmit({
        email: 'test@email.com',
        password: 'invalid',
      });
    });

    // sets state to pending
    expect(result.current.state).toEqual({
      status: 'pending',
      user: null,
      error: null,
    });

    await waitForNextUpdate();

    // sets state to rejected, stores error
    expect(result.current.state).toEqual({
      status: 'rejected',
      user: null,
      error: 'invalid password',
    });
  });
});
