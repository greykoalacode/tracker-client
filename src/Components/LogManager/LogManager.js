import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { api, checkLogin } from "../../http/ApiService";
import Modal from "../Modal/Modal";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import NoExerciseSVG from "../../Assets/NoExerciseSVG";
import moment from "moment";
import RoutineCard from "../RoutineCard/RoutineCard";

function LogManager() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const user = useStoreState((state) => state.user);
  const setUserState = useStoreActions((actions) => actions.setUserState);
  const log = user.logs.find((each) => each._id === id); 

  const deleteLog = () => {
    async function deleteCall() {
      let result = await api.delete(`/logs/${id}`);
      if (result.status === 200) {
        history.push("/dashboard");
        setUserState({ ...user, logs: [...result.data] });
      } else if (result.status === 401 || result.status === 403) {
        history.push("/login");
      }
    }

    deleteCall();
  };
  useEffect(() => {
    async function checkStatus() {
      let result = await checkLogin();
      if (result.status === 401) {
        history.push("/login");
      }
    }
    checkStatus();
  }, [history]);
  return (
    <div className="p-3 px-4 page">
      <div>
        <div className="d-flex justify-content-between">
          <h1>{moment(log.date).format("DD MMMM YYYY")}</h1>
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#modal-add-${id.slice(id.length - 5)}`}
              className="btn fab-btn rounded-circle btn-lg fs-2 py-1"
            >
              +
            </button>
            <Modal
              id={`modal-add-${id.slice(id.length - 5)}`}
              title="Add Exercise to your Log"
              content="Add Exercise"
              contentClass="regbtn"
              isForm
            >
              <ExerciseForm
                workoutIndex={log.workouts.length}
                identifier="log"
                logDate={log.date}
              />
            </Modal>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#modal${id.slice(id.length - 5)}`}
              className="btn delbtn"
            >
              Delete Log
            </button>
            <Modal
              id={`modal${id.slice(id.length - 5)}`}
              title="Delete Log"
              onClick={deleteLog}
              content="Delete Log"
              contentClass="btn-danger"
            >
              <p>Are you sure you want to delete the Log</p>
            </Modal>
          </div>
        </div>
        <h3>Exercises</h3>
        <div>
          <RoutineCard />
        </div>
        <div className="container">
          <div className="row gap-3 align-items-start my-3">
            {log.workouts.length > 0 ? (
              log.workouts.map((eachExercise, i) => (
                <ExerciseCard
                  id={id}
                  index={i}
                  workout={eachExercise}
                  key={eachExercise._id}
                  identifier="log"
                  logDate={log.date}
                  // deleteExercise={() => deleteExercise(eachExercise._id)}
                />
              ))
            ) : (
              <div className="text-center">
                <p className="fs-3 my-2 banner-sad">No Exercises Yet 😔</p>
                <div className="mx-auto" style={{width: "30vw"}}>
                  <NoExerciseSVG />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogManager;
