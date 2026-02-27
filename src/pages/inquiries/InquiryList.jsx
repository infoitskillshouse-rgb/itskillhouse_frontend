import React, { useEffect, useState } from 'react';
import { getAllInquiries, deleteInquiry } from '../../services/inquiryService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash2, Eye, Pencil } from 'lucide-react';
import Spinner from '../../components/Spinner';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 10;

  const navigate = useNavigate();

  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries(); // expecting array
      setInquiries(data);
      setFiltered(data);
    } catch (error) {
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInquiry(selectedId);
      toast.success('Inquiry deleted successfully');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to delete inquiry');
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    let filteredData = inquiries;

    if (search) {
      filteredData = filteredData.filter((inq) =>
        inq.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        inq.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter((inq) => {
        const date = new Date(inq.createdAt);
        return date >= startDate && date <= endDate;
      });
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, startDate, endDate, inquiries]);

  const indexOfLast = currentPage * inquiriesPerPage;
  const indexOfFirst = indexOfLast - inquiriesPerPage;
  const currentInquiries = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / inquiriesPerPage);

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">All Inquiries</h1>
        <CSVLink
          data={filtered}
          filename="inquiries.csv"
          className="bg-green-600 text-white py-1.5 px-4 rounded hover:bg-green-700 text-sm"
        >
          Export CSV
        </CSVLink>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start date"
          className="border p-2 rounded"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End date"
          className="border p-2 rounded"
        />
        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
            className="text-sm text-red-600 underline"
          >
            Clear Dates
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInquiries.map((inq) => (
                <tr key={inq._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{inq.fullName}</td>
                  <td className="py-2 px-4">{inq.email}</td>
                  <td className="py-2 px-4">{inq.phone}</td>
                  <td className="py-2 px-4">
                    {inq.requirements?.length > 40
                      ? `${inq.requirements.slice(0, 40)}...`
                      : inq.requirements}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/inquiries/${inq._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/inquiries/${inq._id}/edit`)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(inq._id);
                        setShowModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <DeleteConfirmationModal
        open={showModal}
        handleClose={() => setShowModal(false)}   // ✅ fix here
        handleConfirm={handleDelete}
        title="Delete Inquiry"
        description="Are you sure you want to delete this inquiry? This action cannot be undone."
      />
    </div>
  );
};

export default InquiryList;
