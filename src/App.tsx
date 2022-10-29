import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./models/Task";

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      if (tasks.find((t) => t.task.toUpperCase() === task.toUpperCase())) {
        if (window.confirm(`Do you want to add "${task}" again`)) {
          setTasks([
            ...tasks,
            {
              id: Date.now(),
              task: task,
              fixed: false,
            },
          ]);
          setTask("");
        } else {
          setTask("");
          return;
        }
      } else {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            task: task,
            fixed: false,
          },
        ]);
      }
      setTask("");
    }

    if (task === "") {
      window.alert("Please add a valid task");
      return;
    }
  };

  return (
    <div className="App">
      <span className="heading">Todos List</span>
      <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
export default App;
