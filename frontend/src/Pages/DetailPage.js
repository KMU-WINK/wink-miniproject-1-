import React from 'react';
import styled from 'styled-components';
import Bar from '../components/Bars';
import Button from '../components/PlusButton';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    height: 100vh; 
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center; 
    padding: 35px; 
`;

const DetailPage = () => {
    return (
        <PageContainer>
            <Bar />
            <ButtonContainer>
                <Button />
            </ButtonContainer>
        </PageContainer>
    );
}

export default DetailPage;
