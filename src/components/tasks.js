import Card from './card'
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { AllTaskContext } from "../context/AllTaskContext";
import { TaskListContext } from "../context/TaskListContext";
import fetchHelper from "../../helpers/fetch-helper";

export default function Tasks(props) {
  const taskListContext = useContext(TaskListContext);
  const allTasksContext = useContext(AllTaskContext);
  const taskContext = useContext(TaskContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHandler();
  }, [taskListContext?.taskList]);

  function fetchHandler() {
    setLoading(true);
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

  function displayDetailedTaskHandler(initialValue) {
    if(initialValue && !displayDetailedTask){
      return setDisplayDetailedTask(true);
    }
    return setDisplayDetailedTask(false);
  }

  return (
    <div className="w-full">
      <p className={`${loading ? "" : "hidden"}`}>loading...</p>
      {allTasksContext?.allTasksState?.length === 0 ? (
        <h1>No Tasks Found</h1>
      ) : (
        ""
      )}
      <div className=" grid grid-cols-2 auto-rows-auto gap-5 p-2">
        {allTasksContext?.allTasksState?.map((task, i) => {
          return (
            <div
              key={i}
              className={`border rounded-lg ${
                task._id === taskContext?.task?._id
                  ? "col-span-2 border-border-dark"
                  : "border-border-dark"
              } ${displayDetailedTask? 'col-auto' : ''}`}
            >
              <div
                className={`${
                  task._id === taskContext?.task?._id
                    ?displayDetailedTask? "cursor-default": "cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  taskContext.setTask(task);
                  return props.setTaskHandler(task);
                }}
              >
                <Card
                  selectedItemBorder={`${
                    task._id === taskContext?.task?._id
                      ? "border-border-light"
                      : "border-border-dark"
                  }`}
                >
                  <div className=" w-full flex flex-row flex-wrap gap-2 text-darktext font-semibold text-xs">
                    <span
                      className={`flex justify-center items-center ${
                        task.isActive
                          ? "bg-red-500"
                          : "bg-border-notactive"
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
                  <div className="w-full p-1">
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
                        task._id !== taskContext?.task?._id
                          ? "hidden"
                          : displayDetailedTask
                          ? "hidden"
                          : ""
                      } text-xs font-semibold mt-8 bg-accent-background rounded-lg p-4`}
                    >
                      <div>
                        <p>
                          <span className="inline-block w-20">Assignee</span>{" "}
                          <span className="inline-block">:</span>
                        </p>
                        <p>
                          <span className="inline-block w-20">Assigned on</span>{" "}
                          <span className="inline-block">:</span>
                        </p>
                        <p>
                          <span className="inline-block w-20">Due Date</span>{" "}
                          <span className="inline-block">:</span>
                        </p>
                        <p>
                          <span className="inline-block w-20">Updates</span>{" "}
                          <span className="inline-block">:</span>
                        </p>
                      </div>
                      <br />
                      <br />
                      <div className="w-3/5">
                        <p>Send Quick Message to Assignee &nbsp;: </p>
                        <form
                          id="tagform"
                          className="flex flex-row gap-1 text-sm mb-2 font-semibold pt-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            // addNewTagsHandler();
                          }}
                        >
                          <input
                            className="flex-grow border border-border-light rounded-lg p-1 bg-transparent text-lighttext text-xs"
                            name="customtag"
                            type="text"
                            placeholder="Enter Message"
                            onChange={(e) => {
                              // setTagsInputBoxValue(e.target.value);
                            }}
                          />
                          <button
                            className="flex-grow bg-button-light text-darktext text-xs rounded-lg"
                            type="submit"
                          >
                            Send
                          </button>
                        </form>
                        <p className="my-3">or</p>
                        <button className="bg-lighttext text-darktext rounded-lg p-1 ">
                          Open Chat Box
                        </button>
                      </div>
                    </div>
                    <p
                      className={` text-right text-xs font-semibold pt-2 px-2 cursor-pointer`}
                      onClick={() => {
                        displayDetailedTaskHandler(task._id === taskContext?.task?._id);
                      }}
                    >
                      {displayDetailedTask ? <p>Expand</p>
                         : task._id === taskContext?.task?._id ?<span>Hide</span>: <p></p>
                      }
                    </p>
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
  );
}
