import { clientConfig } from 'config/client.config';
import { useEffect, useRef } from 'react';

export default function useSSE(
    jobId: string | null,
    onMessageHandler: (event: MessageEvent) => void,
) {
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!jobId) return;

        const eventSource = new EventSource(
            `${clientConfig.backendUrl}/runner/events/${jobId}`,
            {
                withCredentials: true,
            },
        );

        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log(`Connected to ${jobId}`);
        };

        eventSource.onmessage = (event) => {
            onMessageHandler(event);
        };

        eventSource.onerror = () => {
            console.log(`SSE error for ${jobId}`);
        };

        return () => {
            eventSource.close();

            if (eventSourceRef.current === eventSource) {
                eventSourceRef.current = null;
            }
        };
    }, [jobId]);

    return {
        close: () => {
            eventSourceRef.current?.close();
            eventSourceRef.current = null;
        },
    };
}
