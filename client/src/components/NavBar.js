import React from 'react';

import styled from 'styled-components';

const NBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  justify-content: flex-end;
  padding-right: 30px;
`;

const NavBar = props => {
  return (
    <div className="nav-wrapper">
      <h1>Welcome to Posts</h1>
      <NBar>
        <ul>Home</ul>
        <ul>Posts</ul>
      </NBar>
    </div>
  );
};

export default NavBar;
