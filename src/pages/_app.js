import { SessionProvider } from "next-auth/react";
import { useEffect, useReducer, useState } from "react";
import "../styles/globals.css";
//all contexts
import { TaskContext } from "../context/TaskContext";
import { TaskListContext } from "../context/TaskListContext";
import { AllTaskContext } from "../context/AllTaskContext";
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import { BackgroundColorContext } from "../context/backgroundColorContext";
import { TaskListCategoryContext } from "../context/TaskListCategoryContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [taskList, setTaskList] = useState();
  const [task, setTask] = useState();
  const [allTaskListType, setAllTaskListType] = useState();
  const [currentTaskListType, setCurrentTaskListType] = useState();

  function backgroundColorReducer(backgroundColorState, action) {
    switch (action.type) {
      case "dark": {
        return     {
          mode: "dark",
          background:"bg-[#202020]",
          foreground: "bg-[#111111]",
          text: "text-[#e2e4e4]",
          border: "border-[#252525]",
          button: 'bg-#c44242'
        }
      }
      case "light": {
        return {
          mode: "light",
          background:"bg-[#ffffff]",
          foreground: "bg-[#f2f2f2]",
          text: "text-[#111111]",
          border: "border-[#111111]",
          button: 'bg-[#c44242]'
        };
      }
      case "custom": {
        return {
          mode: "custom",
          background:"bg-[#202020]",
          foreground: "bg-[#444444]",
          text: "text-[#e2e4e4]",
          border: "border-[#252525]",
          button: 'bg-[#c44242]'
        };
      }
      default:
        return backgroundColorState;
    }
  }
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

  const [backgroundColorState, backgroundColorDispatch] = useReducer(
    backgroundColorReducer,
    {
      mode: "dark",
      background:"bg-[#202020]",
      foreground: "bg-[#111111]",
      text: "text-[#e2e4e4]",
      border: "border-[#252525]",
      button: 'bg-[#c44242]'
    }
  );

  return (
    <>
      <SessionProvider session={session}>
        <TaskListCategoryContext.Provider
          value={{ allTaskListType, setAllTaskListType }}
        >
          <CurrentTaskListTypeContext.Provider
            value={{ currentTaskListType, setCurrentTaskListType }}
          >
            <TaskListContext.Provider value={{ taskList, setTaskList }}>
              <AllTaskContext.Provider
                value={{ allTasksState, allTasksDispatch }}
              >
                <TaskContext.Provider value={{ task, setTask }}>
                  <BackgroundColorContext.Provider
                    value={{ backgroundColorState, backgroundColorDispatch }}
                  >
                    <Component {...pageProps} />
                  </BackgroundColorContext.Provider>
                </TaskContext.Provider>
              </AllTaskContext.Provider>
            </TaskListContext.Provider>
          </CurrentTaskListTypeContext.Provider>
        </TaskListCategoryContext.Provider>
      </SessionProvider>
    </>
  );
}
