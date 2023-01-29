import { useContext, useEffect, useState } from "react";
import { AllTaskContext } from "../../context/AllTaskContext";
import { TaskContext } from "../../context/TaskContext";

export default function EditTaskComponent () {
    const taskContext = useContext(TaskContext);
  const allTasksContext = useContext(AllTaskContext);
    const [updatedTaskName, setUpdatedTaskName] = useState(
        taskContext?.task?.taskName
      );
      const [updatedTaskDesc, setUpdatedTaskDesc] = useState(
        taskContext?.task?.description
      );
    
      useEffect(() => {
        // if(taskContext?.task?.taskName == undefined){
        //   return
        // }
        // if(taskContext?.task?.description == undefined){
        //   return
        // }
        setUpdatedTaskName(taskContext?.task?.taskName);
        setUpdatedTaskDesc(taskContext?.task?.description);
        console.log(taskContext?.task?.taskName)
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
      
    const [tags, setTags] = useState([
      "imp",
      "urgent",
      "active",
      "completed",
      "completed121",
      "not completed",
    ]);
    return (
        <div className="flex flex-col gap-4 items-center p-8">
  
        <div className="w-3/4 flex-grow flex flex-row flex-wrap gap-1 text-xs font-semibold text-darktext text-center px-2">
            <p className="max-w-max p-1 flex-grow flex justify-center items-center bg-lighttext rounded-lg px-2">Add Tags -&#62;</p>
            <br/>
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
      className={`w-3/4 flex-grow flex flex-col gap-2 font-semibold px-2 rounded-lg p-2 text-xs`}
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