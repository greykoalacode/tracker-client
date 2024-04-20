import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../http/ApiService";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import Modal from "../Modal/Modal";

function ExerciseCard({
  workout,
  index,
  identifier="",
  scheduleDate = null,
}) {
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const user = useStoreState((state) => state.user);
  const { setLogs, setRoutines } = useStoreActions((actions) => ({
    setRoutines: actions.setRoutines,
    setLogs: actions.setLogs,
  }));

  const deleteExercise = () => {
    async function filterAndUpdate() {
      if (identifier === "routine") {
        const routine = user.routines.find((each) => each._id === id);
        let filteredWorkouts = routine.workouts.filter(
          (eachWork) => eachWork._id !== workout._id
        );
        let newRoutineObj = {
          ...routine,
          filter: true,
          workouts: filteredWorkouts,
        };
        let result = await api.put(`/routines/${id}`, newRoutineObj);
        if (result.status === 200) {
          setRoutines(result.data);
        } else if (result.status === 401) {
          history.push("/login");
        }
      } else {
        const log = user.logs.find((each) => each._id === id);
        let filteredWorkouts = log.workouts.filter(
          (eachWork) => eachWork._id !== workout._id
        );
        let newScheduleObj = {
          ...log,
          filter: true,
          workouts: filteredWorkouts,
        };
        let result = await api.put(`/logs/${id}`, newScheduleObj);
        if (result.status === 200) {
          setLogs(result.data);
        } else if (result.status === 401) {
          history.push("/login");
        }
      }
    }
    filterAndUpdate();
  };
  const { exercise, sets, _id } = workout;
  // style={{ maxWidth: '250px' }}
  return (
    <div className="col m-0 p-0" style={{ maxWidth: '272px', width:'100%' }}>
      <div className="card rounded-2 exercise-card" >
        {/* <img className="card-img-top" src={exercise.gifUrl} alt="Card cap" /> */}
        <div className="card-body">
          <h5 className="card-title">{exercise.name}</h5>
          <div className="row align-items-start p-2 gap-2 my-2">
            <span className="col badge exercise-badge bg-dark">{exercise.bodyPart}</span>
            <span className="col badge exercise-badge bg-dark">{exercise.target}</span>
            <span className="col badge exercise-badge bg-dark">{exercise.equipment}</span>
          </div>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Set</th>
                <th scope="col">Weight (kg)</th>
                <th scope="col">Reps</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((eachSet, i) => (
                <tr className="" key={eachSet._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{eachSet.weight}</td>
                  <td>{eachSet.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex flex-column">
            <button
              className="btn regbtn mb-2"
              data-bs-toggle="modal"
              data-bs-target={`#modal-Edit-${_id.slice(_id.length - 5)}`}
            >
              Update
            </button>
            <Modal
              id={`modal-Edit-${_id.slice(_id.length - 5)}`}
              title="Update Routine"
              content="Update Routine"
              contentClass="normalbtn"
              isForm
            >
              {/* Form for changing Exercise & Sets details */}
              <ExerciseForm
                defaultWorkout={true}
                workout={workout}
                workoutIndex={index}
                identifier={identifier}
                scheduleDate={scheduleDate}
                editExerciseId={exercise._id}
              />
            </Modal>
            <button className="btn delbtn" onClick={deleteExercise}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
