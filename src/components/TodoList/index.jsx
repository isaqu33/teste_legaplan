"use client";

import { useState } from "react";
import Image from "next/image";
import "./style.scss";
import { useTodo } from "../../contexts/TodoContext";

import PopupActionEContent from "./../PopupAction&Content/index";

export default function TodoList() {
  const { items, updateItem } = useTodo();

  const handleCheckboxChange = (id) => {
    updateItem(id);
  };

  const incompleteItems = items.filter((item) => !item.completed);
  const completedItems = items.filter((item) => item.completed);

  return (
    <div className="container">
      <div className="card">
        <h2>Suas tarefas de hoje</h2>
        <div className="card-list-container">
          {incompleteItems.map((item) => (
            <div key={item.id} className="card-list-item">
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                checked={item.completed}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>
                <span className={item.completed ? "completed" : ""}>
                  {item.name}
                </span>
              </label>
              <PopupActionEContent type="delete" idTodo={item.id} />
            </div>
          ))}
        </div>

        <h2>Tarefas finalizadas</h2>
        <div className="card-list-container">
          {completedItems.map((item) => (
            <div key={item.id} className="card-list-item">
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                checked={item.completed}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>
                <span className={item.completed ? "completed" : ""}>
                  {item.name}
                </span>
              </label>

              <PopupActionEContent type="delete" idTodo={item.id} />
            </div>
          ))}
        </div>
      </div>

      <PopupActionEContent />
    </div>
  );
}
