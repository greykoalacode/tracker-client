import { useStoreState } from "easy-peasy";
import React from "react";
import EntryBanner from "../EntryBanner/EntryBanner";
import HabitsHandler from "../HabitsHandler/HabitsHandler";
import RoutinesHandler from "../RoutinesHandler/RoutinesHandler";
import LogsHandler from "../LogsHandler/LogsHandler";
import TasksHandler from "../TasksHandler/TasksHandler";

const Dashboard = () => {
  
  const { user } = useStoreState((state) => ({isLoggedIn: state.isLoggedIn, user: state.user}));

  return (
    <div className="page">
      <h1 className="fw-bold">Hello {user.name}</h1>
      <EntryBanner />
      <div className="container">
        <div className="row gap-2">
          <HabitsHandler props="col col-md-4 align-self-start" />
          <LogsHandler props="col col-md-7 align-self-start" />
          <TasksHandler props="col col-md-4 align-self-start" />
          <RoutinesHandler props="col col-md-7 align-self-start" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
