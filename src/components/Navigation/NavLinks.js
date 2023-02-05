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

  function toggleColorMode() {
    console.log(backgroundColorContext.backgroundColorState.mode);
    if (backgroundColorContext.backgroundColorState.mode == "dark") {
     return backgroundColorContext.backgroundColorDispatch({ type: "light" });
    }
    if (backgroundColorContext.backgroundColorState.mode == "light") {
     return backgroundColorContext.backgroundColorDispatch({ type: "custom" });
    }
    if (backgroundColorContext.backgroundColorState.mode == "custom") {
     return backgroundColorContext.backgroundColorDispatch({ type: "dark" });
    }
  }

  return (
    <div className="w-full flex flex-row justify-between items-center font-semibold text-sm">
      <div
        className="flex justify-start items-center"
        style={{ width: "12%" }}
      >
        <Link href="/app">
          <h2 className="capitalize pl-2">{`${session?.user?.fullname}'s Workplace`}</h2>
        </Link>
      </div>
      <div
        className="border-l border-r border-border-dark text-center flex justify-start px-4"
        style={{ width: "20%" }}
      >
        {currentTaskListTypeContext?.currentTaskListType?.name}
      </div>

      <div
        className="text-center flex justify-between capitalize px-4"
        style={{ width: "43%" }}
      >
        <div>{taskListContext?.taskList?.taskListName}</div>
        <div className="flex flex-row gap-4">
        <div className={`${taskListContext?.taskList?'': 'hidden'} text-xs font-semibold border border-border-dark px-2 rounded-lg flex items-center`}><button>+ Invite Members</button></div>
          <div className="text-xs border border-border-dark rounded-lg cursor-pointer max-w-full p-1 px-2">
            <FaBell size={16} />
          </div>
        </div>
      </div>

      <div className="border-l border-border-dark" style={{ width: "25%" }}>
        <ul className="w-full flex flex-row justify-end items-center gap-2">
          <li
            className="text-xs flex gap-1 items-center border border-border-dark rounded-lg max-w-max p-1 cursor-pointer"
            onClick={toggleColorMode}
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
