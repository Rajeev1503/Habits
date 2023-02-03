import Head from "next/head";
import { useContext, useEffect, useReducer, useState } from "react";
import Layout from "../layout/layout";
import Tasks from "../components/tasks-component";
import Image from "next/image";
import selecttasklist from "../../public/selecttasklist2.svg";
import { getSession, useSession } from "next-auth/react";
import RightPageMenu from "../components/chatBox-component";
import { TaskListContext } from "../context/TaskListContext";
import TaskList from "../components/taskList-component";
import { TaskContext } from "../context/TaskContext";
import fetchHelper from "../../helpers/fetch-helper";
import { TaskListCategoryContext } from "../context/TaskListCategoryContext";
import { NEXT_URL } from "../../config/index";
import dbConnect from "../../database/database";
import TaskListCategory from "../components/taskListCategory-component";
import Navigation from "../components/Navigation/Navigation";
import { BackgroundColorContext } from "../context/backgroundColorContext";

export default function MainApp(props) {
  const taskListCategoryContext = useContext(TaskListCategoryContext);
  const taskListContext = useContext(TaskListContext);
  const backgroundColorContext = useContext(BackgroundColorContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      taskListCategoryContext.setAllTaskListType(props.allTaskListCategory);
    }
  }, [session]);

  const [rightPageMenuContent, setRightPageMenuContent] = useState();
  const [centerPageData, setCenterPageData] = useState(
    <div className="mt-8">
      <h2 className="text-xl font-semibold pb-4">Welcome to TaskifyApp</h2>
      <Image src={selecttasklist} alt="Select Task List" />
    </div>
  );

    const [taskListPageData, setTaskListPageData] =useState();



  function setTaskHandler() {
    return setRightPageMenuContent(<RightPageMenu />);
  }

  function showTasksHandler() {
    return setCenterPageData(
        <Tasks setTaskHandler={() => {setTaskHandler();}}/>
    );
  }

  function renderTaskPage(tasklist) {
    taskListContext.setTaskList(tasklist);
    showTasksHandler();
  }


  function renderTaskListPage() {
    return setTaskListPageData(<TaskList renderTaskPage={renderTaskPage}/>)
  }

  const toggleDarkMode = true;
  const colorPalate = {
    background : backgroundColorContext.backgroundColorState.background,
    foreground : backgroundColorContext.backgroundColorState.foreground,
    border: backgroundColorContext.backgroundColorState.border,
    text: backgroundColorContext.backgroundColorState.text,
    button : backgroundColorContext.backgroundColorState.button,
  }

  return (
    <Layout title="Home" pageHeading="Team Tasks">
        <Head>
    <title>TaskifyApp</title>
  </Head>
  <div className={`${colorPalate.background} ${colorPalate.text}`} style={{height:'100vh'}}>
      <div
        className="flex flex-col gap-1"
        style={{ height: "99vh", width: "99.2%", margin:'auto auto' }}
      >
        {/* Navigation section */}
        <div className={`${colorPalate.foreground} p-2 rounded-lg`} style={{width:'100%',margin:'auto auto' }}>
          <Navigation/>
        </div>
        {/* Navigation section */}

        <div className="flex flex-row justify-center gap-2 " style={{width:'100%'}}>

          {/* Leftside section */}
          <div
            className={`${colorPalate.foreground} p-4 rounded-lg`}
            style={{ height: "92vh", width: "12%" }}
            >
            <TaskListCategory renderTaskListPage={renderTaskListPage}/>
          </div>
          {/* Leftside section */}

          {/* tasklist section */}
          <div className={`${colorPalate.foreground} p-4 rounded-lg`} style={{ height: "92vh", width: "20%"  }}>
            {taskListPageData}
          </div>
          {/* tasklist section */}

          {/* center page data */}
          <div className={`${colorPalate.foreground} p-4 rounded-lg`} style={{ height: "92vh" , width: "43%" }}>
            {centerPageData}
          </div>
          {/* center page data */}

          {/* Right Page Menu */}
          <div
            className={`${colorPalate.foreground} flex flex-row justify-center items-center p-2 rounded-lg`}
            style={{ height: "92vh", width: "25%"  }}
          >
              <div className="mt-4 "><p>Chat System!!!</p></div>
          </div>
          {/* Right Page Menu */}


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
  const allTaskListCategory= JSON.parse(data);

  return {
    props: {
      allTaskListCategory,
    },
  };
}
