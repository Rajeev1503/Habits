import { useContext, useEffect, useReducer, useState } from "react";
import { AllTaskContext } from "../../context/AllTaskContext";
import { TaskContext } from "../../context/TaskContext";
import { TaskListContext } from "../../context/TaskListContext";
import EditTaskComponent from "./edit-TaskComponent";
import InfoTaskComponent from "./info-taskcomponent";

const TaskDetails = () => {
  const taskContext = useContext(TaskContext);

  function taskcomponentReducer(state, action){
    switch(action.type){
      case 'info':{
        setIsAtInfo(true);
        return action.payload
      }
      case 'edit': {
        setIsAtInfo(false)
        return action.payload
      }
      default : return state;
    }
  }

  const [isAtInfo, setIsAtInfo] = useState(true);
  const [taskComponentState, taskComponentDispatch] = useReducer(taskcomponentReducer,<InfoTaskComponent/>)


  return (
    <div
      className={` text-xs font-semibold mt-4 border border-border-dark rounded-lg overflow-hidden`}
    >
      <div className="flex flex-row justify-between items-center text-center bg-accent-background-dark text-lighttext font-semibold text-xs">
        <div
          className={`${
            isAtInfo ? "bg-main-background-dark" : ""
          } flex-grow p-1 cursor-pointer`}
          onClick={() => {
            taskComponentDispatch({type:'info', payload:<InfoTaskComponent/>});
          }}
        >
          Info
        </div>
        <div
          className={`${
            !isAtInfo ? "bg-main-background-dark" : ""
          } flex-grow p-1 cursor-pointer`}
          onClick={() => {
            taskComponentDispatch({type:'edit', payload:<EditTaskComponent/>});
          }}
        >
          Edit
        </div>
      </div>
      <div className={`p-2`}>
        <br />
        <br />
        {taskComponentState}
        {/* <p
          className="text-right cursor-pointer"
          onClick={() => {
          }}
        >
          Hide
        </p> */}
      </div>
    </div>
  );
};

export default TaskDetails;
