import Link from "next/link";
import { useContext } from 'react';
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskListContext } from "../../context/TaskListContext";
import { TaskListTypeContext } from "../../context/TaskListTypeContext";
const LeftSideMenu = (props) => {

  const taskListType = useContext(TaskListTypeContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  return (
      <div className="text-lighttext">
        <div className="w-full absolute top-0  left-0 text-sm font-bold text-center flex justify-center items-center pt-2">
        <Link href="/"><h2>TODO APP</h2></Link>
      </div>
      <br />
      <br />
        <div className="p-3">
          <ul className="w-full flex flex-col gap-5 font-semibold text-sm">
            {taskListType?.allTaskListType?.map((taskListType)=>{
              return (
            <li key={taskListType.name} className="border border-light rounded-lg shadow-2xl p-2 block cursor-pointer" onClick={()=>{currentTaskListType.setCurrentTaskListType(taskListType)}}>
              {taskListType.name}
            </li>
              )
            })}  
          </ul>
        </div>
      </div>
  );
};

export default LeftSideMenu;
