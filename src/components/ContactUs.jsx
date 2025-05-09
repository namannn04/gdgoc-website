import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const ContactUs = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_s2qbsib",
        "template_z7nm3jn",
        formRef.current,
        "y6jKsjfqHTGXaGAs8"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
          setTimeout(() => setStatus(null), 5000);
        }
      );
  };

  return (
    <>
      <section
        id={id}
        className="relative flex pt-10 md:pt-20 bg-white md:justify-between lg:h-[390px] pb-10 md:mb-0 z-10"
      >
        <div className="left hidden lg:flex w-1/2 text-white font-bebas-neue">
          {/* Left section content remains unchanged */}
          <div>
            <div className="w-72">
              <p className="bg-[#EA4335] p-4 rotate-[11.37deg] rounded-3xl text-5xl">
                ASk any doubt
              </p>
            </div>
            <div className="w-[440px]">
              <p className="bg-[#4285F4] p-4 -rotate-[35.17deg] rounded-3xl translate-x-10 text-7xl translate-y-5">
                Have a question?
              </p>
            </div>
            <div>
              <p className="bg-[#EA4335] h-20 w-20 rounded-full absolute translate-x-56 translate-y-4"></p>
            </div>
            <div className="w-40 ">
              <p className="bg-[#2EB574] p-3 rounded-2xl translate-x-44 translate-y-[67px] text-3xl">
                Here to help
              </p>
            </div>
            <div>
              <p className=" bg-[#F4B603] w-14 h-14 p-5 rounded-full translate-x-[336px] translate-y-2 font-bold"></p>
            </div>
            <div>
              <p className="bg-[#EA4335] h-20 w-20 rounded-full absolute -translate-y-48 -translate-x-7"></p>
            </div>
            <div>
              <p className="bg-[#F4B603] h-20 w-20 rounded-full relative -translate-y-32"></p>
            </div>
            <div>
              <p className="bg-[#2EB574] h-12 w-12 rounded-full absolute -translate-y-60 translate-x-12"></p>
            </div>
            <div>
              <p className="bg-[#4285F4] h-12 w-12 rounded-full absolute -translate-y-36"></p>
            </div>
          </div>
        </div>
        <div className="right gap-10 flex flex-col ml-7 mr-7 w-full md:items-center">
          <h1 className="font-bebas-neue uppercase text-8xl lg:hidden mt-6">
            contact us
          </h1>
          <form ref={formRef} onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="relative z-20 border-b-[1px] focus:outline-none md:w-[500px] pr-20 focus:border-[#666666] focus:border-b-2 transition-colors border-[#858585] mb-5 p-1"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="relative z-20 border-b-[1px] focus:outline-none md:w-[500px] pr-20 focus:border-[#666666] focus:border-b-2 transition-colors border-[#858585] mb-5 p-1"
              required
            />
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="relative z-20 border-b-[1px] focus:outline-none md:w-[500px] pr-20 focus:border-[#666666] focus:border-b-2 transition-colors border-[#858585] p-1"
              required
            />
            <div className="flex justify-center md:justify-center md:mb-5 mt-10">
              <button
                type="submit"
                className="relative z-20 p-2 bg-[#2EB574] hover:bg-green-600 text-white rounded-xl"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
            {status === "success" && (
              <p className="text-green-600 mt-2">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-2">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
