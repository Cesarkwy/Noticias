import React, { useState, useEffect } from "react";
import { FaUniversalAccess, FaPlus, FaMinus, FaFont, FaUndo, FaAdjust } from "react-icons/fa";
import "./Acessibilidade.css";

const Acessibilidade = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrasteAtivo, setContrasteAtivo] = useState(false);
  const [serifaAtiva, setSerifaAtiva] = useState(false);

  // Aplica estilos ao body
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;

    if (contrasteAtivo) {
      document.body.classList.add("contraste");
    } else {
      document.body.classList.remove("contraste");
    }

    if (serifaAtiva) {
      document.body.classList.add("serifa");
      document.body.classList.remove("sem-serifa");
    } else {
      document.body.classList.add("sem-serifa");
      document.body.classList.remove("serifa");
    }
  }, [fontSize, contrasteAtivo, serifaAtiva]);

  const resetar = () => {
    setFontSize(100);
    setContrasteAtivo(false);
    setSerifaAtiva(false);
  };

  return (
    <div className="acessibilidade">
      <button className="btn-acessibilidade" onClick={() => setShowMenu(!showMenu)}>
        <FaUniversalAccess size={24} />
      </button>

      {showMenu && (
        <div className="menu-acessibilidade">
          <button onClick={() => setFontSize(fontSize + 10)}>
            <FaPlus /> Aumentar fonte
          </button>
          <button onClick={() => setFontSize(Math.max(50, fontSize - 10))}>
            <FaMinus /> Diminuir fonte
          </button>
          <button onClick={() => setContrasteAtivo(!contrasteAtivo)}>
            <FaAdjust /> {contrasteAtivo ? "Desativar contraste" : "Ativar contraste"}
          </button>
          <button onClick={() => setSerifaAtiva(!serifaAtiva)}>
            <FaFont /> {serifaAtiva ? "Fonte sem serifa" : "Fonte com serifa"}
          </button>
          <button onClick={resetar}>
            <FaUndo /> Resetar
          </button>
        </div>
      )}
    </div>
  );
};

export default Acessibilidade;
