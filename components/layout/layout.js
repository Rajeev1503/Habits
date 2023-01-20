import Head from "next/head";
import React from "react";
import Footer from "../shared/components/display_layout/footer";
import LeftSideMenu from "../shared/components/display_layout/leftsidemenu";
import PageMenu from "../shared/components/display_layout/page-menu";
import Rightcard from "../shared/components/display_layout/right_card";
import Navigation from "../shared/components/Navigation/Navigation";

const Layout = (props) => {
  return (
      
          <div style={{height:'99vh'}}>
            <main>{props.children}</main>
            </div>
  );
};

export default Layout;
