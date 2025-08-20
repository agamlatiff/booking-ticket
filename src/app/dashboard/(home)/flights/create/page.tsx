import type { Metadata } from "next";
import FormFlight from "../components/FormFlight";

export const metadata: Metadata = {
  title: "Dashboard | Create data flights",
};

const CreateFlightPage = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold"> Add Data Flight</div>
      </div>
      <FormFlight type="ADD"/>
    </div>
  );
};

export default CreateFlightPage;
