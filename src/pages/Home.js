import React from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import TaskForm from "../components/TaskForm";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Home = () => {
  return (
    <Container>
      <TaskForm />
      <SideBar />
    </Container>
  );
};

export default Home;
