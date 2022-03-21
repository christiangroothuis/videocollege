import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../ErrorFallback';

interface Props {
    children: React.ReactNode;
}

export function ErrorBound({ children }: Props) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            {children}
        </ErrorBoundary>
    );
}
