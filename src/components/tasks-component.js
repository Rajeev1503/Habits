import Card from "./card";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { AllTaskContext } from "../context/AllTaskContext";
import { TaskListContext } from "../context/TaskListContext";
import fetchHelper from "../../helpers/fetch-helper";
import TaskDetails from "./task-section/task-details";
import AddTaskComponent from "./task-section/add-taskComponent";
import { useSession } from "next-auth/react";
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import { FaPenSquare, FaTrash } from "react-icons/fa";

export default function Tasks(props) {
  const taskListContext = useContext(TaskListContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  const allTasksContext = useContext(AllTaskContext);
  const taskContext = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    fetchHandler();
  }, [taskListContext?.taskList]);

  function fetchHandler() {
    fetchHelper(
      `/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklist/${taskListContext?.taskList?._id}/tasks`,
      "GET"
    )
      .then((data) => {
        const tasks = JSON.parse(data);
        console.log(tasks);
        allTasksContext.allTasksDispatch({
          type: "alltasks",
          payload: tasks,
        });
        return setLoading(false);
      })
      .catch((err) => {
        console.log(err + ": error");
      });
  }

  const [displayDetailedTask, setDisplayDetailedTask] = useState(false);
  const [showAddTaskComponent, setShowAddTaskComponent] = useState(false);

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      <div className="pb-4">
        <span className="text-xs font-bold text-lightgray"></span>
      </div>
      <div className="scrollbarfeature overflow-y-scroll">
        <div>
          <button
            className="max-w-max bg-button-light p-1 px-2 rounded-lg text-xs text-center text-darktext font-semibold mb-4"
            onClick={() => setShowAddTaskComponent(!showAddTaskComponent)}
          >
            + Add New Task
          </button>
          <div className={`${showAddTaskComponent ? "" : "hidden"}`}>
            <AddTaskComponent />
          </div>
        </div>

        <div className="w-full">
          <div className="" style={{ height: "100%" }}>
            <p className={`${loading ? "border__loading" : ""} w-full`}></p>
            {allTasksContext?.allTasksState?.length === 0 ? (
              <h1>No Tasks Found</h1>
            ) : (
              ""
            )}
            <div
              className={`${
                loading ? "hidden" : "grid grid-cols-1 auto-rows-auto gap-5 p-2"
              }`}
            >
              {allTasksContext?.allTasksState
                ?.map((task, i) => {
                  return (
                    <div
                      key={i}
                      className={`border rounded-lg border-border-dark `}
                    >
                      <div className="pt-2"
                        onClick={() => {
                          setDisplayDetailedTask(true);
                          return taskContext.setTask(task);
                        }}
                      >
                        <Card>
                          <div className="pl-2 w-full flex flex-row flex-wrap gap-2 text-darktext font-semibold text-xxs">
                            <span
                              className={`flex justify-center items-center ${
                                task.isActive
                                  ? "bg-red-500"
                                  : "bg-border-notactive"
                              } text-white rounded-lg px-1.5 py-0.5 text-center `}
                            >
                              {task.isActive ? (
                                <span>Not Completed</span>
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
                          <div className="w-full pt-4">
                            <div className="pl-2 pb-2">
                              <p className="text-sm font-semibold capitalize">
                                {task.taskName}
                              </p>
                              <p className="text-xs font-semibold text-sub-text capitalize">
                                {task.description}
                              </p>
                            </div>
                            {/* <div className="flex items-center gap-2">
                              <span className="opacity-10 hover:opacity-70">
                                {<FaPenSquare />}
                              </span>
                              <span className="opacity-10 hover:opacity-70">
                                {<FaTrash />}
                              </span>
                            </div> */}

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
                      <p
                        className={`${
                          displayDetailedTask
                            ? task._id === taskContext?.task?._id
                              ? ""
                              : "hidden"
                            : "hidden"
                        } w-full text-xxs font-semibold cursor-pointer text-right px-2 py-1 bg-[#151515]`}
                        onClick={() => setDisplayDetailedTask(false)}
                      >
                        Hide
                      </p>
                    </div>
                  );
                })
                .reverse()}
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
