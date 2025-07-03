import { useTurns } from "../../../Context/TurnsContext";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Consultorio = () => {
  const { waitingShifts, setWaitingShifts, callTurns, setCallTurns } =
    useTurns();
  const [call, setCall] = useState(false);
  const [select, setSelect] = useState(false);
  const [selectOffice, setSelectOffice] = useState("");

  const handleCallButton = () => {
    setCall(!call);
    const turnoActual = waitingShifts[0];
    setCallTurns([...callTurns, turnoActual]);
  };

  const handleCallFinishButton = () => {
    const actualizados = waitingShifts.slice(1);
    setWaitingShifts(actualizados);

    setCall(false);
  };

  const handleOpenSelect = () => {
    setSelect(!select);
  };

  const handleSelectOffice = (of) => {
    setSelectOffice(of);
    setSelect(!select);
  };

  const offices = [
    "consultorio 1",
    "consultorio 2",
    "consultorio 3",
    "consultorio 4",
  ];

  return (
    <div className="flex flex-col w-full h-screen pt-20">
      <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
        Próximo paciente a atender
      </h1>
      <div className="flex items-center justify-center w-full px-10 h-2/3 ">
        {waitingShifts && waitingShifts?.length > 0 ? (
          <>
            <div className="flex flex-col items-start justify-center w-1/2 gap-2 px-4 py-2 bg-white border rounded border-green">
              <h1 className="text-xl font-medium text-green">
                Datos del paciente
              </h1>
              <div className="flex justify-start w-full gap-5 ">
                <p className="w-1/2 text-sm text-blue">
                  Nombre:{" "}
                  <span className="text-base font-medium text-blue">
                    {waitingShifts && waitingShifts[0].name}
                  </span>
                </p>
                <p className="w-1/2 text-sm text-blue">
                  Edad:{" "}
                  <span className="text-base font-medium text-blue">
                    {waitingShifts && waitingShifts[0].edad}
                  </span>
                </p>
              </div>{" "}
              <p className="text-sm text-blue">
                DNI:{" "}
                <span className="text-base font-medium text-blue">
                  {waitingShifts && waitingShifts[0].dni}
                </span>
              </p>
              <p className="text-sm text-blue">
                Prioridad:{" "}
                <span className="text-base font-medium text-blue">
                  {waitingShifts && waitingShifts[0].priority}
                </span>
              </p>
              <p className="text-sm text-blue">
                Descripción:{" "}
                <span className="text-base font-medium text-blue">
                  {waitingShifts && waitingShifts[0].description}
                </span>
              </p>
              <p className="text-sm text-blue">
                Turno:{" "}
                <span className="text-base font-medium text-blue">
                  {waitingShifts && waitingShifts[0].nroTurn}
                </span>
              </p>
            </div>{" "}
            <div className="flex flex-col items-center justify-center w-1/2 h-full gap-5 ">
              <div className="relative flex flex-col items-center justify-center w-full">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="flex items-center justify-between w-3/4 px-5 py-2 text-sm font-medium text-center bg-white border rounded border-green text-blue"
                  type="button"
                  onClick={handleOpenSelect}
                >
                  {selectOffice ? (
                    <>
                      {selectOffice}{" "}
                      <IoIosArrowDown
                        className={`${
                          select
                            ? "rotate-180 transition-all duration-300"
                            : "rotate-0 transition-all duration-300"
                        }`}
                      />
                    </>
                  ) : (
                    <>
                      Seleccione un consultorio{" "}
                      <IoIosArrowDown
                        className={`${
                          select
                            ? "rotate-180 transition-all duration-300"
                            : "rotate-0 transition-all duration-300"
                        }`}
                      />
                    </>
                  )}
                </button>
                {select && (
                  <div
                    id="dropdown"
                    className="absolute z-20 flex flex-col w-3/4 bg-white border divide-y divide-gray-300 rounded shadow-sm top-9 border-green "
                  >
                    {offices.map((item) => (
                      <div
                        key={item}
                        onClick={() => handleSelectOffice(item)}
                        className="block px-4 py-2 text-sm cursor-pointer text-blue hover:bg-green hover:text-white "
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {call ? (
                  <button
                    onClick={handleCallFinishButton}
                    className="px-5 py-1 font-medium text-white uppercase bg-red-600 rounded"
                  >
                    finalizar
                  </button>
                ) : (
                  <button
                    onClick={handleCallButton}
                    className="px-5 py-1 font-medium text-white uppercase rounded bg-green"
                  >
                    llamar
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-4 text-center border rounded border-green">
            Aún no hay pacientes para atender <br /> Recuerde mantenerse
            informado al estado de la lista
          </div>
        )}
      </div>
      <div className="w-full px-10">
        <p className="w-2/3 text-sm text-gray-400 ">
          Recordá atender a los pacientes usando barbijo y no olvides
          desinfectarte las manos con alcohol en gel antes y después de cada
          consulta.{" "}
        </p>
      </div>
    </div>
  );
};
