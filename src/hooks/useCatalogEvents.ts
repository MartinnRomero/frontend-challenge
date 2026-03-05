import { useEffect } from 'react';

type RefetchFn = () => void;

export function useCatalogEvents(
  apiUrl: string,
  handlers: Record<string, RefetchFn>,
) {
  useEffect(() => {
    const eventSource = new EventSource(`${apiUrl}/events`);

    eventSource.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        const eventType =
          typeof event.type === 'string'
            ? event.type
            : (event.data?.type as string | undefined);

        if (eventType && handlers[eventType]) {
          handlers[eventType]();
        }
      } catch (error) {
        console.error('Error parsing SSE event', error);
      }
    };

    return () => eventSource.close();
  }, [apiUrl, handlers]);
}