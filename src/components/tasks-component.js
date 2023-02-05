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
import {
  FaCross,
  FaInfo,
  FaMinusSquare,
  FaPenSquare,
  FaPlusSquare,
  FaSquare,
  FaTrash,
} from "react-icons/fa";

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
    <div className="" style={{ height: "100%" }}>
      <div className="flex flex-col py-4" style={{ height: "100%" }}>
        <div className="pb-4">
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

        <div className="w-full scrollbarfeature overflow-y-scroll">
          <div className="">
            <p className={`${loading ? "border__loading" : ""} w-full`}></p>
            {allTasksContext?.allTasksState?.length === 0 ? (
              <h1>No Tasks Found</h1>
            ) : (
              ""
            )}
            <div
              className={`${
                loading ? "hidden" : "grid grid-cols-1 auto-rows-auto gap-4 p-2"
              }`}
            >
              {allTasksContext?.allTasksState
                ?.map((task, i) => {
                  return (
                    <div
                      key={i}
                      className={`border rounded-lg border-border-dark 
                      `}
                    >
                      <div
                        className={`${
                          displayDetailedTask
                            ? task._id === taskContext?.task?._id
                              ? "bg-[#151515]"
                              : ""
                            : ""
                        } rounded-lg pt-2`}
                        onClick={() => {
                          return taskContext.setTask(task);
                        }}
                      >
                        <Card>
                          <div className="pl-2 w-full flex flex-row flex-wrap gap-2 text-lighttext font-semibold text-xxs">
                            <div
                              className={`flex justify-center items-center gap-1 bg-black border border-border-dark rounded-lg px-1.5 py-0.5 text-center `}
                            >
                              <span className="text-red-500 rounded-lg">
                                {<FaSquare />}
                              </span>
                              <span>Not Completed</span>
                            </div>
                            <div className="flex justify-center items-center gap-1 bg-black border border-border-dark rounded-lg px-1.5 py-0.5 text-center">
                              <span className="text-pink-500 rounded-lg">
                                {<FaSquare />}
                              </span>
                              <span>important</span>
                            </div>
                            <div className="flex justify-center items-center gap-1 bg-black border border-border-dark rounded-lg px-1.5 py-0.5 text-center">
                              <span className="text-blue-500 rounded-lg">
                                {<FaSquare />}
                              </span>
                              <span>Urgent</span>
                            </div>
                            <div className="flex justify-center items-center gap-1 bg-black border border-border-dark rounded-lg px-1.5 py-0.5 text-center">
                              <span className="text-green-500 rounded-lg">
                                {<FaSquare />}
                              </span>
                              <span>near deadline</span>
                            </div>
                          </div>
                          <div className="w-full py-2">
                            <div className=" flex items-center justify-between px-2 pb-2">
                              <div className="">
                                <p className="text-md font-semibold capitalize">
                                  {task.taskName}
                                </p>
                                <p className="text-xs font-semibold text-sub-text capitalize">
                                  {task.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 text-xs">
                                <div>
                                  {displayDetailedTask ? (
                                    task._id === taskContext?.task?._id ? (
                                      <span
                                        className="opacity-20 hover:opacity-70 flex items-center gap-1 cursor-pointer"
                                        onClick={() =>
                                          setDisplayDetailedTask(
                                            !displayDetailedTask
                                          )
                                        }
                                      >
                                        {<FaMinusSquare />} Info
                                      </span>
                                    ) : (
                                      <span
                                        className="opacity-20 hover:opacity-70 flex items-center gap-1 cursor-pointer"
                                        onClick={() =>
                                          setDisplayDetailedTask(
                                            !displayDetailedTask
                                          )
                                        }
                                      >
                                        {<FaPlusSquare />} Info
                                      </span>
                                    )
                                  ) : (
                                    <span
                                      className="opacity-20 hover:opacity-70 flex items-center gap-1 cursor-pointer"
                                      onClick={() =>
                                        setDisplayDetailedTask(
                                          !displayDetailedTask
                                        )
                                      }
                                    >
                                      {<FaPlusSquare />} Info
                                    </span>
                                  )}
                                </div>
                                <div className="opacity-20 hover:opacity-70 flex items-center gap-1 cursor-pointer">
                                  {<FaTrash />} Delete
                                </div>
                              </div>
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
                })
                .reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
