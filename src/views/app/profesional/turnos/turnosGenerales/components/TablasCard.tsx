import { useEffect, useState } from "react";
import { generarFilasVacias } from "@/utils/tableUtils";
import { useQuery } from "@tanstack/react-query";
import { obtenerDoctores, obtenerTurnosDiarios } from "../service/turnosGeneralesService";
import { TablaDefault } from "@/frontend-resourses/components";
import { useTurnosGeneralesStore } from "../store/turnosGeneralesStore";

type Doctores = {
  id: number;
  ndoctor: string;
  nespecialidad: string;
};

export default function TablasCard() {
  const [firstLoadDoctores, _setFirstLoadDoctores] = useState(true);

  const {
    doctoresData,
    setDoctoresData,
    doctorSeleccionado,
    setDoctorSeleccionado,
    diaSeleccionado,
    turnosData,
    setTurnosData,
  } = useTurnosGeneralesStore();

  // console.log(doctorSeleccionado?.idd  octor);

  const {
    data: doctoresQuery,
    // refetch: refetchDoctores,
    // isSuccess: isSuccessDoctores,
  } = useQuery<{ data: Doctores[] }>({
    queryKey: ["doctores"],
    queryFn: () => obtenerDoctores(),
    enabled: firstLoadDoctores,
  });

  const doctoresDataTabla = doctoresData
    ? doctoresData.map((item, idx) => ({ ...item, id: idx + 1 }))
    : [];

  const {
    data: doctoresTurnos,
    // isFetching: loadingTurnos,
    // refetch: refetchTurnos,
  } = useQuery({
    queryKey: ["doctoresTurnos", doctorSeleccionado?.iddoctor, diaSeleccionado],
    queryFn: () => {
      if (!doctorSeleccionado?.iddoctor || !diaSeleccionado) return Promise.resolve({ data: [] });
      return obtenerTurnosDiarios({
        fini: diaSeleccionado,
        ffin: diaSeleccionado,
        iddoctor: doctorSeleccionado.iddoctor,
      });
    },
    enabled: Boolean(doctorSeleccionado?.iddoctor && diaSeleccionado),
  });

  const columnasTabla1 = [
    {
      key: "id",
      label: "ID",
      minWidth: "40",
      maxWidth: "50",
    },
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "180",
      maxWidth: "280",
    },
    {
      key: "nespecialidad",
      label: "Especialidad",
      minWidth: "170",
      maxWidth: "270",
    },
  ];

  const columnasTabla2 = [
    { key: "id", label: "ID", minWidth: "40", maxWidth: "50" },
    {
      key: "hora_ini",
      label: "Hora Ini",
      minWidth: "70",
      maxWidth: "90",
    },
    {
      key: "hora_fin",
      label: "Hora Fin",
      minWidth: "70",
      maxWidth: "90",
    },
    {
      key: "nestado",
      label: "Estado",
      minWidth: "100",
      maxWidth: "180",
    },
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "240",
      maxWidth: "330",
    },
    {
      key: "obs",
      label: "Obs",
      minWidth: "160",
      maxWidth: "260",
    },
  ];

  // Asegurarse de que cada turno tenga un id único para la tabla y siempre mostrar 12 filas
  const turnosDataTabla = Array.isArray(turnosData)
    ? turnosData.map((item, idx) => ({ id: idx + 1, ...item }))
    : [];

  // Siempre mostrar filas de turnos y completar hasta 12 con filas vacías
  const datosParaTabla2 = [
    ...turnosDataTabla,
    ...generarFilasVacias(12 - turnosDataTabla.length, columnasTabla2, turnosDataTabla.length + 1),
  ];

  const propsTabla1 = {
    datosParaTabla: doctoresDataTabla || [],
    selectFn: true,
    objectSelection: {
      setSeleccionado: setDoctorSeleccionado,
    },
    objectColumns: columnasTabla1,
    objectStyles: {
      widthContainer: "400px",
      heightContainer: "300px",
      withScrollbar: true,
      addHeaderColor: "#022539",
      columnasNumber: [1],
      cursorPointer: true,
      viewport1440: {
        widthContainer1440px: "420px",
        heightContainer1440px: "400px",
      },
      viewport1536: {
        widthContainer1536px: "470px",
        heightContainer1536px: "400px",
      },
      viewport1920: {
        widthContainer1920px: "600px",
        heightContainer1920px: "500px",
      },
    },
    selectFirst: true,
    estaProcesado: true,
  };

  const propsTabla2 = {
    datosParaTabla: datosParaTabla2,
    objectColumns: columnasTabla2,
    selectFn: true,
    objectStyles: {
      widthContainer: "700px",
      heightContainer: "300px",
      withScrollbar: true,
      addHeaderColor: "#022539",
      columnasNumber: [1, 2, 3],
      cursorPointer: true,
      viewport1440: {
        widthContainer1440px: "720px",
        heightContainer1440px: "400px",
      },
      viewport1536: {
        widthContainer1536px: "750px",
        heightContainer1536px: "400px",
      },
      viewport1920: {
        widthContainer1920px: "1000px",
        heightContainer1920px: "500px",
      },
    },
  };

  useEffect(() => {
    if (doctoresQuery?.data) {
      setDoctoresData(doctoresQuery.data);
    }
  }, [doctoresQuery, setDoctoresData]);

  useEffect(() => {
    if (doctoresTurnos?.data) {
      setTurnosData(doctoresTurnos.data);
    } else {
      setTurnosData([]);
    }
  }, [doctoresTurnos, setTurnosData]);

  return (
    <div className="flex h-full gap-1">
      {/* Tabla 1 */}
      <TablaDefault props={propsTabla1} />

      {/* Tabla 2 */}
      <TablaDefault props={propsTabla2} />
    </div>
  );
}
