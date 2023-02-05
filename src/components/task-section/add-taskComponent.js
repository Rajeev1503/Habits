import { useSession } from "next-auth/react";
import { useContext, useRef, useState } from "react";
import fetchHelper from "../../../helpers/fetch-helper";
import { AllTaskContext } from "../../context/AllTaskContext";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskListContext } from "../../context/TaskListContext";

export default function AddTaskComponent() {
  const [moreFieldsToggle, setMoreFieldsToggle] = useState(false);
  const { data: session } = useSession();
  const taskListContext = useContext(TaskListContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  const allTasksContext = useContext(AllTaskContext);

  function addNewTaskHandler() {
    fetchHelper(
      `/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklist/${taskListContext?.taskList?._id}/tasks`,
      "POST",
      addTaskInputValue.current.value
    )
      .then((data) => {
        const task = JSON.parse(data);
        allTasksContext.allTasksDispatch({
          type: "addNewTask",
          payload: task,
        });
      })
      .catch((err) => {
        console.log(err + ": error");
      });

      addTaskInputValue.current.value = ''
  }

  const addTaskInputValue = useRef();

  return (
    <div className="w-2/3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewTaskHandler();
        }}
      >
        <div
          className={`flex flex-col gap-1 rounded-lg font-semibold text-xs p-2 `}
        >
          <div className="grid grid-cols-2 gap-1">
            <input
              placeholder="Task Name"
              className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
              ref={addTaskInputValue}
            />
            <button
              className={`flex-grow ${
                moreFieldsToggle ? "hidden" : ""
              } max-w-max px-2 bg-border-light rounded-lg text-darktext`}
            >
              Add Task
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <div
              className={`${
                moreFieldsToggle ? "" : "hidden"
              } grid grid-cols-2 gap-2`}
            >
              <input
                placeholder="Description"
                className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
              />
              <input
                placeholder="Important Note"
                className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
              />
              <div className="col-span-2 flex flex-row gap-1 text-xs">
                <input
                  placeholder="Custom Field"
                  className="flex-grow rounded-lg p-1 bg-transparent border border-border-light"
                />
                <button
                  type=""
                  className=" bg-button-light text-darktext p-1 rounded-lg flex-grow"
                >
                  Add More
                </button>
              </div>
            </div>
            <div
              className={`${
                moreFieldsToggle ? "" : "hidden"
              } w-full flex flex-row gap-2 justify-center items-center text-xs text-center text-darktext`}
            >
              <button
                type="submit"
                className=" bg-button-light p-1 rounded-lg flex-grow"
              >
                Add Task
              </button>
              <button
                className="bg-button-light p-1 rounded-lg flex-grow"
                onClick={() => {
                  setMoreFieldsToggle(!moreFieldsToggle);
                }}
              >
                Close
              </button>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setMoreFieldsToggle(!moreFieldsToggle);
            }}
          >
            <p className="text-xxs text-gray-400 px-2">
              {moreFieldsToggle ? (
                <span>- Hide extra fields</span>
              ) : (
                <span>+ Add More fields</span>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
