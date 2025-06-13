import { useEffect, useState } from "react";

const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
          console.warn(`Failed to load image: ${url}`);
          resolve();
        };

        img.src = url;
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => {
        setImagesLoaded(true);
      }, 300);
    });
  }, [imageUrls]);

  return { imagesLoaded, loadingProgress };
};


export default useImagePreloader;
