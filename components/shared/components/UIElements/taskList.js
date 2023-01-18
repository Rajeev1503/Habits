import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import fetchHelper from "../../../../helpers/fetch-helper";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskListContext } from "../../context/TaskListContext";
import PageMenu from "../display_layout/page-menu";
import Card from "./card";

export default function TaskList(props) {
  const [taskLists, setTaskLists] = useState([]);
  const { data: session } = useSession();
  const currentTaskListType = useContext(CurrentTaskListTypeContext);

  useEffect(() => {
    if(!session) {

      fetchHandler();
    }
  }, [currentTaskListType?.currentTaskListType]);

  function fetchHandler() {
    fetchHelper(
      `http://localhost:3000/api/userId/tasklists`,
      "GET"
    )
      .then((data) => {
        const allTaskLists = JSON.parse(data);
        return setTaskLists(allTaskLists);
      })
      .catch((err) => {
        console.log(err + ": error");
      });
  }


//   function taskListContextHandler(tasklistId) {
//     taskListContext.setTaskListId(tasklistId);
//   }

  return (
    <div className="w-2/5 p-2 h-full pt-8 text-sm bg-display-layout-light rounded-lg shadow-md">
      <PageMenu>
        <button className="max-w-max bg-button-light p-1 px-2 rounded-lg text-center text-xs text-darktext font-semibold">
          + Add New Task List
        </button>
        <div className="w-full flex justify-center items-center mt-6">
          <div className="scrollbarfeature w-full overflow-y-scroll" style={{ height: "75vh" }}>
            <div className="grid grid-cols-1 gap-5 p-2">
              {taskLists.map((tasklist) => {
                return (
                  <div className="cursor-pointer border border-border-dark rounded-lg" key={tasklist._id} onClick={()=>{props.renderTaskPage(tasklist)}}>
                    <div className="">
                      <Card>
                        <div className=" w-full flex flex-row flex-wrap gap-2 text-xs text-darktext font-semibold">
                          <span className={`${tasklist.isActive ? 'bg-border-active' : 'bg-border-notactive'} text-white rounded-lg px-1 py-0.5 text-center `}>
                            {tasklist.isActive ? (
                              <span className="">Active</span>
                            ) : (
                              <span className="bg-border-notactive">Completed</span>
                            )}
                          </span>
                          <span className="bg-border-light rounded-lg px-1 py-0.5 text-center">
                            imp
                          </span>
                          <span className="bg-border-light rounded-lg px-1 py-0.5 text-center">
                            urgent
                          </span>
                        </div>
                        <div className="w-full p-1 text-base font-semibold">
                          <p>{tasklist.taskListName}</p>
                          <p className="px-1 text-xs font-semibold text-sub-text-dark mt-3 text-center">
                            <span>Total Tasks: {tasklist.tasks.length}</span>  &nbsp;
                            <span>Completed: {tasklist.tasks.length}</span>
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />  
          </div>
        </div>
      </PageMenu>
    </div>
  );
}


