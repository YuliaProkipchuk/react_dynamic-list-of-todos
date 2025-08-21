import { useEffect, useState } from 'react';

export function useFetch<T>(
  callback: () => Promise<T>,
): [T | null, boolean, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    callback()
      .then((res: T) => {
        setData(res);
      })
      .catch((error: unknown) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [callback]);

  return [data, isLoading, isError];
}
