import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../state/TaskSlice";
const Container = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  height: 10vh;
`;
const Form = styled.form`
  width: 80%;
  margin-top: 1rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TaskInput = styled.input`
  color: #1d3557;
  background-color: transparent;
  border: 1px solid #1d3557;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
`;
const Button = styled.button`
  background-color: transparent;
  border: 1px solid #1d3557;
  color: #1d3557;
  padding: 0.5rem 1rem;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #343a40;
    color: white;
  }
`;
const TaskForm = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [task, setTask] = React.useState("");

  const taskChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const newTaskHandler = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }
    dispatch(addTask({ id: Math.random(), text: task, completed: false }));
    window.localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        { id: Math.random(), text: task, completed: false },
      ])
    );
    setTask("");
  };

  return (
    <Container>
      <Form onSubmit={newTaskHandler}>
        <TaskInput onChange={taskChangeHandler} value={task} />
        <Button>Submit</Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
