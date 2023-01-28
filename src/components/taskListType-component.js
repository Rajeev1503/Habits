import Link from "next/link";
import { useContext } from 'react';
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import { TaskListTypeContext } from "../context/TaskListTypeContext";
const LeftSideMenu = (props) => {

  const taskListType = useContext(TaskListTypeContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  return (
    <div  className="flex flex-col justify-center items-center overflow-y-auto h-full pt-8 text-sm">
        <div className="w-full">
          <ul className="w-full flex flex-col gap-5 font-semibold text-sm">
            {taskListType?.allTaskListType?.map((taskListType)=>{
              return (
            <li key={taskListType.name} className="block border border-border-dark rounded-lg p-2 cursor-pointer" onClick={()=>{currentTaskListType.setCurrentTaskListType(taskListType); props.renderTaskListPage()}}>
              <p className="hover:scale-105">{taskListType.name}</p>
            </li>
              )
            })}  
            <button className="bg-button-light p-2 rounded-lg text-xs text-center text-darktext font-semibold">
                    Add Category
          </button>
          </ul>
          
        </div>
      </div>
  );
};

export default LeftSideMenu;
