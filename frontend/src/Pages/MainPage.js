import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; 
import Bar from '../components/Bars';
import HeartToggle from '../components/HeartToggle';
import WritePostButton from '../components/WritePostButton'; 

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    height: 100vh; 
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: 526px;
    left: 75px;
    padding: 0;
`;

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
        <PageContainer>
            <Bar />
            <ButtonContainer>
                <WritePostButton />
            </ButtonContainer>
            <HeartToggle />
            <Link to="/detailpage" style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}>
                Go to Detail Page
            </Link>
        </PageContainer>
    );
}

export default Mainpage;