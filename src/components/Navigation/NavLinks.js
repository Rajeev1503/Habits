import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { FaBell, FaMoon } from "react-icons/fa";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskListContext } from "../../context/TaskListContext";
const NavLinks = (props) => {
  const { status, data: session } = useSession();
  const currentTaskListTypeContext = useContext(CurrentTaskListTypeContext);
  const taskListContext = useContext(TaskListContext);

  return (
    <div className="w-full flex flex-row justify-between items-center font-semibold text-sm">
      <div className="w-1/6 text-center flex justify-start pl-8 items-center pt-2">
        <Link href="/">
          <h2>TODO APP</h2>
        </Link>
      </div>
      <div className="w-1/5 text-center flex justify-start">
        {currentTaskListTypeContext?.currentTaskListType?.name}
      </div>

      <div className="w-1/5 text-center flex justify-start capitalize">
        {taskListContext?.taskList?.taskListName}
      </div>

      <div className="w-1/5">
        <ul className="flex flex-row justify-center items-center gap-2 text-center">
          <li className="text-xs border border-border-dark rounded-lg cursor-pointer max-w-full p-1 px-2">
            <Link href="#">
              <FaBell size={16}/>
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-1/5">
        <ul className="flex flex-row justify-center items-center gap-2 text-center">
         
          <li className="text-xs flex gap-1 items-center border border-border-dark rounded-lg max-w-max p-1 cursor-pointer" onClick={()=>{props.setToggleDarkMode(!props.toggleDarkMode)}}>
            <p><span>Dark Mode : </span><span className={`${props.toggleDarkMode? 'text-green-400': 'text-red-400'}`}>{props.toggleDarkMode? 'ON': 'OFF'}</span></p>
          </li>
           <li className="text-xs border border-border-dark rounded-lg cursor-pointer max-w-max p-1 px-2">
            {status === "loading" ? (
              "loading"
            ) : session?.user ? (
              <button onClick={() => signOut()}>SignOut</button>
            ) : (
              <Link href="/signin">Signin</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavLinks;
