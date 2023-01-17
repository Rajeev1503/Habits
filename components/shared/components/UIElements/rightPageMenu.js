import { useContext, useEffect, useState } from "react";
import fetchHelper from "../../../../helpers/fetch-helper";
import { AllTaskContext } from "../../context/AllTaskContext";
import { TaskContext } from "../../context/TaskContext";
import { FaAngleDown } from "react-icons/fa";

const RightPageMenu = (props) => {
  const taskContext = useContext(TaskContext);
  const allTasksContext = useContext(AllTaskContext);

  const [updatedTaskName, setUpdatedTaskName] = useState(
    taskContext?.task?.taskName
  );
  const [updatedTaskDesc, setUpdatedTaskDesc] = useState(
    taskContext?.task?.description
  );
  const [tagsInputBoxValue, setTagsInputBoxValue] = useState();
  const [tags, setTags] = useState([
    "imp",
    "urgent",
    "active",
    "completed",
    "not completed",
  ]);

  useEffect(() => {
    setUpdatedTaskName(taskContext?.task?.taskName);
    setUpdatedTaskDesc(taskContext?.task?.description);
  }, [taskContext.task]);

  async function formSubmitHandler() {
    taskContext.setTask((oldTask) => ({
      ...oldTask,
      taskName: updatedTaskName,
      description: updatedTaskDesc,
    }));

    //updating data in alltaskcontext
    allTasksContext.allTasksDispatch({
      type: "updateTask",
      payload: {
        id: taskContext.task._id,
        taskName: updatedTaskName,
        description: updatedTaskDesc,
      },
    });
    console.log(allTasksContext.allTasksState);

    //updating data in database
    let bodyData = {
      taskName: updatedTaskName,
      description: updatedTaskDesc,
    };
    await fetchHelper(`/api/task/${taskContext.task._id}`, "PUT", bodyData)
      .then((data) => {
        return;
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  function addNewTagsHandler() {
    if (!tagsInputBoxValue) {
      return;
    }
    setTags((prevTags) => [...prevTags, tagsInputBoxValue]);
    document.getElementById("tagform").elements.namedItem("customtag").value =
      "";
  }

  const [editDisplayHandler, setEditDisplayHandler] = useState("hidden");

  return (
    <div>
      <h1 className="font-semibold capitalize text-center">{taskContext?.task?.taskName}</h1>
      <div className="flex flex-col mt-8">
        <form
          id="tagform"
          className="flex flex-row gap-1 text-sm mb-2 font-semibold bg-card-dark px-2 rounded-lg p-2"
          onSubmit={(e) => {
            e.preventDefault();
            addNewTagsHandler();
          }}
        >
          <input
            className="flex-grow border border-border-light rounded-lg p-1 bg-transparent text-lighttext text-xs"
            name="customtag"
            type="text"
            placeholder="Enter Custom Tag"
            onChange={(e) => {
              setTagsInputBoxValue(e.target.value);
            }}
          />
          <button
            className="flex-grow bg-button-light text-darktext text-xs rounded-lg"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="flex flex-row text-xs font-semibold gap-1 flex-wrap text-darktext text-center bg-card-dark px-2 rounded-lg p-2">
          {tags.map((tag) => {
            return (
              <span
                key={tag}
                className="max-w-max flex-grow p-1 bg-lighttext rounded-lg cursor-pointer hover:bg-red-400 px-2"
                onClick={() => {
                  // props.addTagHandler(tag);
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <div
        className="w-full cursor-pointer bg-card-dark p-1 px-2 rounded-lg font-semibold text-sm flex flex-row justify-between items-center gap-3 mb-2"
        onClick={() => {
          editDisplayHandler
            ? setEditDisplayHandler("")
            : setEditDisplayHandler("hidden");
        }}
      >
       <span>Edit Task</span>  <span><FaAngleDown /></span>
      </div>
      <form
        className={`flex flex-col gap-2 font-semibold bg-card-dark px-2 rounded-lg p-2 ${editDisplayHandler}`}
        onSubmit={(e) => {
          e.preventDefault();
          formSubmitHandler();
        }}
      >
        <input
          className="border border-border-light rounded-lg shadow-2xl p-1 bg-transparent"
          id="taskname"
          type="text"
          placeholder="Task Name"
          lable="Task Name"
          onChange={(e) => {
            setUpdatedTaskName(e.target.value);
          }}
          value={updatedTaskName}
        />
        <input
          className="border border-border-light rounded-lg shadow-2xl p-1 bg-transparent"
          id="taskdescription"
          element="input"
          type="text"
          placeholder="Task Description"
          lable="Task Description"
          onChange={(e) => {
            setUpdatedTaskDesc(e.target.value);
          }}
          value={updatedTaskDesc}
        />
        <div className="w-full flex flex-row gap-2 justify-center items-center text-sm text-center text-darktext">
          <button
            type="submit"
            className=" bg-button-light p-1 rounded-lg flex-grow"
          >
            Update
          </button>
          <button
            className="bg-button-light p-1 rounded-lg flex-grow"
            onClick={() => {
              setEditDisplayHandler("hidden");
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightPageMenu;
