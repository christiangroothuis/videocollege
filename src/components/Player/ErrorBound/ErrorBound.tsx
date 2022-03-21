import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../ErrorFallback';

interface Props {
    children: React.ReactNode;
}

export function ErrorBound({ children }: Props) {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}
