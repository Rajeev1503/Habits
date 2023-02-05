import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import {
  FaSquare,
  FaTrash,
  FaPenSquare,
  FaCheck,
  FaAngleDown,
} from "react-icons/fa";
import { TaskListContext } from "../context/TaskListContext";
import fetchHelper from "../../helpers/fetch-helper";
import Card from "./card";

export default function TaskList(props) {
  const { data: session } = useSession();
  const [taskLists, setTaskLists] = useState([]);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  const taskListContext = useContext(TaskListContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandler();
  }, [currentTaskListType?.currentTaskListType]);

  function fetchHandler() {
    fetchHelper(
      `/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklists`,
      "GET"
    )
      .then((data) => {
        const allTaskLists = JSON.parse(data);
        setTaskLists(allTaskLists);
        return setLoading(false);
      })
      .catch((err) => {
        console.log(err + ": error");
      });
  }

  async function addNewTaskListHandler() {
    const resultAddTaskList = await fetchHelper(
      `/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklists`,
      "POST",
      taskListNameInputValue.current.value
    );
    setTaskLists((prevTaskLists) => [
      ...prevTaskLists,
      JSON.parse(resultAddTaskList),
    ]);
    setAddTaskListToggle(false);
  }

  async function editTasklistHandler(tasklistId) {
    if (!editedTasklistName.current.value) return;
    const resultEditedTaskList = await fetchHelper(
      `/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklist/${tasklistId}/editdeletetasklist`,
      "PUT",
      { taskListName: editedTasklistName.current.value }
    );
  }
  async function deleteTasklistHandler(tasklistId) {
    const resultDeletedTaskList = await fetchHelper(
      `/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklist/${tasklistId}/editdeletetasklist`,
      "DELETE"
    );
  }

  let editedTasklistName = useRef();
  const taskListNameInputValue = useRef();
  const [addTaskListToggle, setAddTaskListToggle] = useState(false);
  const [moreFieldsToggle, setMoreFieldsToggle] = useState(false);
  const [editable, setEditable] = useState(false);

  return (
    <div className="flex flex-col gap-2 pt-4" style={{ height: "100%" }}>
      <div className="p-2">
        <button
          className="max-w-max bg-button-light p-1 px-2 rounded-lg text-center text-xs text-darktext font-semibold"
          onClick={() => {
            setAddTaskListToggle(!addTaskListToggle);
          }}
        >
          + Add New Task List
        </button>
        <div
          className={`bg-main-background-dark ${
            addTaskListToggle ? "" : "hidden"
          } rounded-lg font-semibold text-xs mt-4 pt-2`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewTaskListHandler();
            }}
          >
            <div className="flex flex-row gap-1">
              <input
                placeholder="TaskList Name"
                className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
                ref={taskListNameInputValue}
              />
              <button
                className={`flex-grow ${
                  moreFieldsToggle ? "hidden" : ""
                } bg-border-light rounded-lg text-darktext`}
              >
                Add TaskList
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setMoreFieldsToggle(!moreFieldsToggle);
                }}
              >
                <p className="text-xxs text-gray-400 p-1 py-2">
                  {moreFieldsToggle ? (
                    <span>Hide extra fields</span>
                  ) : (
                    <span>+ Add More fields</span>
                  )}
                </p>
              </div>
              <div
                className={`${
                  moreFieldsToggle ? "" : "hidden"
                } flex flex-col gap-2`}
              >
                <input
                  placeholder="Description"
                  className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
                />
                <input
                  placeholder="Important Note"
                  className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
                />
                <div className="flex flex-row gap-1 text-xs">
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
                  Add TaskList
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
          </form>
        </div>
      </div>
      <div className="px-2 py-1 flex justify-between items-center bg-accent-background-dark rounded-lg text-xs font-semibold">
        <span>Colors Significance</span>
        <span className="text-gray-500">{<FaSquare />}</span>
        <span className="text-pink-500">{<FaSquare />}</span>
        <span className="text-red-500">{<FaSquare />}</span>
        <span className="text-blue-500">{<FaSquare />}</span>
        <span className="text-green-500">{<FaSquare />}</span>
        <span>{<FaAngleDown />}</span>
      </div>

      <p className={`${loading ? "border__loading" : ""} w-full`}></p>
      <div className="scrollbarfeature overflow-y-scroll flex justify-center items-center">
        <div className=" w-full" style={{ height: "100%" }}>
          <div className="grid grid-cols-1 gap-3 p-2">
            {taskLists
              ?.map((tasklist) => {
                return (
                  <div
                    className=""
                    key={tasklist._id}
                  >
                    <div
                      className={`cursor-pointer border border-border-dark rounded-lg ${
                        tasklist._id == taskListContext?.taskList?._id
                          ? "bg-accent-background-dark"
                          : ""
                      }`}
                    >
                      <Card>
                        <div className="w-full flex flex-row justify-between items-center text-sm p-2 font-semibold">
                          <div className="w-3/5 flex gap-2 items-center" onClick={() => {
                      taskListContext.setTaskList(tasklist);
                      props.renderTaskPage();
                    }}>
                            <span
                              className={`${
                                tasklist.isActive
                                  ? "text-red-500"
                                  : "text-border-notactive"
                              }`}
                            >
                              {<FaSquare />}
                            </span>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                editTasklistHandler(tasklist._id);
                              }}
                            >
                              <input
                                className="rounded-lg p-1 bg-transparent"
                                defaultValue={tasklist.taskListName}
                                disabled
                                ref={editedTasklistName}
                                onClick={() => {
                                  if (editedTasklistName.current.disabled)
                                    return;
                                  taskListContext.setTaskList(tasklist);
                                  props.renderTaskPage();
                                }}
                                onBlur={()=>{editedTasklistName.current.disabled=true; setEditable(false)}}
                              />
                            </form>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="opacity-10 hover:opacity-70">
                              {!editable ? (
                                <FaPenSquare
                                  onClick={() => {
                                    setEditable(!editable);
                                    editedTasklistName.current.disabled = false;
                                    editedTasklistName.current.focus();
                                  }}
                                />
                              ) : (
                                <FaCheck
                                  onClick={() =>
                                    editTasklistHandler(tasklist._id)
                                  }
                                />
                              )}
                            </span>
                            <span
                              className="opacity-10 hover:opacity-70"
                              onClick={() => deleteTasklistHandler(tasklist._d)}
                            >
                              {<FaTrash />}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
