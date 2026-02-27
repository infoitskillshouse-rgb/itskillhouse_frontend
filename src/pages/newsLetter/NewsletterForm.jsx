import React, { useState } from "react";
import { sendNewsletter } from "../../services/newsletterService";
import { toast } from "react-toastify";
import  Loader  from "../../components/Loader"; // Optional: show spinner while sending

const NewsletterForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.warning("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await sendNewsletter({ subject, content: message }); 
      toast.success("Newsletter sent successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to send newsletter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Send Newsletter</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter newsletter message"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {loading ? <Loader /> : "Send Newsletter"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
