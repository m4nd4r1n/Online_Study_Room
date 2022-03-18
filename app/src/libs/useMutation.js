import { useState } from 'react';

export default function useMutation(url) {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false })),
      );
  }
  return [mutation, { ...state }];
}
