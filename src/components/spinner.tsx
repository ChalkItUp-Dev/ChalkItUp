import { Spinner } from '@heroui/react';
import { useState, useEffect } from 'react';

const GlobalSpinner = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleRequestStart = () => setIsLoading(true);
        const handleRequestEnd = () => setIsLoading(false);

        window.addEventListener('request-start', handleRequestStart);
        window.addEventListener('request-end', handleRequestEnd);

        return () => {
            window.removeEventListener('request-start', handleRequestStart);
            window.removeEventListener('request-end', handleRequestEnd);
        };
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0  bg-opacity-50 z-50 flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    );
};

export default GlobalSpinner;
