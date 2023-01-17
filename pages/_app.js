import { SessionProvider } from "next-auth/react";
import { useEffect, useReducer, useState } from "react";
import "../styles/globals.css";
//all contexts
import { TaskContext } from "../components/shared/context/TaskContext";
import { TaskListContext } from "../components/shared/context/TaskListContext";
import { AllTaskContext } from "../components/shared/context/AllTaskContext";
import { TaskListTypeContext } from "../components/shared/context/TaskListTypeContext";
import { CurrentTaskListTypeContext } from "../components/shared/context/CurrentTaskListTypeContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [taskList, setTaskList] = useState();
  const [task, setTask] = useState();
  const [allTaskListType, setAllTaskListType] = useState();
  const [currentTaskListType, setCurrentTaskListType] = useState();

  function allTasksReducer(allTasks, action) {
    switch (action.type) {
      case "addtasks": {
        return action.payload;
      }
      case "updateTask": {
        return allTasks.map((task) => {
          if (task._id === action.payload.id) {
            console.log(action.payload.taskName);
            return {
              ...task,
              taskName: action.payload.taskName,
              description: action.payload.description,
            };
          } else {
            return task;
          }
        });
      }

      default:
        return allTasks;
    }
  }
  const [allTasksState, allTasksDispatch] = useReducer(allTasksReducer, [
    { message: "hello" },
  ]);

  return (
    <>
      <SessionProvider session={session}>
        <TaskListTypeContext.Provider value={{ allTaskListType, setAllTaskListType }}>
        <CurrentTaskListTypeContext.Provider value={{ currentTaskListType, setCurrentTaskListType }}>
          <TaskListContext.Provider value={{ taskList, setTaskList }}>
            <AllTaskContext.Provider value={{ allTasksState, allTasksDispatch }}>
              <TaskContext.Provider value={{ task, setTask }}>
                <Component {...pageProps} />
              </TaskContext.Provider>
            </AllTaskContext.Provider>
          </TaskListContext.Provider>
          </CurrentTaskListTypeContext.Provider>
        </TaskListTypeContext.Provider>
      </SessionProvider>
    </>
  );
}
