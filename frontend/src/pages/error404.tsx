import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
    margin: 0 auto;
    display: table;
`;

const Error404: React.FC = () => {
    return(<PageWrapper>Page Not Found</PageWrapper>);
};

export default Error404;