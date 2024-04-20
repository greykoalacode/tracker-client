import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

function AddExercise({
    defaultWorkoutCondition,
    editExerciseId,
    bodyparts,
    register
}) {
  const { user, exercises } = useStoreState((state) => ({
    user: state.user,
    exercises: state.exercises,
  }));

  const [part, setPart] = useState(defaultWorkoutCondition ? exercises.find(each => each._id === editExerciseId).bodyPart : "");
  const filteredExercises = part !== "" ? exercises.filter(each => each.bodyPart === part) : exercises;
  return (
    <div>
      <div className="form-group mb-3">
        <label className="form-label">Choose Body Part</label>
        <select
          className="form-select"
          value={part}
          onChange={(e) => setPart(e.target.value)}
          placeholder="select here"
        >
          {bodyparts.map((eachpart) => (
            <option key={eachpart} value={eachpart}>
              {eachpart}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={`workouts.exercise`} className="form-label">
          Choose Exercise
        </label>
        <select
          defaultValue={
            defaultWorkoutCondition
              ? editExerciseId
              : exercises[0]._id
          }
          className="form-select"
          name="exercise"
          aria-label="select-exercise"
          {...register("workouts.exercise")}
        >
          {filteredExercises.map((eachEx) => (
            <option
              key={eachEx._id}
              value={eachEx._id}
              disabled={eachEx._id === editExerciseId}
            >
              {eachEx.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

export default AddExercise;
