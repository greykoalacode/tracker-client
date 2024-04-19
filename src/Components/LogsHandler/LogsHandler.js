import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api } from "../../http/ApiService";
import Card from "../Card/Card";
import "react-datepicker/dist/react-datepicker.css";
import NoDashComponent from "../NoDashComponent/NoDashComponent";
import { getDateAccToCalendar } from "../../utils/utils";

function LogsHandler({ props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const user = useStoreState((state) => state.user);
  const history = useHistory();
  const { setLogs, setUserState } = useStoreActions((actions) => ({
    setLogs: actions.setLogs,
    setUserState: actions.setUserState,
  }));
  const [addingButton, setAddingButton] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  const addLog = (data) => {
    setAddingButton(false);
    reset();
    async function scheduleUpdate() {
      let result = await api.post("/logs", data);
      if (result.status === 200) {
        setLogs(result.data);
      } else {
        setUpdateFailed(true);
        setAddingButton(true);
      }
    }
    scheduleUpdate();
  };
  const deleteLog = (id) => {
    async function deleteCall() {
      let result = await api.delete(`/logs/${id}`);
      if (result.status === 200) {
        setUserState({ ...user, logs: [...result.data] });
      } else if (result.status === 401) {
        history.push("/login");
      }
    }

    deleteCall();
  };
  return (
    <Card title={"Logs"} props={props}>
      <>
        {updateFailed && (
          <div className="p-3 my-3 bg-danger text-light font-weight-600">
            <span>Routine Update Failed</span>
          </div>
        )}
      </>
      {user.logs.length > 0 ? (
        <div className="my-2">
          {user.logs.map((each) => (
            <div className="p-2 my-2 col eachCard shadow" key={each._id}>
              <div className="row justify-content-between align-items-center">
                <Link
                  to={`/logs/${each._id}`}
                  className="col-6 text-decoration-none cardLink"
                >
                  <h4 className="fw-bold m-0">
                    {getDateAccToCalendar(each.date)}
                  </h4>
                  <p className="my-1 fst-italic">{each.description}</p>
                  <span className="m-0">{`Updated: ${getDateAccToCalendar(
                    each.updatedAt
                  )}`}</span>
                </Link>
                <button
                  onClick={() => deleteLog(each._id)}
                  className="col-2 btn mx-2 btn-sm btn-outline-danger delbtn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDashComponent content="Logs" />
      )}
      <div>
        {!addingButton ? (
          <button
            className="btn regbtn"
            onClick={() => setAddingButton(!addingButton)}
          >
            Add Log
          </button>
        ) : (
          <form onSubmit={handleSubmit(addLog)}>
            <div>
              <div className="input-group mb-3">
                <span htmlFor="LogName" className="input-group-text">
                  Log Date
                </span>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      className="form-control date-picker"
                      onChange={(e) => field.onChange(e)}
                      required
                      placeholderText="Pick a Date"
                    />
                  )}
                />
                {/* <input
                  type="text"
                  {...register("name", {
                    required: "Log Name is Required",
                    min: {
                      value: 3,
                      message: "Log name should have atleast 3 letters",
                    },
                  })}
                  className="form-control"
                  id="LogName"
                  placeholder="Eat Healthy, Walk 10,000 steps, etc."
                /> */}
                <p className="text-danger">{errors.name?.message}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="LogDescription" className="form-label">
                  Log Description
                </label>
                <textarea
                  {...register("description")}
                  className="form-control"
                  id="LogDescription"
                  rows="2"
                  defaultValue={""}
                  placeholder="Description of your Log, for your motivation / reference"
                />
                <p className="text-danger">{errors.description?.message}</p>
              </div>
              <button type="submit" className="btn btn-dark normalbtn">
                Add Log
              </button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}

export default LogsHandler;
