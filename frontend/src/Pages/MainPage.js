import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Bar from '../components/Bars';
import HeartToggle from '../components/HeartToggle';

const Mainpage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8001/api/data')
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <Bar />
            <HeartToggle />
            <p>{data}</p>
            <Link to="/detailpage" style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}>
                Go to Detail Page
            </Link>
        </div>
    );
}

export default Mainpage;