import React from 'react';

interface Props {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
    return (
        <div role="alert" className="flex h-full flex-col items-center justify-center bg-black">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button className="underline" onClick={resetErrorBoundary} type="button">
                Try again
            </button>
        </div>
    );
}
