import { Outlet } from "react-router-dom";
import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Root = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
