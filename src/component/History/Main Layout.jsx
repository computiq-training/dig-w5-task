import InfoLayout from "./info layout";

const HistoryForm = () => {
  let url = window.location.pathname;
  let id = url.split("/")[2];

  if (!id) return <p>no patients selected</p>;
  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className={`text-4xl font-bold`}>Patients Information</h1>
        <InfoLayout id={id} />
      </div>
    </div>
  );
};

export default HistoryForm;
