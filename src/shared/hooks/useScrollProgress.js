import { useState, useEffect } from 'react';

const useScrollProgress = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        //(scroll.y / (document.documentElement.offsetHeight - window.innerHeight)) * 100
        const position =(window.scrollY / (document.documentElement.offsetHeight - window.innerHeight) * 100)
        setScrollPosition(position);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        /* if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // you're at the bottom of the page
        setScrollPosition(100);
      } */
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    

    return scrollPosition
}

export default useScrollProgress;