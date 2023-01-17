import Head from "next/head";
import React from "react";
import Footer from "../shared/components/display_layout/footer";
import LeftSideMenu from "../shared/components/display_layout/leftsidemenu";
import PageMenu from "../shared/components/display_layout/page-menu";
import Rightcard from "../shared/components/display_layout/right_card";
import Navigation from "../shared/components/Navigation/Navigation";

const Layout = (props) => {
  let pageLayout;
  if (props.title === "Signin" || props.title === "Signup") {
    pageLayout = (
      <div>
        <main>{props.children}</main>
      </div>
    );
  } else {
    pageLayout = (
      <div className="flex flex-row text-lighttext" style={{height: "90vh"}}>
        <div className="fixed left-0 top-2 bg-display-layout-light flex flex-col justify-center items-center rounded-lg shadow-md" style={{ width: "11%", height: "98vh" }}>
          <div
            className="w-full overflow-y-scroll flex flex-col justify-center" style={{height:"85vh"}}>
            <LeftSideMenu />
          </div>
        </div>

        <div className="fixed top-0 right-2" style={{ width: "88%" }}>
          <Rightcard>
            <div className="flex flex-col gap-2">
              <Navigation/>
              <main>{props.children}</main>
            </div>
          </Rightcard>
        </div>
      </div>
    );
  }

  return (
    <>
      <React.Fragment>{pageLayout}</React.Fragment>
    </>
  );
};

export default Layout;
