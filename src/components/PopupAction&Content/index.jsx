"use client";

import { useTodo } from "../../contexts/TodoContext"; // Importa o contexto
import { useEffect, useState } from "react";
import Image from "next/image";

import "./style.scss";

export default function PopupActionEContent(props) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");

  const { addItem, deleteItem } = useTodo();

  const showPopup = () => setIsPopupVisible(true);
  const hidePopup = () => setIsPopupVisible(false);

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleSave = () => {
    if (taskTitle == "") {
      return setError("Ops, Nenhuma Tarefa digitada..");
    }
    const newItem = {
      id: Date.now(),
      name: taskTitle,
      completed: false,
    };

    addItem(newItem);

    setTaskTitle("");
    hidePopup();
  };

  const handleDelete = () => {
    deleteItem(props.idTodo);
    hidePopup();
  };

  if (props.type == "delete") {
    return (
      <>
        <span onClick={showPopup}>
          <Image src="/trash.png" alt="Logo" width={25} height={25} />
        </span>
        <div>
          {isPopupVisible && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3> Deletar tarefa</h3>
                <div className="input-container">
                  Tem certeza que você deseja deletar essa tarefa?
                </div>
                <div className="popup-buttons">
                  <button className="cancel-btn-delete" onClick={hidePopup}>
                    Cancelar
                  </button>
                  <button className="delete-btn" onClick={handleDelete}>
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <button onClick={showPopup} className="open-popup-btn">
        Adicionar nova tarefa
      </button>
      <div>
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Nova tarefa</h3>
              <div className="input-container">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  placeholder="Digite"
                  value={taskTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="popup-buttons">
                <button className="cancel-btn" onClick={hidePopup}>
                  Cancelar
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Adicionar
                </button>
              </div>

              {error && (
                <div className="error">
                  <div>{error}</div>
                  <span onClick={() => setError("")}>x</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
