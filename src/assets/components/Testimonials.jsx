import Testimonial from "./Testimonial";
import img7 from "../images/woman.svg";
import img4 from "../images/male.svg";
import img1 from "../images/female.svg";
function Testimonials() {
  return (
    <div className="container mx-auto mb-[4em]">
      <p className="flex justify-center  text-5xl font-bold mt-[2em] mb-5">
        Testimonials
      </p>
      <div className="flex justify-center gap-[6em] mt-[3em]">
        <Testimonial
          img={img4}
          name="Keysean"
          details="Am a bussiness person who wanted to save my employers contacts.Contactly has really played a major role in making it possible for my company to increace in efficiency
                 ."
        />
        <Testimonial
          img={img7}
          name="Gloria Kamam"
          details="I really needed a Contact Management app that could help in finishing up grouping my contacts.And through the app i really got my problem solved.And the work was well done."
        />
        <Testimonial
          img={img1}
          name="Larry Bwoy"
          details="Through Contactly I was able to get assisted to the need that i needed and i can also reccommend any other person that's need help."
        />
      </div>
    </div>
  );
}

export default Testimonials;
