import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import AnimatedBackground from "../../components/AnimatedBackground";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulating API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitMessage({
        type: "success",
        text: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage(null);
      }, 5000);
    }
  };

  return (
    <section
      id="contact-section"
      className="relative py-20 px-6 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden"
    >
      {/* Add the animated background */}
      <AnimatedBackground containerId="contact-section" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-primary-dark dark:text-light-100 mb-2">
            Contact Me
          </h2>
          <div className="h-1 w-24 bg-tertiary dark:bg-tertiary-light mb-10"></div>
        </ScrollReveal>

        <div className="grid gap-12">
          {/* Contact information */}
          <ScrollReveal direction="left">
            <div className="bg-white dark:bg-dark-400 p-8 rounded-xl shadow-lg border border-light-400 dark:border-dark-300">
              <h3 className="text-2xl font-bold text-primary-dark dark:text-light-100 mb-6">
                Let's Connect
              </h3>
              <p className="text-dark-300 dark:text-light-300 mb-8">
                Have a project in mind or just want to say hello? Feel free to
                reach out to me through any of these channels.
              </p>

              <div className="space-y-6">
                {contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-lg">
                      <Mail className="text-tertiary dark:text-tertiary-light" size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark dark:text-light-100">
                        Email
                      </h4>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-secondary dark:text-secondary-light hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact.mobile && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-lg">
                      <Phone className="text-tertiary dark:text-tertiary-light" size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark dark:text-light-100">
                        Phone
                      </h4>
                      <a
                        href={`tel:${contact.mobile}`}
                        className="text-secondary dark:text-secondary-light hover:underline"
                      >
                        {contact.mobile}
                      </a>
                    </div>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-lg">
                      <MapPin className="text-tertiary dark:text-tertiary-light" size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark dark:text-light-100">
                        Location
                      </h4>
                      <p className="text-dark-300 dark:text-light-300">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social links */}
              <div className="mt-10">
                <h4 className="text-lg font-medium text-primary-dark dark:text-light-100 mb-3">
                  Find me on
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/abhisheksol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-dark-300 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <i className="ri-github-line text-xl text-primary-dark dark:text-light-100"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhishek-solapure-9aa362250/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-dark-300 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <i className="ri-linkedin-box-line text-xl text-primary-dark dark:text-light-100"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/abhishek.solapure.2003/?igsh=bGJld3lnN2dpenE5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-dark-300 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <i className="ri-instagram-line text-xl text-primary-dark dark:text-light-100"></i>
                  </a>
                  <a
                    href="https://wa.me/9561435141"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-dark-300 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <i className="ri-whatsapp-line text-xl text-primary-dark dark:text-light-100"></i>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal direction="right">
            <div className="bg-white dark:bg-dark-400 p-8 rounded-xl shadow-lg border border-light-400 dark:border-dark-300">
              <h3 className="text-2xl font-bold text-primary-dark dark:text-light-100 mb-6">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-dark-300 dark:text-light-300 mb-1"
                  >
                    Name
                  </label>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-light-300 dark:bg-dark-300 border-none rounded-lg py-3 px-4 text-dark-500 dark:text-light-100 focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light outline-none transition-all"
                      placeholder="Your name"
                    />
                  </motion.div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark-300 dark:text-light-300 mb-1"
                  >
                    Email
                  </label>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-light-300 dark:bg-dark-300 border-none rounded-lg py-3 px-4 text-dark-500 dark:text-light-100 focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-dark-300 dark:text-light-300 mb-1"
                  >
                    Message
                  </label>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="relative"
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-light-300 dark:bg-dark-300 border-none rounded-lg py-3 px-4 text-dark-500 dark:text-light-100 focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light outline-none transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </motion.div>
                </div>

                {/* Form message */}
                <AnimatePresence>
                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`rounded-lg px-4 py-3 text-sm ${
                        submitMessage.type === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                      }`}
                    >
                      {submitMessage.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-tertiary dark:bg-tertiary-dark hover:bg-tertiary-dark dark:hover:bg-tertiary text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
