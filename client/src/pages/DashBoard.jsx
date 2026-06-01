import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { backendUrl, userData } = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.defaults.withCredentials = true;
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/tasks`
      );

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Task title is required");
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/tasks`,
        {
          title,
          description,
        }
      );

      if (data.success) {
        toast.success("Task Created");

        setTitle("");
        setDescription("");

        fetchTasks();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const updateTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);

      const { data } = await axios.put(
        `${backendUrl}/api/v1/tasks/${id}`,
        {
          completed: !task.completed,
        }
      );

      if (data.success) {
        toast.success("Task Updated");
        fetchTasks();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/v1/tasks/${id}`
      );

      if (data.success) {
        toast.success("Task Deleted");
        fetchTasks();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-28 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Task Dashboard
        </h1>

        {userData?.role === "admin" && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-lg">
              Admin Dashboard
            </h2>
            <p>
              You can view and manage all users' tasks.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Tasks
            </h3>
            <p className="text-3xl font-bold">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {
                tasks.filter(
                  (task) => task.completed
                ).length
              }
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">
              Pending
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {
                tasks.filter(
                  (task) => !task.completed
                ).length
              }
            </p>
          </div>
        </div>

        {userData?.role !== "admin" && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Task
            </h2>

            <form
              onSubmit={createTask}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Task Title"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <textarea
                rows="4"
                placeholder="Task Description"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Create Task
              </button>
            </form>
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <h2 className="text-2xl font-semibold">
              {userData?.role === "admin"
                ? "No Tasks Created By Any User"
                : "No Tasks Found"}
            </h2>

            <p className="text-gray-500 mt-2">
              {userData?.role === "admin"
                ? "Users have not created any tasks yet."
                : "Create your first task above."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">
                    {task.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>
                </div>

                <p className="text-gray-600 mb-3">
                  {task.description ||
                    "No description provided"}
                </p>

                {userData?.role === "admin" &&
                  task.createdBy && (
                    <div className="mb-4 text-sm text-gray-500 border-t pt-3">
                      <p>
                        <strong>Owner:</strong>{" "}
                        {task.createdBy.name}
                      </p>

                      <p>
                        <strong>Email:</strong>{" "}
                        {task.createdBy.email}
                      </p>

                      <p>
                        <strong>Role:</strong>{" "}
                        {task.createdBy.role}
                      </p>
                    </div>
                  )}

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      updateTask(task._id)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Toggle Status
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;