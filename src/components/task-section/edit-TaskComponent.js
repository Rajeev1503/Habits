import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import fetchHelper from "../../../helpers/fetch-helper";
import { AllTaskContext } from "../../context/AllTaskContext";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskContext } from "../../context/TaskContext";
import { TaskListContext } from "../../context/TaskListContext";

export default function EditTaskComponent () {
    const taskContext = useContext(TaskContext);
  const allTasksContext = useContext(AllTaskContext);
  const { data: session } = useSession();
  const taskListContext = useContext(TaskListContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
    
 
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
          },
        });
    
        //updating data in database
        let bodyData = {
          taskName: updatedTaskName
        };
        await fetchHelper(`/api/${session?.user?.id}/${currentTaskListType?.currentTaskListType?._id}/tasklist/${taskListContext?.taskList?._id}/${taskContext?.task?._id}/modifytask`, "PUT", bodyData)
          .then((data) => {
            return console.log(JSON.parse(data));
          })
          .catch((err) => {
            return console.log(err);
          });
      }
      const [tagsInputBoxValue, setTagsInputBoxValue] = useState();
    const [tags, setTags] = useState([
      "imp",
      "urgent",
      "active",
      "completed",
      "completed121",
      "not completed",
    ]);

    function addNewTagsHandler() {
      if (!tagsInputBoxValue) {
        return;
      }
      setTags((prevTags) => [...prevTags, tagsInputBoxValue]);
      document.getElementById("tagform").elements.namedItem("customtag").value =
        "";
    }


    return (
        <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-2/3 flex flex-col gap-1 text-xs font-semibold text-darktext text-center px-2">
        <form
          id="tagform"
          className="flex flex-row gap-1 text-sm font-semibold rounded-lg py-2"
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
            <div className="flex flex-row flex-wrap gap-2">
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
        </div>
    <form
      className={`w-2/3 flex-grow flex flex-col gap-2 font-semibold px-2 rounded-lg p-2 text-xs`}
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
      <textarea
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
    )
  };