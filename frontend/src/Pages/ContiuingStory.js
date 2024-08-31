import React from 'react';
import styled from 'styled-components';
import Bar from '../components/Bars';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    height: 100vh; 
`;

const ContinuingStory = () => {
    return (
        <PageContainer>
            <Bar />
        </PageContainer>
    );
}

export default ContinuingStory;