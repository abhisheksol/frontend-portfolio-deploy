import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  return (
    <div>
      <section id='contact'>
      <SectionTitle title="Contact" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" && (
                <p className="ml-5">
                  <span className="text-tertiary">{key} : </span>
                  <span className="text-tertiary">{contact[key]}</span>
                </p>
              )
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <lottie-player
            src="https://lottie.host/c6b5a909-2f7c-4bdd-9afe-b66880800b01/1BW8BsGU6D.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
      </div></section>
    </div>
  );
}

export default Contact;
