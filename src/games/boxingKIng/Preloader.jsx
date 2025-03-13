import React, { useState, useEffect } from 'react';

const Preloader = ({ assets, onComplete }) => {
    const [loadedAssets, setLoadedAssets] = useState({});
    const [loaded, setLoaded] = useState(0);

    //for debugging
    useEffect(() => {
        console.log('Current loadedAssets state:', loadedAssets);
    }, [loadedAssets]);

    useEffect(() => {
        //console.log('Loading assets...');
        const promises = assets.map(asset => {
            //console.log(src)
            new Promise(resolve => {
                const img = new Image();
                img.src = asset.src;
                img.onload = () => {
                    console.log('image loaded',asset.name,img)
                    // setLoadedAssets(prev => ({ ...prev, [src]: img }));
                    // resolve();
                    setTimeout(() => {
                        setLoadedAssets((prev) => ({ ...prev, [asset.name]: img, }));
                        setLoaded((prev) => prev + 1); // Increment loaded count
                        resolve();
                    }, 3000);
                };
                img.onerror = () => {
                    console.error(`Error loading asset: ${asset.src}`);
                    resolve(); // Still resolve to prevent blocking
                };
            })
        });

        Promise.all(promises).then(() => {
            console.log('Assets loaded:', loadedAssets);
            onComplete(loadedAssets);
        }).catch((error) => {
            console.error('Error in loading assets:', error);
        });
    }, [assets, onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoaded(prev => (prev < assets.length ? prev + 1 : assets.length));
        }, 100);

        return () => clearInterval(interval);
    }, [assets.length]);

    return (
        <div className="flex items-center justify-center md:h-[90vh] h-screen">
            <div className="text-xl font-semibold text-gray-800 ">
                Loading... {Math.min(Math.round((loaded / assets.length) * 100), 100)}%
            </div>
        </div>
    );
};

export default Preloader;
