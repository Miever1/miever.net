import React from "react";

interface Props {
    /** Shown when a child throws while rendering. */
    fallback: React.ReactNode;
    children: React.ReactNode;
}

/**
 * Minimal error boundary so a failure rendering post content (e.g. malformed
 * markdown HTML) degrades to a friendly message instead of a blank page.
 */
class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown) {
        // eslint-disable-next-line no-console
        console.error("Content failed to render:", error);
    }

    render() {
        if (this.state.hasError) return <>{this.props.fallback}</>;
        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;
