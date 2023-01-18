import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import PageMenu from "../components/shared/components/display_layout/page-menu";
import CenterLayout from "../components/shared/components/display_layout/center-layout";
import Tasks from "../components/shared/components/UIElements/tasks";
import Image from "next/image";
import selecttasklist from "../public/selecttasklistsvg.svg";
import { getSession, useSession } from "next-auth/react";
import RightPageMenu from "../components/shared/components/UIElements/rightPageMenu";
import { TaskListContext } from "../components/shared/context/TaskListContext";
import TaskList from "../components/shared/components/UIElements/taskList";
import { TaskContext } from "../components/shared/context/TaskContext";
import fetchHelper from "../helpers/fetch-helper";
import { TaskListTypeContext } from "../components/shared/context/TaskListTypeContext";
import { useRouter } from "next/router";
import { NEXT_URL } from '../config/index';

export default function MainApp(props) {

  const taskListTypeContext = useContext(TaskListTypeContext)
  
  const { data : session } = useSession();

  useEffect(()=>{
      if(session?.user)
      {
        taskListTypeContext.setAllTaskListType(props.allTaskListTypes)
      }
  },[session])

  const [rightPageMenuContent, setRightPageMenuContent] = useState();
  const [buttonDisplay, setButtonDisplay] = useState("none");
  const [centerPageData, setCenterPageData] = useState(
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Welcome, Select Task List</h2>
      <br />
      <Image src={selecttasklist} alt="Select Task List" />
    </div>
  );
  const taskListContext = useContext(TaskListContext);
  const taskContext = useContext(TaskContext);

  function updateRightPageMenuHandler () {
    setRightPageMenuContent(<></>)
  }

  function setTaskHandler() {
    return setRightPageMenuContent(
      <RightPageMenu />
      );
  }

  function showTasksHandler() {
    return setCenterPageData(
      <div>
        <Tasks
          setTaskHandler={() => {
            setTaskHandler();
          }}
        />
      </div>
    );
  }

  function renderTaskPage(tasklist) {
    taskListContext.setTaskList(tasklist);
    showTasksHandler();
  }
  


  return (
    <Layout title="Home" pageHeading="Team Tasks">
      <Head>
        <title>HOME - TODO APP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className="flex flex-row justify-center gap-2 h-screen"
        style={{ height: "91vh" }}
      >
        <TaskList renderTaskPage={renderTaskPage} />
        <div className="w-full py-4 px-1 flex justify-center items-center bg-display-layout-light rounded-lg shadow-md ">
          <div
            className="scrollbarfeature overflow-y-scroll px-4"
            style={{ height: "82vh", width: "100%" }}
          >
            <CenterLayout>
              <div className="flex flex-col">
                <div className="">
                  <span className="text-xs font-bold text-lightgray">
                    1st January 2023
                  </span>
                </div>
                <br/>
                <div className="items-center">
                  <button className="max-w-max bg-button-light p-1 px-2 rounded-lg text-xs text-center text-darktext font-semibold mb-4">
                    Add New Task
                  </button>
                  {centerPageData}
                </div>
              </div>
            </CenterLayout>
          </div>
          <br></br>
        </div>
        <div className="w-2/5 px-3  h-full bg-display-layout-light rounded-lg shadow-md pt-8">
          <PageMenu>
            <div className="">{rightPageMenuContent}</div>
          </PageMenu>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

 const data = await fetchHelper(
    `${NEXT_URL}/api/${session?.user?._id}/tasklisttypes`,
    "GET"
  )
  console.log(NEXT_URL)
    const allTaskListTypes = JSON.parse(data)

  return {
    props: {
      allTaskListTypes
    },
  };
}
