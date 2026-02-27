import React, { useEffect, useState } from "react";
import { getAllSubscribers, deleteSubscriber } from "../../services/newsletterService";
import { toast } from "react-toastify";
import  Loader  from "../../components/Loader";

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchSubscribers = async () => {
  try {
    setLoading(true);
    const res = await getAllSubscribers();
    const subs = res?.data?.data || [];
    
    setSubscribers(subs);
    console.log(subs)
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch subscribers.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      await deleteSubscriber(id);
      toast.success("Subscriber deleted.");
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting subscriber.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Subscribers</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          {subscribers.length === 0 ? (
            <p className="text-center text-gray-500">No subscribers found.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Subscribed At</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
               {subscribers?.length > 0 && subscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{subscriber.name}</td>
                    <td className="p-3">{subscriber.email}</td>
                    <td className="p-3">{new Date(subscriber.createdAt).toLocaleString()}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriberList;
