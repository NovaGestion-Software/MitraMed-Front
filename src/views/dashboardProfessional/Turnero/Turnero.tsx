import { useTurns } from "../../../Context/TurnsContext";
import { ArrayTurn } from "../../../mock/arrayNewTurn";
import { useEffect, useState } from "react";

export const Turnero = () => {
  const { waitingShifts, setWaitingShifts } = useTurns();
  console.log("array context", waitingShifts);
  const [nro, setNro] = useState(1);
  const [turn, setTurn] = useState<ArrayTurn>({
    name: "",
    edad: 0,
    dni: "",
    description: "",
    priority: "",
    nroTurn: "",
    specialty: "",
  });
  useEffect(() => {
    const stored = localStorage.getItem("turnos");
    if (stored) {
      const arr: ArrayTurn[] = JSON.parse(stored);
      setNro(arr.length + 1);
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTurn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const turnoNuevo: ArrayTurn = {
      ...turn,
      nroTurn: `${turn.specialty}${nro}`,
    };
    setWaitingShifts([...waitingShifts, turnoNuevo]);
    setNro(nro + 1);
    setTurn({
      name: "",
      edad: 0,
      dni: "",
      description: "",
      priority: "",
      nroTurn: "",
      specialty: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-start w-full max-h-screen gap-5 py-10 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
          Ingresar nuevo paciente
        </h1>
      </div>
      <div className="w-1/2">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nombre y Apellido
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={turn.name}
              onChange={handleOnChange}
              required
              placeholder="Agustina Sosa"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="edad"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Edad
            </label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={turn.edad}
              onChange={handleOnChange}
              required
              placeholder="18"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="dni"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={turn.dni}
              onChange={handleOnChange}
              required
              placeholder="41333555"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="descripcion"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              name="description"
              value={turn.description}
              onChange={handleOnChange}
              required
              placeholder="Fiebre alta, tos, etc..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="specialty"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Seleccione la especialidad
            </label>
            <select
              id="specialty"
              name="specialty"
              value={turn.specialty}
              onChange={handleOnChange}
              required
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            >
              <option value="" disabled>
                Elegí una opción
              </option>
              <option value={"DCL"}>Clínica Medica</option>
              <option value={"DP"}>Pediatría</option>
              <option value={"DC"}>Cardiología</option>
              <option value={"DO"}>Odontología</option>
              <option value={"DE"}>Electrocardiograma</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="prioridad"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Seleccione la prioridad
            </label>
            <select
              id="prioridad"
              name="priority"
              value={turn.priority}
              onChange={handleOnChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                Elegí una opción
              </option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white bg-green hover:bg-greenHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Cargar
          </button>
        </form>
      </div>
    </div>
  );
};
