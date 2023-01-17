import { createContext } from "react";

export const AllTaskContext = createContext();

// export default function AllTaskContextProvider(props) {
//   function allTasksReducer(allTasks, action) {
//     switch (action.type) {
//       case "addtasks": {
//         console.log("called addtasks");
//         return action.payload;
//       }
//       case "updateTask": {
//         allTasks.map((task) => {
//           if (task._id === action.task._id) {
//             console.log("updated the alltask");
//             return {
//               ...task,
//               taskName: task.taskName,
//               description: task.description,
//             };
//           } else {
//             return task;
//           }
//         });
//       }

//       default:
//         return allTasks;
//     }
//   }
//   const [allTasksState, allTasksDispatch] = useReducer(allTasksReducer, [{message:"hello"}]);

//   return (
//     <AllTaskContext.Provider value={{ allTasksState, allTasksDispatch }}>
//       {props.children}
//     </AllTaskContext.Provider>
//   );
// }

// export function AllTaskState() {
//   return createContext(AllTaskContext);
// }
