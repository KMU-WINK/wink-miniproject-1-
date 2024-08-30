import React from 'react';
import { Link } from 'react-router-dom';
import Bar from '../components/Bars';
import HeartToggle from '../components/HeartToggle';

const Mainpage = () => {
    return (
        <div>
            <Bar />
            <HeartToggle />
            
            <Link to="/detailpage" style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}>
                Go to Detail Page
            </Link>
        </div>
    );
}

export default Mainpage;