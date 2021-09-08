import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
    margin: 0 auto;
    display: table;
`;

const Error500: React.FC = () => {
    return <PageWrapper>Internal server error</PageWrapper>;
};

export default Error500;
