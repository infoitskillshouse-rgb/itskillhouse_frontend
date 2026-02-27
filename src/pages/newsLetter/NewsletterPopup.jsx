// components/NewsletterPopup.jsx
import { useEffect, useState } from 'react';
import { subscribeUser, checkNewsletterStatus } from '../../services/newsletterService';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewsletterPopup({ userEmail }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', interest: [] });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const interestsList = ["Development", "Design", "UI/UX", "Marketing","Seo"]; // Example interests

  useEffect(() => {
    const init = async () => {
      try {
        let showPopup = true;

        if (userEmail) {
          const res = await checkNewsletterStatus(userEmail);
          if (!res.data.showNewsletter) showPopup = false;
          else setForm((prev) => ({ ...prev, email: userEmail }));
        } else {
          const hasShown = sessionStorage.getItem('popupShown');
          if (hasShown) showPopup = false;
        }

        if (showPopup) {
          setTimeout(() => {
            setShow(true);
            if (!userEmail) sessionStorage.setItem('popupShown', 'true');
          }, 3000);
        }
      } catch (err) {
        console.error('Newsletter check failed', err);
        toast.error('Something went wrong. Please try again.');
      }
    };

    init();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "interest") {
      if (checked) setForm(prev => ({ ...prev, interest: [...prev.interest, value] }));
      else setForm(prev => ({ ...prev, interest: prev.interest.filter(i => i !== value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.interest.length) {
      toast.info('Please select at least one interest.');
      return;
    }
    setLoading(true);
    try {
      await subscribeUser(form);
      setSuccess(true);
      setForm({ name: '', email: '', interest: [] });
      toast.success("You're successfully subscribed! 🎉");
      setTimeout(() => setShow(false), 2500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        toast.info('You are already subscribed!');
        setShow(false);
      } else {
        toast.error('Subscription failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8 relative shadow-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-3 text-xl font-bold bg-text text-white w-6 h-6 rounded-full flex items-center justify-center"
                onClick={() => setShow(false)}
              >
                ×
              </button>

              {!success ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-text">Hold on a sec!</h2>
                  <p className="text-sm sm:text-base mb-4 text-gray-700">
                    Subscribe to our newsletter and get expert tips on development, website design,
                    and UI/UX delivered straight to your desk.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name*"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-2 rounded-full bg-gray-100 outline-none text-sm sm:text-base"
                      disabled={loading}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address*"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-2 rounded-full bg-gray-100 outline-none text-sm sm:text-base"
                      disabled={loading || !!userEmail}
                    />

                    {/* Interest Checkboxes */}
<div className="flex flex-wrap gap-2 mt-2">
  {interestsList.map((i) => (
    <button
      key={i}
      type="button"
      onClick={() => {
        setForm(prev => ({
          ...prev,
          interest: prev.interest.includes(i)
            ? prev.interest.filter(x => x !== i)
            : [...prev.interest, i]
        }));
      }}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        form.interest.includes(i)
          ? "bg-text text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      disabled={loading}
    >
      {i}
    </button>
  ))}
</div>

                    <button
                      type="submit"
                      className={`w-full bg-text text-white py-3 sm:py-2 rounded-full hover:bg-gray-800 transition text-sm sm:text-base ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={loading || (!!userEmail && !!form.email)}
                    >
                      {loading ? 'Submitting...' : 'Sign me up'}
                    </button>
                  </form>

                  <p className="text-xs sm:text-sm text-gray-500 mt-3">
                    By subscribi~ng, you consent to us using your data to provide you with the requested
                    materials. For more information, read our <strong>Privacy Policy</strong>.
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Thank you!</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    You're successfully subscribed. 🎉
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}