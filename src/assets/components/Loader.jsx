import loader from "../images/loader.gif";

function Loader() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[rgba(255,255,255,0.5)] fixed top-0 left-0">
      <img src={loader} />
    </div>
  );
}

export default Loader;
