import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import TodoItems from "../components/TodoItems";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([1, 2]);
  const { isAuthenticated } = useContext(Context);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          headers: { "Content-type": "application/json" },
          //for cookies to work
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
      setDescription("");
      setTitle("");
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/alltask`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.task);
        setTask(res.data.task);
      })
      .catch((e) => {
        toast.error(e.response.data.messsage);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {task.map((i) => (
          <TodoItems
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
