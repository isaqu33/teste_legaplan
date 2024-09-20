"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.scss";


export default function AppHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    updateDate();
  }, []);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(currentDate);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="header-container">
      <div className="header-container-adjust-size">
        <div className="header-container-children">
          <Image src="/logo.png" alt="Logo" width={150} height={50} />

          <h3>Bem-vindo de volta, Marcus</h3>

          <h2>{capitalizeFirstLetter(formattedDate)}</h2>
        </div>
        <hr />
      </div>
    </div>
  );
}
