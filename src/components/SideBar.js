import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadTasks } from "../state/TaskSlice";
import { Link } from "react-router-dom";
import { removeTask } from "../state/TaskSlice";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Task = styled.div`
  background-color: #495057;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  width: 200px;
  flex-grow: 1;
`;
const Button = styled.button`
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #1d3557;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
`;

const UpdateContainer = styled.div`
  margin-right: 1rem;
`;

const CompletedTasksHeader = styled.h2`
  margin-top: 1rem;
  font-size: 2rem;
  color: #343a40;
`;
const SideBar = () => {
  const [currentTask, setCurrentTask] = React.useState({});
  const [updateClicked, setUpdateClicked] = React.useState(false);
  const [updateText, setUpdateText] = React.useState("");
  const [totalTasks, setTotalTasks] = React.useState(0);
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    const taskList = window.localStorage.getItem("tasks");
    if (taskList) {
      dispatch(loadTasks(JSON.parse(taskList)));
    }

    const total = window.localStorage.getItem("totalTasks");
    if (total) {
      const totalTasks = parseInt(total);
      setTotalTasks(totalTasks);
    }
  }, [dispatch, updateClicked, updateText]);

  const viewTaskHandler = (e) => {
    e.preventDefault();
    setCurrentTask(e.target.id);
    console.log(currentTask);
  };

  const finishTaskHandler = (id) => {
    const task = tasks.find((task) => task.id === id);
    dispatch(removeTask(task.id));
    const updatedTasks = tasks.filter((task) => task.id !== id);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTotalTasks(totalTasks + 1);
    window.localStorage.setItem("totalTasks", totalTasks + 1);
  };

  const updateTaskClicked = () => {
    setUpdateClicked(!updateClicked);
  };

  const updateChangeHandler = (e) => {
    setUpdateText(e.target.value);
  };

  const updateTaskHandler = (id) => {
    const task = tasks.find((task) => task.id === id);
    const updateTask = { ...task, text: updateText };

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return updateTask;
      }
      return task;
    });
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setUpdateClicked(false);
  };

  return (
    <Container>
      <CompletedTasksHeader>
        Lifetime Completed Tasks: {totalTasks}
      </CompletedTasksHeader>
      {tasks.map((task) => {
        return (
          <Task>
            <StyledLink
              title={task.text}
              id={task.id}
              to={`/tasks/${task.id}`}
              onClick={viewTaskHandler}
            >
              {task.text}
            </StyledLink>
            {updateClicked && (
              <UpdateContainer>
                <Input onChange={updateChangeHandler} />
                <Button
                  onClick={() => {
                    updateTaskHandler(task.id, task.text);
                  }}
                >
                  Submit
                </Button>
              </UpdateContainer>
            )}
            <div>
              <Button onClick={updateTaskClicked}>Update</Button>
              <Button
                onClick={() => {
                  finishTaskHandler(task.id);
                }}
              >
                Finish
              </Button>
            </div>
          </Task>
        );
      })}
    </Container>
  );
};

export default SideBar;
