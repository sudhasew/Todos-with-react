import React, { FormEvent, useRef } from "react";
import "./styles.css";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ task, setTask, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter description..."
        className="input_container"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="saveBtn" type="submit">
        Save
      </button>
    </form>
  );
};

export default InputField;
