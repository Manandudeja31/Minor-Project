import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import bg from "../asset/istockphoto-1344412476-640x640.jpg";
import { toast } from "react-hot-toast";
import HeroSection from "./HeroSection";
import NewTask from "./NewTask";

const CreateTodo = () => {
  const [state, setState] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState(false);
  const [view, setView] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [show, setShow] = useState(null);
  const [isActive, setIsActive] = useState("");

  const handleShow = (id) => {
    setShow((prev) => (prev === id ? null : id));
  };

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

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${window.location.origin}/api/v1/deletetodo`, { data: { id } })
      .then((res) => {
        toast.success("Task successfully deleted from the list");

        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (todo) => {
    setSearch(true);
    setView(false);
    setEditTask(todo); // Set the task that is being edited
    setState(todo.task); // Set task name
    setDesc(todo.description); // Set task description
    setTime(todo.time); // Set task time
    setPhone(todo.phone); // Set phone number (if needed)
  };

  const handleComplete = (id) => {
    axios
      .put(`${window.location.origin}/api/v1/completetodo`, { id: id })
      .then((res) => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col relative justify-center items-center h-screen w-screen">
      <img alt="bg" className=" object-cover w-full h-full" src={bg}></img>
      <div className=" flex absolute top-0 flex-col justify-center items-center m-10 ">
        {/* Hero section */}
        <HeroSection
          view={view}
          setView={setView}
          search={search}
          setSearch={setSearch}
        />
        {/* Adding New task */}
        <NewTask
          state={state}
          setState={setState}
          setTodos={setTodos}
          time={time}
          setTime={setTime}
          desc={desc}
          setDesc={setDesc}
          editTask={editTask}
          setEditTask={setEditTask}
          phone={phone}
          setPhone={setPhone}
          search={search}
        />

        {view && (
          <div
            className=" overflow-y-auto scrollbar-thin scrollbar-track-transparent
            h-[600px] md:h-[400px] scrollbar-thumb-black "
          >
            {/* implementing search functionality */}
            <div className="flex flex-col justify-center items-center ">
              <input
                type="text"
                placeholder="Search a task..."
                name="isActive"
                value={isActive}
                className=" border-2 border-black rounded-xl w-60 p-2
                 text-black mt-5"
                onChange={(e) => setIsActive(e.target.value)}
              />
            </div>
            {/* filtering tasks on basis of search */}
            {todos
              .filter((todo) =>
                isActive.toLowerCase() === ""
                  ? todo
                  : todo.task.toLowerCase().includes(isActive.toLowerCase())
              )
              // dispalying tasks
              .map((todo) => (
                <div key={todo._id} className=" w-[400px] md:w-[800px]">
                  <div
                    className="bg-white p-5 text-wrap border-2 border-gray-600 text-black 
                capitalize shadow-lg text-lg font-semibold rounded-xl flex gap-20 m-5 relative"
                  >
                    <div
                      className="flex gap-5 "
                      onClick={() => handleComplete(todo._id)}
                    >
                      {/* displaying task on basis of complete and incomplete */}
                      {todo.done ? (
                        <div className="flex gap-5 justify-center items-center cursor-pointer">
                          <div className="bg-white rounded round">
                            <FaCheckCircle className="text-blue-700" />
                          </div>
                          <div className="flex-col">
                            <div className="flex gap-10 ">
                              <h2 className="text-lg font-semibold ">
                                <span className=" line-through text-wrap w-28 md:w-80">
                                  {todo.task}
                                </span>
                              </h2>
                            </div>
                            <p className="text-gray-700 text-base text-wrap w-28 md:w-80">
                              {todo.description || "No description provided"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-5 justify-center items-center cursor-pointer">
                          <div className="bg-white rounded-full">
                            <ImRadioUnchecked />
                          </div>
                          <div className="flex-col">
                            <div className="flex gap-10">
                              <h2 className="text-lg font-semibold text-wrap w-28 md:w-80">
                                {todo.task}
                              </h2>
                            </div>
                            <p className="text-gray-700 text-base text-wrap w-28 md:w-80">
                              {todo.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* displaying time, delete and edit buttons */}
                    <div
                      className={`flex items-center gap-5 absolute right-5 ${
                        show === todo._id ? "top-2" : "top-8"
                      }`}
                    >
                      <p>{todo.time}</p>
                      <div className="flex flex-col items-center justify-center gap-5">
                        <button onClick={() => handleShow(todo._id)}>
                          {show !== todo._id ? (
                            <div>
                              <TbDotsVertical />
                            </div>
                          ) : (
                            <div>
                              <RxCrossCircled className=" size-8" />
                            </div>
                          )}
                        </button>
                        {show === todo._id && (
                          <div
                            className={`${
                              show === todo._id
                                ? "max-h-20 opacity-100"
                                : "max-h-0 opacity-0"
                            } transition-all duration-300 ease-in-out overflow-hidden flex gap-2`}
                          >
                            <button
                              onClick={() => handleDelete(todo._id)}
                              className="bg-black text-white rounded-full p-1 "
                            >
                              <MdDelete />
                            </button>
                            <button
                              onClick={() => handleEdit(todo)}
                              className="bg-black text-white rounded-full p-1 "
                            >
                              <MdEdit />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTodo;
