import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDone, MdClose } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Task } from "../models/Task";
import "./styles.css";
interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask = ({ task, tasks, setTasks }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const handleEdit = () => {
    console.log(edit);
    if (!edit && !task.fixed) {
      setEdit(!edit);
    }
    console.log(edit);
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTask.trim() === "") {
      window.alert("Please enter valid task");
      setEdit(true);
      setEditTask("");
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, task: editTask } : task
        )
      );
      setEdit(false);
    }
  };

  const handleFixed = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, fixed: !task.fixed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    if (task.fixed) {
      if (window.confirm(`Do you want to delete "${editTask}"`)) {
        setTasks(tasks.filter((t) => t.id !== id));
      }
    } else {
      window.alert(`First strike off the "${task.task}"`);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="tasks-single" onSubmit={(e) => handleSubmit(e, task.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          className="tasks-single-text"
        />
      ) : task.fixed ? (
        <s className="tasks-single-text">{task.task} </s>
      ) : (
        <span className="tasks-single-text">{task.task}</span>
      )}

      {/* <s></s>  means the text will strike off*/}
      <div>
        <span className="icon" onClick={handleEdit}>
          <AiFillEdit />
        </span>
        {task.fixed ? (
          <span className="icon" onClick={() => handleFixed(task.id)}>
            <MdClose />
          </span>
        ) : (
          <span className="icon" onClick={() => handleFixed(task.id)}>
            <MdDone />
          </span>
        )}

        <span className="icon" onClick={() => handleDelete(task.id)}>
          <FaTrash />
        </span>
      </div>
    </form>
  );
};

export default SingleTask;
