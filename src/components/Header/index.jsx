import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import Shape from '../../assets/Shape.png';

const Header = ({ ChildComponent }) => {

    const [sponsors, setSponsors] = useState([]);
    const [sponsor, setSponsor] = useState(0);
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        // getSponsors().then(setSponsors);
    }, []);

    useEffect(() => {
        const interval = setInterval(changeSponsor, 3000);
        return () => clearInterval(interval);

        function changeSponsor() {
            if (sponsor === sponsors.length - 1) return setSponsor(0);
            setSponsor(sponsor + 1);
        }
    }, [sponsors.length, sponsor]);

    return (
        <div className="header-container">
            <div className="header-image" />
            <section className="section">
                <h1 className="title">Getplace</h1>
            </section>
        </div>
    );
};

export default Header;