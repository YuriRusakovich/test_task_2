import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`    
  a {
    text-decoration: none;
    color: black;
  }
  li:hover {
    background: aliceblue;
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0;
    padding: 0;
    justify-content: center;
  }
  
  li {
    flex: 0 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    color: #999;
    justify-content: center;
    text-decoration: none;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    height: 25px;
    line-height: 16px;
    margin: 10px;
    padding: 0 5px;
    white-space: nowrap;
    border: 2px solid black;
    border-radius: 5px;
  }
`;


const Header: React.FC = () => {
    return(
        <Styles>
            <ul>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/leaders">Leaders</Link></li>
            </ul>
        </Styles>
    );
};

export default Header;