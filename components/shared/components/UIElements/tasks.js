import fetchHelper from "../../../../helpers/fetch-helper";
import { useContext, useEffect, useState } from "react";
import Card from "../UIElements/card";
import { TaskListContext } from "../../context/TaskListContext";
import { AllTaskContext } from "../../context/AllTaskContext";
import { TaskContext } from "../../context/TaskContext";
import { NEXT_URL } from "../../../../config/index";
export default function Tasks(props) {
  // const [allTasks , setAllTasks] = useState([]);
  const taskListContext = useContext(TaskListContext);
  const allTasksContext = useContext(AllTaskContext);
  const taskContext = useContext(TaskContext);
  // const [allTasks, setAllTasks] = useState(allTasksContext?.allTasks)

  // const {allTasksState, allTasksDispatch} = AllTaskState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchHandler();
    setLoading(false);
  }, [taskListContext?.taskList]);

  function fetchHandler() {

    fetchHelper(
      `/api/tasklist/${taskListContext.taskList._id}/tasks`,
      "GET"
    )
      .then((data) => {
        const tasks = JSON.parse(data);
        // console.log(tasks)
        // console.log(allTasksState)
        return allTasksContext.allTasksDispatch({
          type: "addtasks",
          payload: tasks,
        });
      })
      .catch((err) => {
        console.log(err + ": error");
      });
  }

  const [displayDetailedTask, setDisplayDetailedTask] = useState(false);

  return (
    <div className="w-full" style={{ height: "70vh" }}>
      <p className={`${loading?'':'hidden'}`}>loading...</p>
      {allTasksContext?.allTasksState?.length === 0 ? (
        <h1 className="text-white">No Tasks Found</h1>
      ) : (
        <p></p>
      )}
      <div className=" grid grid-cols-2 auto-rows-auto gap-5 p-2">
        {allTasksContext?.allTasksState?.map((task) => {
          return (
            <div
              key={task._id}
              className={`border rounded-lg ${
                task._id === taskContext?.task?._id
                  ? "col-span-2 border-border-dark"
                  : "border-border-dark"
              }`}
            >
              <div
                className="cursor-pointer"
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
                          ? "bg-border-active"
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
                      <p className="text-sm font-semibold capitalize">{task.taskName}</p>
                      <p className="text-xs font-semibold text-sub-text capitalize">
                        {task.description}
                      </p>
                    </div>
                    <div
                      className={`${
                        task._id !== taskContext?.task?._id ? 'hidden' : displayDetailedTask? 'hidden' : 'false'
                      } text-xs font-semibold mt-8 bg-darktext rounded-lg p-4`}
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
                      <br/>
                      <br/>
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
        <button className="bg-lighttext text-darktext rounded-lg p-1 ">Open Chat Box</button>
                      </div>
                    </div>
                    <p className={`${
                        task._id === taskContext?.task?._id ? "" : "hidden"
                      } text-right text-xs font-semibold pt-2 px-2`} onClick={()=>{setDisplayDetailedTask(!displayDetailedTask)}}>{displayDetailedTask?<span>Show</span>:<span>Hide</span>}</p>
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
