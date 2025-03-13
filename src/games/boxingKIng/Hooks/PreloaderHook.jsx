import { useState, useEffect } from 'react';

const usePreloader = (assets) => {
    const [loadedAssets, setLoadedAssets] = useState({});
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadAssets = async () => {
            const promises = assets.map(asset =>
                new Promise(resolve => {
                    const img = new Image();
                    img.src = asset.src;
                    img.onload = () => {
                        setLoadedAssets(prev => ({ ...prev, [asset.name]: img }));
                        setLoadedCount(prev => prev + 1);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Error loading asset: ${asset.src}`);
                        resolve(); // Resolve even if there's an error to avoid blocking
                    };
                })
            );

            await Promise.all(promises);
            setIsLoaded(true);
        };

        loadAssets();
    }, [assets]);

    return { loadedAssets, isLoaded, progress: Math.min((loadedCount / assets.length) * 100, 100) };
};

export default usePreloader;
