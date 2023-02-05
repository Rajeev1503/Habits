import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import fetchHelper from "../../helpers/fetch-helper";
import { CurrentTaskListTypeContext } from "../context/CurrentTaskListTypeContext";
import { TaskListCategoryContext } from "../context/TaskListCategoryContext";
const TaskListCategory = (props) => {
  const taskListType = useContext(TaskListCategoryContext);
  const currentTaskListType = useContext(CurrentTaskListTypeContext);
  const { data: session } = useSession();
  

  async function addNewTaskListCategory() {
    if (!newTaskListCategory) {
      return;
    }
    const newAddedTaskListCategory = await fetchHelper(
      `/api/${session?.user?.id}/tasklistcategory`,
      "POST",
      newTaskListCategory
    );
    taskListType.setAllTaskListType((prevCategories)=>[...prevCategories, JSON.parse(newAddedTaskListCategory)]);
    setNewTaskListCategory('');
  }
  async function taskListCategoryDeleteHandler(id) {
    if (!id) {
      return;
    }
    await fetchHelper(
      `/api/${session?.user?.id}/${id}/editdeletetasklistcategory`,
      "DELETE"
    );
    taskListType.setAllTaskListType((taskListCategory) => {return taskListCategory.filter((item) =>item._id !== id);
    });
  }
  const [newTaskListCategory, setNewTaskListCategory] = useState("");


  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden h-full text-sm">
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
                className="block border border-border-dark rounded-lg px-2 py-1 "
              >
                <p className="w-full flex flex-row justify-between items-center">
                  <span
                    className="hover:scale-105 cursor-pointer w-4/5"
                    onClick={() => {
                      currentTaskListType.setCurrentTaskListType(
                        taskListCategory
                      );
                      props.renderTaskListPage();
                    }}
                  >
                    {taskListCategory.taskListCategoryName}
                  </span>
                  <span
                    className="cursor-pointer opacity-20"
                    onClick={() =>
                      taskListCategoryDeleteHandler(taskListCategory?._id)
                    }
                  >
                    x
                  </span>
                </p>
              </li>
            );
          }).reverse()}
        </ul>
      </div>
    </div>
  );
};

export default TaskListCategory;
