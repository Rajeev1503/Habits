import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { FaBell, FaMoon } from "react-icons/fa";
import { BackgroundColorContext } from "../../context/backgroundColorContext";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskListContext } from "../../context/TaskListContext";
const NavLinks = (props) => {
  const { status, data: session } = useSession();
  const currentTaskListTypeContext = useContext(CurrentTaskListTypeContext);
  const taskListContext = useContext(TaskListContext);
  const backgroundColorContext = useContext(BackgroundColorContext);
  return (
    <div className="w-full flex flex-row justify-between items-center font-semibold text-sm">
      <div
        className="text-center flex justify-start pl-8 items-center pt-2"
        style={{ width: "12%" }}
      >
        <Link href="/">
          <h2>TODO APP</h2>
        </Link>
      </div>
      <div className="border-l border-border-dark text-center flex justify-start px-4" style={{ width: "20%" }}>
        {currentTaskListTypeContext?.currentTaskListType?.name}
      </div>

      <div
        className="border-l border-r border-border-dark text-center flex justify-between capitalize px-4"
        style={{ width: "43%" }}
      >
        <div>{taskListContext?.taskList?.taskListName}</div>
        <div>
          <div className="text-xs border border-border-dark rounded-lg cursor-pointer max-w-full p-1 px-2">
            <FaBell size={16} />
          </div>
        </div>
      </div>

      <div className="" style={{ width: "25%" }}>
        <ul className="w-full flex flex-row justify-end items-center gap-2">
          <li
            className="text-xs flex gap-1 items-center border border-border-dark rounded-lg max-w-max p-1 cursor-pointer"
            onClick={() => {
              backgroundColorContext.backgroundColorDispatch({ type: "LIGHT" });
            }}
          >
            <p>
              <span>Color Mode : </span>
              <span
                className={`${
                  backgroundColorContext.backgroundColorState.mode === "dark"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {backgroundColorContext.backgroundColorState.mode}
              </span>
            </p>
          </li>
          <li
            className="text-xs flex gap-1 items-center border border-border-dark rounded-lg max-w-max p-1 cursor-pointer"
            onClick={() => {
              backgroundColorContext.backgroundColorDispatch({ type: "LIGHT" });
            }}
          >
            <p>
              <span>Custom Color Picker </span>
              <span></span>
            </p>
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
