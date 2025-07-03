import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Listado: React.FC = () => {
  const [turnos, setTurnos] = useState(() => {
    const storage = localStorage.getItem("turnosLlamados");
    const parsed = storage ? JSON.parse(storage) : [];
    return parsed.slice(-5).reverse(); // los más recientes primero
  });

  const [turnoAnimado, setTurnoAnimado] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "turnosLlamados") {
        const nuevosTurnos = event.newValue ? JSON.parse(event.newValue) : [];
        const ultimosTurnos = nuevosTurnos.slice(-5).reverse();

        // Buscar si hay un turno nuevo
        const nuevo = ultimosTurnos[0]?.nroTurn;
        if (nuevo && !turnos.map((t) => t.nroTurn).includes(nuevo)) {
          setTurnoAnimado(nuevo);
          setTimeout(() => setTurnoAnimado(null), 10000);
        }

        setTurnos(ultimosTurnos);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [turnos]);

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen pt-24">
      <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
        Lista de pacientes
      </h1>
      <div className="flex flex-col items-center w-full gap-3 mt-6">
        {turnos.map((item, index) => {
          const isNew = item.nroTurn === turnoAnimado;

          return (
            <motion.div
              key={index}
              className="py-2 text-4xl font-semibold text-center rounded w-60 "
              style={
                !isNew ? { backgroundColor: "#518915", color: "white" } : {}
              }
              animate={
                isNew
                  ? {
                      backgroundColor: [
                        "#518915",
                        "#ffffff",
                        "#518915",
                        "#ffffff",
                        "#518915",
                        "#ffffff",
                        "#518915",
                      ],
                      color: [
                        "#ffffff",
                        "#518915",
                        "#ffffff",
                        "#518915",
                        "#ffffff",
                        "#518915",
                        "#ffffff",
                      ],
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: [
                        "#518915",
                        "#518915",
                        "#518915",
                        "#518915",
                        "#518915",
                        "#518915",
                        "#518915",
                      ],
                    }
                  : {}
              }
              transition={
                isNew
                  ? {
                      duration: 10,
                      times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 0.96],
                      ease: "easeInOut",
                    }
                  : {}
              }
            >
              {item.nroTurn}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
