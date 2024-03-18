import FilesTable from "./components/FilesTable";
import AddFile from "./components/AddFile";

function Files() {
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-5">
          <AddFile />
        </div>
        <div className="">
          <FilesTable />
        </div>
      </div>
    </>
  );
}

export default Files;
