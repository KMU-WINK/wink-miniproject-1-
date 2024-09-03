import React, { Children } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WebBar = styled.div`
    height: 50px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid #C8C8C8;
    background: #E7F8FF;
    padding-left-16px;
`;

const HomeLink = styled(Link)`
    display: flex;
    width: 92px;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    align-items: center;

    text-decoration: none;
    color: #000;
    text-align: center;
    font-family: var(--Title-Large-Font, Roboto);
    font-size: var(--Title-Large-Size, 22px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--Title-Large-Line-Height, 28px); /* 127.273% */
    letter-spacing: var(--Title-Large-Tracking, 0px);
    &:hover {
        color: #6C6C6C;
    }       
`;

const Top10Link = styled(Link)`
    display: flex;
    width: 92px;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    align-items: center;

    text-decoration: none;
    color: #000;
    text-align: center;
    font-family: var(--Title-Large-Font, Roboto);
    font-size: var(--Title-Large-Size, 22px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--Title-Large-Line-Height, 28px); /* 127.273% */
    letter-spacing: var(--Title-Large-Tracking, 0px);
    &:hover {
        color: #6C6C6C;
    }       
`;


const Bar = () => {
    return (
        <WebBar>
            <HomeLink to ="/">Home</HomeLink>
            <Top10Link to ="/Top10">Top10</Top10Link>
        </WebBar>
    )
}
export default Bar;