import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import fetchHelper from "../../helpers/fetch-helper";
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import { TaskListCategoryContext } from "../context/TaskListCategoryContext";
const TaskListCategory = (props) => {
  const taskListType = useContext(TaskListCategoryContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  const {data: session} = useSession();
  function addNewTaskListCategory() {
    if (!newTaskListCategory) {
      return;
    }
    fetchHelper(`/api/${session?.user?.id}/addtasklistcategory`, 'POST', newTaskListCategory)
    taskListType.setAllTaskListType((prevTags) => [...prevTags, {taskListCategoryName: newTaskListCategory}]);
    setNewTaskListCategory('');
  }
  const [newTaskListCategory, setNewTaskListCategory] = useState();

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-full text-sm">
      <div className="w-full text-xs font-semibold text-darktext text-center pb-4">
        <form
          id="tagform"
          className="text-sm font-semibold rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            addNewTaskListCategory();
          }}
        >
          <input
            className="border border-border-light rounded-lg p-1 bg-transparent text-lighttext text-xs"
            name="category"
            type="text"
            placeholder="Add New Category"
            onChange={(e) => {
              setNewTaskListCategory(e.target.value);
            }}
            value={newTaskListCategory}
          />
        </form>
      </div>
      <div className="w-full">
        <ul className="w-full flex flex-col gap-5 font-semibold text-sm">
          {taskListType?.allTaskListType?.map((taskListCategory) => {
            return (
              <li
                key={taskListCategory._id}
                className="block border border-border-dark rounded-lg px-2 py-1 cursor-pointer"
                onClick={() => {
                  currentTaskListType.setCurrentTaskListType();
                  props.renderTaskListPage();
                }}
              >
                <p className="hover:scale-105">{taskListCategory.taskListCategoryName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TaskListCategory;
