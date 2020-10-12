import React, { useState, useEffect } from 'react';
import './styles.css';

const Banner = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setIndex(index + 1), 5000);
        return () => clearTimeout(t);
    }, [index]);

    return images ? <img src={images[index]} alt="Banner" className="banner"/> : <div className="empty-banner"></div>;
}

export default Banner;