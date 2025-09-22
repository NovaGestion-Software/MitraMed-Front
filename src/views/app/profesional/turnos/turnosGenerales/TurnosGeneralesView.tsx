import { IDataTable, IFormState } from "../turnosProfesional/mock/arrayTableProfessional";
import { useState } from "react";
import { Modal } from "@/views/app/_components/ui/modals/Modal";
import { TableNode } from "@/frontend-resourses/components/types";
import { ContainView } from "@/views/app/_components/features/ContainView";
import Swal from "sweetalert2";
import TablasCard from "./components/TablasCard";
import AltaTurnoModal from "./components/AltaTurnoModal";
import ActionsButtonsCard from "./components/ActionsButtonsCard";
import SearchCard from "../_components/SearchCard";
import { useTurnosGeneralesStore } from "./store/turnosGeneralesStore";

export default function TurnosGeneralesView() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");

  const { diaSeleccionado, setDiaSeleccionado } = useTurnosGeneralesStore();

  const [selectProfessional, _setSelectProfessional] = useState<{
    id: number;
    name: string;
    especiality: string;
  }>();

  const [selectTurn, _setSelectTurn] = useState<IDataTable>();
  const [arrayFilter, setArrayFilter] = useState<TableNode[]>([]);

  const handleBoxButton = (item: string) => {
    if (item === "alta turno") {
      handleOpenModal(item);
    } else if (item === "presentación") {
      handlePresentacion();
    } else if (item === "facturación") {
      handleFacturacion();
    }
  };

  const handleOpenModal = (item: string) => {
    setModalName(item);
    setOpenModal(!openModal);
  };

  const handleFacturacion = () => {
    Swal.fire({
      icon: "question",
      title: "¿Desea cambiar el estado a Factura pendiente?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!selectTurn) return;

        const updatedArray = arrayFilter?.map((item) =>
          item.id === selectTurn.id ? { ...item, state: "Factura pendiente" } : item,
        );
        setArrayFilter(updatedArray);
      }
    });
  };

  const handlePresentacion = () => {
    Swal.fire({
      icon: "question",
      title: "¿Confirama la presencia del paciente?",
      confirmButtonText: "Si",
      confirmButtonColor: "#518915",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!selectTurn) return;

        const updatedArray = arrayFilter?.map((item) =>
          item.id === selectTurn.id ? { ...item, state: "Presente" } : item,
        );
        setArrayFilter(updatedArray);
      }
    });
  };

  const handleChangeDataTurn = (form: IFormState) => {
    if (!selectTurn || !form) return;

    const updatedArray = arrayFilter?.map((item) =>
      item.id === selectTurn.id ? { ...item, name: form.name, obs: form.obs, saco: "MIT" } : item,
    );

    setArrayFilter(updatedArray);
  };

  //region return
  return (
    <ContainView title="turnos" classContainer="gap-3">
      {/* Filtros y Botones */}
      <div className="flex items-end justify-between w-[1100px] xg:w-[1140px] xxg:w-[1220px] xxl:w-[1600px] gap-7 xxl:gap-16">
        <SearchCard diaSeleccionado={diaSeleccionado} setDiaSeleccionado={setDiaSeleccionado} />

        <ActionsButtonsCard
          disabled={!selectTurn || !selectProfessional ? "disabled" : ""}
          handleButton={handleBoxButton}
          button={["alta turno", "presentación", "facturación"]}
        />
        {/* <div className="flex flex-1"></div> */}
      </div>

      {/* Tablas */}
      <TablasCard />

      {openModal && modalName === "alta turno" && (
        <Modal close={() => setOpenModal(!openModal)} title="Alta Turno">
          <AltaTurnoModal
            handleChange={handleChangeDataTurn}
            close={() => setOpenModal(!openModal)}
          />
        </Modal>
      )}
    </ContainView>
  );
}
