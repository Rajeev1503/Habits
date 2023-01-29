import Link from "next/link";
import { useContext, useState } from 'react';
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import { TaskListCategoryContext } from "../context/TaskListCategoryContext";
const TaskListCategory = (props) => {

  const taskListType = useContext(TaskListCategoryContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);

  const [loading, setLoading] = useState(false);

  return (
    <div  className="w-full flex flex-col justify-center items-center overflow-y-auto h-full text-sm">
          <button className="w-full bg-button-light p-1 rounded-lg text-xs text-center text-darktext font-semibold">
                    + Add Category
          </button>
          <br/>
        <div className="w-full">
          <ul className="w-full flex flex-col gap-5 font-semibold text-sm">
            {taskListType?.allTaskListType?.map((taskListType)=>{
              return (
            <li key={taskListType.name} className="block border border-border-dark rounded-lg p-2 cursor-pointer" onClick={()=>{currentTaskListType.setCurrentTaskListType(taskListType); props.renderTaskListPage()}}>
              <p className="hover:scale-105">{taskListType.name}</p>
            </li>
              )
            })}
          </ul>
          
        </div>
      </div>
  );
};

export default TaskListCategory;
