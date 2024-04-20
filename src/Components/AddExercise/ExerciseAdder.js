import ReactSelect from "react-select";
import React, { useState } from "react";
import { useStoreState } from "easy-peasy";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "#CCAFA5",
    backgroundColor: "#282c35",
    padding: 10,
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#282c35",
    border: 0,
  }),
  multiValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const backgroundColor = "#3e4149";
    const color = "#CCAFA5";
    return { ...provided, opacity, transition, backgroundColor, color };
  },
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#CCAFA5",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#282c35",
  }),
  singleValue: (baseStyles, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    // const backgroundColor = "#3e4149";
    const color = "#CCAFA5";
    return { ...baseStyles, opacity, transition, color };
  }
  
//   ({
//     ...baseStyles,
//     color: "#CCAFA5",
//   }),
};

//   {
//     singleValue: (baseStyles, state) => ({
//         ...baseStyles,
//         color:  "#CCAFA5"
//     }),
//     container: (baseStyles, state) => ({
//         ...baseStyles,
//         color:  "#CCAFA5"
//     }),
//     control: (baseStyles, state) => ({
//       ...baseStyles,
//       color: "#CCAFA5",
//       backgroundColor: "#282c35",
//     }),
//     menuList: (baseStyles, state) => ({
//         ...baseStyles,
//         backgroundColor: "#282c35",
//     })
//   }

function ExerciseAdder({ bodyparts, exercise, setExercise, filteredExercisesOptions, part, setPart }) {

  

  

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
        <label className="form-label">Choose Exercise</label>
        <ReactSelect
          onChange={(exercise) => setExercise(exercise)}
          value={exercise}
          options={filteredExercisesOptions}
          isClearable
          styles={customStyles}
        />
        {/* <select
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
        </select> */}
      </div>
    </div>
  );
}

export default ExerciseAdder;
