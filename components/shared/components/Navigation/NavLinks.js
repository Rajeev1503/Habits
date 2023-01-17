import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { FaBell } from "react-icons/fa";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
const NavLinks = (props) => {

  const {status, data: session } = useSession();
  const currentTaskListTypeContext = useContext(CurrentTaskListTypeContext);
  return (
    <div className="w-full flex flex-row justify-around items-center">
      <div className="w-1/4 text-center">
      {currentTaskListTypeContext?.currentTaskListType?.name}
      </div>
      
      <div className="w-1/4">
        <ul className="flex flex-row justify-center items-center gap-6 text-center">
          <li>
            <Link href="/signin"><FaBell /></Link>
          </li>
          <li>{session?.user.fullName}</li>
          <li>
            {status === 'loading' ? 'loading' : session?.user ? <button onClick={()=>signOut()}>SignOut</button> : (<Link href="/signin">Signin</Link>)}
            
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavLinks;
