import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const NewTask = ({
  state,
  setState,
  time,
  setTime,
  desc,
  setDesc,
  editTask,
  setEditTask,
  phone,
  setPhone,
  search,
  setTodos,
}) => {
  const fetchTodos = () => {
    axios
      .get(`${window.location.origin}/api/v1/gettodos`)
      .then((res) => {
        setTodos(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    if (!state.trim() || !time.trim()) {
      alert("Both Task and Time fields are required.");
      return;
    }

    axios
      .post(`${window.location.origin}/api/v1/createtodo`, {
        task: state,
        description: desc,
        time: time,
        phone: phone,
        createdAt: Date.now(),
      })
      .then((res) => {
        toast.success("Task successfully added to the list");
        setState("");
        setDesc("");
        setTime("");
        setPhone("");
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });

    if (phone) {
      axios
        .post(`${window.location.origin}/api/v1/schedule-sms`, {
          task: state,
          phone: phone,
          time: time,
        })
        .then((res) => {
          setState("");
          setDesc("");
          fetchTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdate = () => {
    if (!state.trim() || !time.trim()) {
      alert("Both Task and Time fields are required.");
      return;
    }
    axios
      .put(`${window.location.origin}/api/v1/updatetodo`, {
        id: editTask._id, // Pass the task ID to update the correct task
        task: state,
        description: desc,
        time: time,
        phone: phone,
      })
      .then((res) => {
        toast.success("Task successfully updated in the list");
        setState("");
        setDesc("");
        setTime("");
        setPhone("");
        setEditTask(null); // Clear edit state after updating
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        className={`${
          search ? "block max-h-fit" : "hidden h-0"
        } overflow-hidden transition-all duration-[2000ms] ease-in-out`}
      >
        <div className="flex flex-col gap-1 border-2 border-white p-2 rounded-xl">
          <div className="bg-[#161d29] flex flex-col rounded-md gap-1 p-2">
            <label htmlFor="task" className="text-white font-semibold">
              Task
            </label>
            <input
              type="text"
              required={true}
              name="task"
              placeholder="Enter Your Task."
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border-2 rounded-md 
      w-[300px] md:w-[400px] text-black border-black p-2 "
            />
          </div>

          <div className="bg-[#161d29] flex flex-col rounded-md gap-1 p-2">
            <label htmlFor="description" className="font-semibold text-white">
              Description
            </label>
            <textarea
              type="message"
              required={true}
              name="description"
              placeholder="Enter a short task description."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border-2 rounded-md 
      w-[300px] md:w-[400px] text-black border-black p-2 bg-white"
            />
          </div>
          <div className="rounded-md gap-1 p-2 bg-[#161d29] flex flex-col ">
            <div className="flex flex-col">
              <label htmlFor="time" className="text-white font-semibold">
                Select Time:{" "}
              </label>
              <input
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={` items-center justify-center
            text-black p-2 rounded-2xl border-2 border-black
            bg-white accent-slate-50 `}
              />
            </div>
          </div>
          <div className="rounded-md gap-1 p-2 bg-[#161d29] flex flex-col ">
            <div className="flex flex-col ">
              <label htmlFor="time" className="text-white font-semibold">
                Enter your Phone Number for Reminder{" "}
              </label>
              <input
                type="number"
                name="phone"
                value={phone}
                placeholder="0123456789"
                onChange={(e) => setPhone(e.target.value)}
                className={` items-center justify-center
          text-black p-2 rounded-2xl  border-2 border-black
          bg-white `}
              />
            </div>
          </div>
          <button
            onClick={editTask ? handleUpdate : handleClick}
            className=" rounded-md bg-yellow-400 text-center
      px-6 text-[16px] w-full font-semibold text-black pt-2 pb-2"
          >
            {editTask ? "Update Task" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
