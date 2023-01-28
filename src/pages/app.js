import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Layout from "../layout/layout";
import Tasks from "../components/tasks";
import Image from "next/image";
import selecttasklist from "../../public/selecttasklist2.svg";
import { getSession, useSession } from "next-auth/react";
import RightPageMenu from "../components/rightPageMenu";
import { TaskListContext } from "../context/TaskListContext";
import TaskList from "../components/taskList";
import { TaskContext } from "../context/TaskContext";
import fetchHelper from "../../helpers/fetch-helper";
import { TaskListTypeContext } from "../context/TaskListTypeContext";
import { NEXT_URL } from "../../config/index";
import dbConnect from "../../database/database";
import LeftSideMenu from "../components/leftsidemenu";
import Navigation from "../components/Navigation/Navigation";

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
      <h2 className="text-xl font-semibold">Welcome to TaskifyApp</h2>
      <br />
      <Image src={selecttasklist} alt="Select Task List" />
    </div>
  );

    const [taskListPageData, setTaskListPageData] =useState();

  const taskListContext = useContext(TaskListContext);
  const taskContext = useContext(TaskContext);

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

  const [toggleDarkMode, setToggleDarkMode] = useState(true)

  return (
    <Layout title="Home" pageHeading="Team Tasks">
        <Head>
    <title>TaskifyApp</title>
  </Head>
  <div className={`${toggleDarkMode?'bg-accent-background-dark text-lighttext': 'bg-accent-background-light text-darktext'}`} style={{height:'100vh'}}>
      <div
        className="flex flex-col fixed top-0 right-1.5"
        style={{ height: "99vh", width: "99.2%", margin:'auto auto' }}
      >
        <div className={`${toggleDarkMode?'bg-main-background-dark': 'bg-main-background-light'} p-2 rounded-lg`} style={{width:'100%',margin:'auto auto' }}>
          <Navigation setToggleDarkMode={setToggleDarkMode} toggleDarkMode={toggleDarkMode}/>
        </div>

        <div className="flex flex-row justify-center gap-2 " style={{width:'100%'}}>
          <div
            className={`${toggleDarkMode?'bg-main-background-dark': 'bg-main-background-light'} p-2 rounded-lg`}
            style={{ height: "90.5vh", width: "12%" }}
          >
            <LeftSideMenu renderTaskListPage={renderTaskListPage}/>
          </div>
          <div className={`${toggleDarkMode?'bg-main-background-dark': 'bg-main-background-light'} p-2 rounded-lg`} style={{ height: "90.5vh", width: "20%"  }}>
            {taskListPageData}
          </div>
          <div className={`${toggleDarkMode?'bg-main-background-dark': 'bg-main-background-light'} p-2 rounded-lg`} style={{ height: "90.5vh" , width: "50%" }}>
{/* center page data */}
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
          </div>

          <div
            className={`${toggleDarkMode?'bg-main-background-dark': 'bg-main-background-light'} p-2 rounded-lg`}
            style={{ height: "90.5vh", width: "25%"  }}
          >
              <div className="mt-4">{rightPageMenuContent}</div>
          </div>
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
