function Hero() {
  return (
    <div className="bg-[#E0F7FF] h-[70vh]">
      <div className=" flex w-[80%] mx-auto gap-[2em] justify-between my-[2em]">
        <div className="w-[40%] ">
          {" "}
          <h1 className="font-bold text-[3em]">JANTAH</h1>
          <p className="my-[2em] leading-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
          <div className="my-[2em]">
            <button className="bg-[#FE9C0A] p-[20px] font-bold text-white rounded-2xl">
              Get Started
            </button>
          </div>
        </div>
        <img
          src="src/assets/images/hero.png"
          alt=""
          className="w-[60%]"
        />
      </div>
    </div>
  );
}

export default Hero;
