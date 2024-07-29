function Main() {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="font-bold text-[3em] flex justify-center my-[2em]">
        WHY JANTAH
      </h1>
      <div className=" w-[90%] mx-auto">
        <div className="flex justify-between items-center">
          <img
            src="src/assets/images/share.png "
            alt=""
            className="w-[40%] text-[#FE9C0A]"
          />
          <div className="w-[30%] leading-[3em]">
            <h2 className="text-[#FE9C0A] font-bold text-[2em]">EASY TO USE</h2>
            <p>
              Our System Intuitively Manages , Finds and delivers Casual Workers
              Based On Classified Categories.
            </p>
          </div>
        </div>
      </div>
      <div className=" w-[80%] mx-auto">
        <div className="flex justify-between items-center gap-[5em]">
          <div className="w-[30%] leading-[3em] ">
            <h2 className="text-[#FE9C0A] font-bold text-[2em]">
              FINDING AGENCIES
            </h2>
            <p>
              The system Display contacts in groupings/categories based on
              Verified Categories.
            </p>
          </div>
          <img src="src/assets/images/consult.png" alt="" className="w-[40%]" />
        </div>
      </div>
    </div>
  );
}

export default Main;
