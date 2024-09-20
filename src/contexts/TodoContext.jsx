"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("todoItems", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);

      if (updatedItems.length === 0) {
        localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      }

      return updatedItems;
    });
  };

  return (
    <TodoContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
