import { useContext, useEffect, useState } from "react";
import { AllTaskContext } from "../../context/AllTaskContext";
import { TaskContext } from "../../context/TaskContext";
import fetchHelper from "../../../helpers/fetch-helper";

const TaskListDetails = (props) => {
  const taskContext = useContext(TaskContext);
  const allTasksContext = useContext(AllTaskContext);

  const [updatedTaskName, setUpdatedTaskName] = useState(
    taskContext?.task?.taskName
  );
  const [updatedTaskDesc, setUpdatedTaskDesc] = useState(
    taskContext?.task?.description
  );

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

  const EditTaskComponent = () => {
    const [tags, setTags] = useState([
      "imp",
      "urgent",
      "active",
      "completed",
      "completed121",
      "not completed",
    ]);
    return (
      <div className="flex flex-col gap-4 items-center p-2">
        <div className="flex-grow flex flex-row flex-wrap gap-1 text-xs font-semibold text-darktext text-center px-2">
          <p className="max-w-max p-1 flex-grow flex justify-center items-center bg-lighttext rounded-lg px-2">
            Add Tags -&#62;
          </p>
          <br />
          {tags.map((tag) => {
            return (
              <span
                key={tag}
                className="max-w-max p-1 flex-grow flex justify-center items-center bg-lighttext rounded-lg cursor-pointer hover:bg-red-400 px-2"
              >
                {tag}
              </span>
            );
          })}
        </div>
        <form
          className={`flex-grow flex flex-col gap-2 font-semibold px-2 rounded-lg p-2 text-xs`}
          onSubmit={(e) => {
            e.preventDefault();
            formSubmitHandler();
          }}
        >
          <input
            className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-dark"
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
            className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-dark"
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
          <div className="w-full flex flex-row gap-2 justify-center items-center text-xs text-center text-darktext">
            <button
              type="submit"
              className=" bg-button-light p-1 rounded-lg flex-grow"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  };

  const InfoTaskComponent = () => {
    return (
      <div className="p-4">
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
    );
  };

  //   const [displayOption, setDisplayOption] = useState('info')
  const [displayOptionData, setDisplayOptionData] = useState("info");
  const [isAtInfo, setIsAtInfo] = useState(true);
  const [displayExpanded, setDisplayExpanded] = useState(false);

  function displayOptionHandler(option) {
    if (option == "info") {
      setIsAtInfo(true);
      setDisplayOptionData(<InfoTaskComponent />);
    }
    if (option == "edit") {
      setIsAtInfo(false);
      setDisplayOptionData(<EditTaskComponent />);
    }
    return;
  }

  return (
    <div
      className={`w-full mt-4 text-xs font-semibold border border-border-dark rounded-lg overflow-hidden`}
    >
      <div className="flex flex-row text-center bg-accent-background-dark text-lighttext font-semibold text-xs">
        <div
          className={`${
            isAtInfo ? "bg-main-background-dark" : ""
          } flex-grow p-1 cursor-pointer`}
          onClick={() => {
            displayOptionHandler("info");
            setDisplayExpanded(true);
          }}
        >
          Info
        </div>
        <div
          className={`${
            !isAtInfo ? "bg-main-background-dark" : ""
          } flex-grow p-1 cursor-pointer`}
          onClick={() => {
            displayOptionHandler("edit");
            setDisplayExpanded(true);
          }}
        >
          Edit
        </div>
      </div>
      <div className={`${displayExpanded ? "" : "hidden"} p-2`}>
        <br />
        <br />
        {displayOptionData}
        <p
          className="text-right cursor-pointer"
          onClick={() => {
            setDisplayExpanded(false);
          }}
        >
          Hide
        </p>
      </div>
    </div>
  );
};

export default TaskListDetails;
