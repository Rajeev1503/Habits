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
  const [displayExpanded, setDisplayExpanded] = useState(false);

  return (
    <div
      className={` text-xs font-semibold mt-4 bg-[#151515] rounded-lg overflow-hidden`}
    >
      <div className="flex flex-row justify-between items-center text-center bg-main-background-dark text-lighttext font-semibold text-xs">
        <div
          className={`${
            isAtInfo ? "bg-[#151515]" : ""
          } flex-grow p-1 cursor-pointer border border-[#151515]`}
          onClick={() => {
            taskComponentDispatch({type:'info', payload:<InfoTaskComponent/>});
            setDisplayExpanded(true);
          }}
        >
          Info
        </div>
        <div
          className={`${
            !isAtInfo ? "bg-[#151515]" : ""
          } flex-grow p-1 cursor-pointer border border-[#151515]`}
          onClick={() => {
            taskComponentDispatch({type:'edit', payload:<EditTaskComponent/>});
            setDisplayExpanded(true);
          }}
        >
          Edit
        </div>
      </div>
      <div className={`${displayExpanded ? "" : "hidden"} p-2`}>
        <br />
        {taskComponentState}
      </div>
    </div>
  );
};

export default TaskDetails;
