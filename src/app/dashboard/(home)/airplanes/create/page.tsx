import FormAirplane from "../_components/FormAirplane";

const CreateAirplanePage = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold"> Add Data Airplane</div>
      </div>
      <FormAirplane/>
    </div>
  );
};

export default CreateAirplanePage;
