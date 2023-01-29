import { useContext, useEffect, useState } from "react";
import { AllTaskContext } from "../../context/AllTaskContext";
import { TaskContext } from "../../context/TaskContext";
  
  export default function InfoTaskComponent () {
    const taskContext = useContext(TaskContext);
  const allTasksContext = useContext(AllTaskContext);
    return (
  <div className="p-4">
          <div>
            <p>
              <span className="inline-block w-20">Assignee</span>{" "}
              <span className="inline-block">:</span>
            </p>
            <p>
              <span className="inline-block w-20">Assigned on</span>{" "}
              <span className="inline-block">:</span>
            </p>
            <p>
              <span className="inline-block w-20">Due Date</span>{" "}
              <span className="inline-block">:</span>
            </p>
            <p>
              <span className="inline-block w-20">Updates</span>{" "}
              <span className="inline-block">:</span>
            </p>
          </div>
          <br />
          <br />
          <div className="w-3/5">
            <p>Send Quick Message to Assignee &nbsp;: </p>
            <form
              id="tagform"
              className="flex flex-row gap-1 text-sm mb-2 font-semibold pt-2"
              onSubmit={(e) => {
                e.preventDefault();
                // addNewTagsHandler();
              }}
            >
              <input
                className="flex-grow border border-border-light rounded-lg p-1 bg-transparent text-lighttext text-xs"
                name="customtag"
                type="text"
                placeholder="Enter Message"
                onChange={(e) => {
                  // setTagsInputBoxValue(e.target.value);
                }}
              />
              <button
                className="flex-grow bg-button-light text-darktext text-xs rounded-lg"
                type="submit"
              >
                Send
              </button>
            </form>
            <p className="my-3">or</p>
            <button className="bg-lighttext text-darktext rounded-lg p-1 ">
              Open Chat Box
            </button>
          </div>
        </div> 
    )
  }