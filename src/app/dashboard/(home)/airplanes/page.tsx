import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/ColumnsTable";
import { getAirplanes } from "./lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Airplanes",
};

const AirplanesPage = async () => {
  const planes = await getAirplanes();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Airplanes</div>
        <Button asChild>
          <Link href={"/dashboard/airplanes/create"}>
            <Plus className="mr-2 h-4 w-4" />
            Add Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={planes} />
    </>
  );
};

export default AirplanesPage;
