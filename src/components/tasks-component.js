import Card from "./card";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { AllTaskContext } from "../context/AllTaskContext";
import { TaskListContext } from "../context/TaskListContext";
import fetchHelper from "../../helpers/fetch-helper";
import TaskDetails from "./task-section/task-details";

export default function Tasks(props) {
  const taskListContext = useContext(TaskListContext);
  const allTasksContext = useContext(AllTaskContext);
  const taskContext = useContext(TaskContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandler();
  }, [taskListContext?.taskList]);

  function fetchHandler() {
    // setLoading(true);
    fetchHelper(`/api/tasklist/${taskListContext.taskList._id}/tasks`, "GET")
      .then((data) => {
        const tasks = JSON.parse(data);
        allTasksContext.allTasksDispatch({
          type: "addtasks",
          payload: tasks,
        });
        return setLoading(false);
      })
      .catch((err) => {
        console.log(err + ": error");
      });
  }

  const [displayDetailedTask, setDisplayDetailedTask] = useState(false);
  return (
    <div className="flex flex-col overflow-y-scroll" style={{ height: "100%" }}>
      <div className="">
        <span className="text-xs font-bold text-lightgray">
          1st January 2023
        </span>
      </div>
      <br />
      <div className="items-center">
        <button className="max-w-max bg-button-light p-1 px-2 rounded-lg text-xs text-center text-darktext font-semibold mb-4">
          + Add New Task
        </button>
        <div className="w-full">
          <p className={`${loading ? "border__loading" : ""} w-full`}></p>
          {allTasksContext?.allTasksState?.length === 0 ? (
            <h1>No Tasks Found</h1>
          ) : (
            ""
          )}
          <div className={`${loading? 'hidden': 
          'grid grid-cols-1 auto-rows-auto gap-5 p-2'
          }`}>
            {allTasksContext?.allTasksState?.map((task, i) => {
              return (
                <div
                  key={i}
                  className={`border rounded-lg border-border-dark `}
                >
                  <div
                    onClick={() => {
                      setDisplayDetailedTask(true);
                      return taskContext.setTask(task);
                    }}
                  >
                    <Card>
                      <div className=" w-full flex flex-row flex-wrap gap-2 text-darktext font-semibold text-xxs">
                        <span
                          className={`flex justify-center items-center ${
                            task.isActive ? "bg-red-500" : "bg-border-notactive"
                          } text-white rounded-lg px-1.5 py-0.5 text-center `}
                        >
                          {task.isActive ? (
                            <span>Active</span>
                          ) : (
                            <span>Completed</span>
                          )}
                        </span>
                        <span className="flex justify-center items-center bg-border-light rounded-lg px-1.5 py-0.5 text-center">
                          imp
                        </span>
                        <span className="flex justify-center items-center bg-border-light rounded-lg px-1.5 py-0.5 text-center">
                          urgent
                        </span>
                      </div>
                      <div className="w-full p-1 pt-4">
                        <div>
                          <p className="text-sm font-semibold capitalize">
                            {task.taskName}
                          </p>
                          <p className="text-xs font-semibold text-sub-text capitalize">
                            {task.description}
                          </p>
                        </div>
                        <div
                          className={`${
                            displayDetailedTask
                              ? task._id === taskContext?.task?._id
                                ? ""
                                : "hidden"
                              : "hidden"
                          }`}
                        >
                          <TaskDetails />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
