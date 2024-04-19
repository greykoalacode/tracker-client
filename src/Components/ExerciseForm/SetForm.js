import React from "react";

function SetForm({ workoutIndex, setIndex, defaultSet, register, errors }) {
  return (
    <div className="form-group mb-4">
      <p className="m-0 h5">{`Set ${setIndex + 1}`}</p>
      <div className="form-group">
        <label htmlFor={`workouts.sets.${setIndex}.weight`}>Weight (in Kg)</label>
        <input
          type="number"
          className="form-control"
          defaultValue={defaultSet.weight}
          min={1}
          name={`workouts.sets.${setIndex}.weight`}
          {...register(`workouts.sets.${setIndex}.weight`, {
            valueAsNumber: true,
          })}
        />
        <p className="text-danger">{errors.workouts?.sets[setIndex].message}</p>
      </div>
      <div className="form-group">
        <label htmlFor={`workouts.sets.${setIndex}.reps`}>Repetitions</label>
        <input
          type="number"
          className="form-control"
          min={1}
          defaultValue={defaultSet.reps}
          name={`workouts.sets.${setIndex}.reps`}
          {...register(`workouts.sets.${setIndex}.reps`, {
            valueAsNumber: true,
          })}
        />
        <p className="text-danger">{errors.workouts?.sets.message}</p>
      </div>
    </div>
  );
}

export default SetForm;
