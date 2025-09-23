import { useEffect, useState } from "react";
import { ContainView } from "@/views/app/_components/features/ContainView";
import { useInformeTurnosStore } from "./store/informeTurnosStore";
import TableCard from "./_components/TableCard";
import GraficosCard from "./_components/GraficosCard";
import HeaderCard from "./_components/HeaderCard";

export default function InformeTurnosView() {
  const { informeTurnosData, setHasSearched } = useInformeTurnosStore();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (informeTurnosData?.data?.length) {
      setHasSearched(true);
    }
  }, []);

  return (
    <ContainView
      title="informe de turnos"
      padding="py-1 2xl:py-3 px-10"
      gapChildren="gap-1"
      sizeTitle="text-3xl 2xl:text-4xl"
      classContainer="gap-2"
    >
      {/* Buscador */}
      <HeaderCard loader={loader} setLoader={setLoader} />

      {/* Tabla */}
      <TableCard />

      {/* Graficos */}
      <GraficosCard />
    </ContainView>
  );
}
