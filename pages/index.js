import SignIn from "./signin";
import SignUp from "./signup";

export default function Home() {
return (<>
<div className="flex flex-row justify-center mt-8" style={{height:'100vh'}}>
    <SignIn />
</div>
</>
)
}