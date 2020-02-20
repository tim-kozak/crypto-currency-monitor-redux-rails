import React from 'react';
import s from "./App.module.scss";
import {Header} from "../Header/Header";
import {Sidebar} from "../Sidebar/Sidebar";
import MonitorContainer from "../Monitor/MonitorContainer";
import {PortfolioDetailsContainer} from "../PortfolioDetails/PortfolioDetailsContainer";

export const App = (props) => {
    return (
      <div className={s.layout_wrapper}>
          <Header/>
          <MonitorContainer />
          <div className={s.content_wrapper}>
              <Sidebar />
              <PortfolioDetailsContainer />
          </div>
      </div>
    );
};
