import { DataTable } from "@/components/ui/data-table";
import type { Metadata } from "next";
import { columns } from "./_components/ColumnsUser";
import { getCustomers } from "./lib/data";


export const metadata: Metadata = {
  title: "Dashboard | Users",
};

const UserPage = async () => {
  const Users = await getCustomers()

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">User</div>
      </div>
      <DataTable columns={columns} data={Users} />
    </>
  );
};

export default UserPage;
