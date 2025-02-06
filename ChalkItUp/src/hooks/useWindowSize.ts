import { useState, useEffect } from "react";

interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

// Hook
const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            };

            window.addEventListener("resize", handleResize);
            handleResize(); // Initial call

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return windowSize;
};

export default useWindowSize;
