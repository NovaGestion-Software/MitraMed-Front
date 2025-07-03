import { ArrayTurn } from "mock/arrayNewTurn";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ITurnsContext {
  waitingShifts: ArrayTurn[];
  setWaitingShifts: React.Dispatch<React.SetStateAction<ArrayTurn[]>>;
  callTurns: ArrayTurn[];
  setCallTurns: React.Dispatch<React.SetStateAction<ArrayTurn[]>>;
}

const TurnsContext = createContext<ITurnsContext | null>(null);

export const TurnsProvider = ({ children }) => {
  const [waitingShifts, setWaitingShifts] = useState<ArrayTurn[]>(() => {
    const storage = localStorage.getItem("turnosEspera");
    const turnosStorage = storage && JSON.parse(storage);
    return turnosStorage ? turnosStorage : [];
  });
  const [callTurns, setCallTurns] = useState<ArrayTurn[]>(() => {
    const storage = localStorage.getItem("turnosLlamados");
    const turnosStorage = storage && JSON.parse(storage);
    return turnosStorage ? turnosStorage : [];
  });

  useEffect(() => {
    const turnosLocalStorage = JSON.stringify(waitingShifts);
    localStorage.setItem("turnosEspera", turnosLocalStorage);
  }, [waitingShifts]);

  useEffect(() => {
    const turnosLocalStorage = JSON.stringify(callTurns);
    localStorage.setItem("turnosLlamados", turnosLocalStorage);
  }, [callTurns]);
  return (
    <TurnsContext.Provider
      value={{ waitingShifts, setWaitingShifts, callTurns, setCallTurns }}
    >
      {children}
    </TurnsContext.Provider>
  );
};

export const useTurns = () => {
  const context = useContext(TurnsContext);
  if (!context) {
    throw new Error("useTurns debe usarse dentro de <TurnsProvider>");
  }
  return context;
};
