// src/components/admin/InquiryDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getInquiryById, deleteInquiry } from '../../services/inquiryService';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-toastify';

const InquiryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const data = await getInquiryById(id);
        setInquiry(data);
      } catch (err) {
        setError('Inquiry not found or error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteInquiry(id);
      toast.success('Inquiry deleted successfully');
      navigate(`/admin/inquiries`);
      
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading Inquiry...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">{error}</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card className="shadow-xl rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Inquiry Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-light">
            <div><strong>Name:</strong> {inquiry.fullName}</div>
            <div><strong>Email:</strong> {inquiry.email}</div>
            <div><strong>Phone:</strong> {inquiry.phone}</div>
            <div><strong>Company:</strong> {inquiry.companyName}</div>
            <div className="sm:col-span-2"><strong>Services:</strong> {inquiry.services?.join(', ')}</div>
            <div className="sm:col-span-2"><strong>Requirements:</strong><br /> {inquiry.requirements}</div>
            <div className="sm:col-span-2"><strong>Submitted At:</strong> {new Date(inquiry.createdAt).toLocaleString()}</div>
          </div>

          <div className="mt-6 flex justify-between flex-wrap gap-2">
            <Link to="/admin/inquiries">
              <Button variant="outline">← Back to List</Button>
            </Link>
            <div className="flex gap-2">
              <Link to={`/admin/inquiries/${inquiry._id}/edit`}>
                <Button>Edit Inquiry</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}  // ✅ fix here
        handleConfirm={handleDelete}
        title="Delete Inquiry"
        description="Are you sure you want to delete this inquiry? This action cannot be undone."
      />
    </div>
  );
};

export default InquiryDetails;
