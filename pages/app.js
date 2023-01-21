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
import { NEXT_URL } from "../config/index";
import dbConnect from "../database/database";
import LeftSideMenu from "../components/shared/components/display_layout/leftsidemenu";
import Navigation from "../components/shared/components/Navigation/Navigation";

export default function MainApp(props) {
  const taskListTypeContext = useContext(TaskListTypeContext);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      taskListTypeContext.setAllTaskListType(props.allTaskListTypes);
    }
  }, [session]);

  const [rightPageMenuContent, setRightPageMenuContent] = useState();
  const [buttonDisplay, setButtonDisplay] = useState("none");
  const [centerPageData, setCenterPageData] = useState(
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Welcome, Select Task List</h2>
      <br />
      <Image src={selecttasklist} alt="Select Task List" />
    </div>
  );

    const [taskListPageData, setTaskListPageData] =useState();

  const taskListContext = useContext(TaskListContext);
  const taskContext = useContext(TaskContext);

  function updateRightPageMenuHandler() {
    setRightPageMenuContent(<></>);
  }

  function setTaskHandler() {
    return setRightPageMenuContent(<RightPageMenu />);
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
  function renderTaskListPage() {
    return setTaskListPageData(
      <TaskList renderTaskPage={renderTaskPage}/>
    )
  }

  return (
    <Layout title="Home" pageHeading="Team Tasks">
        <Head>
    <title>Taskify</title>
  </Head>
      <div
        className="flex flex-col gap-2 text-lighttext"
        style={{ height: "99vh", width: "99.2%", margin:'auto auto' }}
      >
        <div className="bg-main-background p-3 rounded-lg" style={{width:'100%',margin:'auto auto' }}>
          <Navigation />
        </div>

        <div className="flex flex-row justify-center gap-2 " style={{width:'100%'}}>
          <div
            className=" bg-main-background p-2 rounded-lg"
            style={{ height: "90.5vh", width: "12%" }}
          >
            <LeftSideMenu renderTaskListPage={renderTaskListPage}/>
          </div>
          <div className="bg-main-background p-2 rounded-lg" style={{ height: "90.5vh", width: "20%"  }}>
            {taskListPageData}
          </div>
          <div className="bg-main-background p-2 px-3 rounded-lg shadow-md" style={{ height: "90.5vh" , width: "50%" }}>
            <CenterLayout>
              <div className="flex flex-col overflow-y-scroll" style={{height:'100%'}}>
                <div className="">
                  <span className="text-xs font-bold text-lightgray">
                    1st January 2023
                  </span>
                </div>
                <br />
                <div className="items-center">
                  <button className="max-w-max bg-button-light p-1 px-2 rounded-lg text-xs text-center text-lighttext font-semibold mb-4">
                    Add New Task
                  </button>
                  {centerPageData}
                </div>
              </div>
            </CenterLayout>
          </div>

          <div
            className="px-2 h-full bg-main-background rounded-lg"
            style={{ height: "90.5vh", width: "25%"  }}
          >
            <PageMenu>
              <div className="mt-4">{rightPageMenuContent}</div>
            </PageMenu>
          </div>
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
  await dbConnect();
  const data = await fetchHelper(`${NEXT_URL}/api/userId/tasklisttypes`, "GET");
  const allTaskListTypes = JSON.parse(data);

  return {
    props: {
      allTaskListTypes,
    },
  };
}
