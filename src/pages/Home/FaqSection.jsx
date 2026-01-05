import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, HelpCircle } from "lucide-react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "Is the food on PlateShare really free?",
      answer:
        "Yes! PlateShare is a non-profit community initiative. All food listings are 100% free for receivers. Our goal is to reduce waste and help those in need.",
    },
    {
      id: 2,
      question: "How do I ensure the food is safe to eat?",
      answer:
        "We encourage donors to only share fresh, untouched food. However, receivers should always check the food quality and expiry date upon collection. Safety is a shared responsibility.",
    },
    {
      id: 3,
      question: "Who can post food donations?",
      answer:
        "Anyone! Whether you are a restaurant owner with surplus stock, an event planner, or a home cook with extra portions — you can sign up and start donating in minutes.",
    },
    {
      id: 4,
      question: "Do you offer home delivery?",
      answer:
        "Currently, PlateShare operates on a 'Self-Pickup' model. The receiver needs to go to the donor's specified location to collect the food.",
    },
    {
      id: 5,
      question: "How can I delete my request?",
      answer:
        "You can manage all your requests from the 'My Food Requests' page in your dashboard. There is a cancel button for pending requests.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-full -z-0"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-tr-full -z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-[#16a34a] font-bold uppercase tracking-wider text-sm mb-3">
                <HelpCircle size={18} />
                <span>Common Questions</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Frequently Asked <span className="text-[#16a34a]">Questions</span>
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed">
                Everything you need to know about the product and billing. Can’t find the answer you’re looking for?
              </p>
            </div>

            {/* Support CTA Card */}
            <div className="bg-[#0f172a] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#16a34a] rounded-full blur-[60px] opacity-30"></div>
               
               <MessageCircle size={40} className="text-[#16a34a] mb-4" />
               <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
               <p className="text-gray-400 text-sm mb-6">
                 Can’t find the answer you’re looking for? Please chat to our friendly team.
               </p>
               <button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-3 rounded-xl font-semibold transition-colors">
                 Get in Touch
               </button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`border border-gray-100 rounded-2xl transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-white shadow-lg border-green-100"
                      : "bg-gray-50 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span className={`text-lg font-semibold ${activeIndex === index ? "text-[#16a34a]" : "text-gray-700"}`}>
                      {faq.question}
                    </span>
                    <span className={`p-2 rounded-full transition-colors ${activeIndex === index ? "bg-green-100 text-[#16a34a]" : "bg-gray-200 text-gray-500"}`}>
                      {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;