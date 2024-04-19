import { action } from "easy-peasy";
import { persist } from "easy-peasy";
import data from "./data/index";

const model = persist({
  isLogged: false,
  user: {
    name: "",
    email: "",
    gender: "",
    age: 0,
    tasks: [],
    habits: [],
    routines: [],
    logs: [],
  },
  exercises: [],
  resetUserState: action((state) => ({
    ...data.defaultUserState
  })),
  setUserState: action((state, dets) => {
    state.user = { ...state.user, ...dets };
  }),
  setHabits: action((state, habits) => {
    if(habits.length > 0){
      state.user.habits = [...habits];
    }
  }),
  setTasks: action((state, tasks) => {
    state.user.tasks = tasks;
  }),
  setRoutines: action((state, routines) => {
    if(routines.length > 0){
      state.user.routines = [ ...routines];
    }
  }),
  setLogs: action((state, logs) => {
    if(logs.length > 0){
      state.user.logs = [...logs];
    }
  }),
  setExercises: action((state, exercises) => {
    state.exercises = exercises;
  }),
  setLoginState: action((state, loginBool) => {
    state.isLogged = loginBool;
  }),
});

export default model;
