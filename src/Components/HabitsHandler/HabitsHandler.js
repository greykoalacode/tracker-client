import { useStoreState } from "easy-peasy";
import React from "react";
import { Link } from "react-router-dom";
import { progressCounter, streakCounter } from "../../utils/habitFunctions";
import Card from "../Card/Card";
import NoDashComponent from "../NoDashComponent/NoDashComponent";

const HabitsHandler = ({ props }) => {;
  const user = useStoreState((state) => state.user);

  return (
    <Card title="Habits" props={props}>
      <div>
        {user.habits.length > 0 ? (
          <div className="my-2">
            {user.habits.map((each) => (
              <Link
                to={`/habits/${each._id}`}
                className="text-decoration-none cardLink w-100"
                key={each._id}
              >
                <div className="eachCard shadow">
                  <h4 className="fw-bold m-0">{each.name}</h4>
                  <p className="my-1">{each.description}</p>
                  <div className="my-2">
                    <p className="m-0">
                      Streak:{" "}
                      <strong>
                        {streakCounter(each.progress).toFixed(0)}*
                      </strong>
                    </p>
                  </div>
                  <div className="">
                    <p className="fs-6 m-0 my-1">
                      <strong>{`Total Progress: ${(
                        progressCounter(each.progress) * 100
                      ).toFixed(1)}%`}</strong>
                    </p>
                    <div
                      className="progress"
                      style={{ height: "8px", backgroundColor: "#36454f" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={progressCounter(each.progress) * 100}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          width: `${progressCounter(each.progress) * 100}%`,
                          backgroundColor: "#CCAFA5",
                        }}
                      />
                    </div>

                  </div>
                </div>
                
              </Link>
            ))}
          </div>
        ) : (
          <NoDashComponent content="Habits" />
        )}
      </div>
      <Link to="/habits" className="btn regbtn align-self-start">
        View Habits
      </Link>
    </Card>
  );
};

export default HabitsHandler;
