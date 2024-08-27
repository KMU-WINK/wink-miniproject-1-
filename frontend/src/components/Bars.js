import React, { Children } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WebBar = styled.div`
    height: 61px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #C8C8C8;
    background: #E7F8FF;
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

const LoginLink = styled(Link)`
    display: flex;
    width: 94px;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    align-items: center;

    color: #000;

    text-decoration: none;
    font-family: var(--Title-Large-Font, Roboto);
    font-size: var(--Title-Large-Size, 22px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--Title-Large-Line-Height, 28px); /* 127.273% */
    letter-spacing: var(--Title-Large-Tracking, 0px);
    &:hover {
        color: #6C6C6C;
    } 
`

const Bar = () => {
    return (
        <WebBar>
            <HomeLink to ="/mainpage">Home</HomeLink>
            <LoginLink to ="/LoginPage">Login</LoginLink>
        </WebBar>
    )
}
export default Bar;