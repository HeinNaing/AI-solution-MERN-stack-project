import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { FaEnvelope, FaEye, FaTrash } from "react-icons/fa";

function AdminOverview() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.getContacts("/contacts");
      if (Array.isArray(response)) {
        setContacts(response);
      } else {
        throw new Error("Invalid response format");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts");
      setLoading(false);
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const [emailStatus, setEmailStatus] = useState(null);

  const handleSendEmail = async (email, name) => {
    try {
      setEmailStatus({ type: "loading", message: "Sending email..." });
      await api.post("/contacts/send-email", { email, name });
      setEmailStatus({ type: "success", message: "Email sent successfully!" });
      setTimeout(() => setEmailStatus(null), 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus({ type: "error", message: "Failed to send email" });
      setTimeout(() => setEmailStatus(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await api.delete(`/contacts/${id}`);
        if (response.message === "Contact deleted successfully") {
          setContacts(contacts.filter((contact) => contact._id !== id));
        } else {
          throw new Error("Failed to delete contact");
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
        setError("Failed to delete contact");
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-error">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center">Contact Submissions</h1>
        {emailStatus && (
          <div
            className={`alert ${
              emailStatus.type === "success"
                ? "alert-success"
                : emailStatus.type === "error"
                ? "alert-error"
                : "alert-info"
            } mt-4`}
          >
            {emailStatus.message}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Country</th>
              <th>Job Title</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.companyName}</td>
                <td>{contact.country}</td>
                <td>{contact.jobTitle}</td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleViewDetails(contact)}
                      className="btn btn-info btn-sm"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() =>
                        handleSendEmail(contact.email, contact.name)
                      }
                      className="btn btn-success btn-sm"
                      title="Send Email"
                    >
                      <FaEnvelope />
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="btn btn-error btn-sm"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No contact submissions found
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-base-100 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Name:</h3>
                <p>{selectedContact.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email:</h3>
                <p>{selectedContact.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone:</h3>
                <p>{selectedContact.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Country:</h3>
                <p>{selectedContact.country}</p>
              </div>
              <div>
                <h3 className="font-semibold">Company:</h3>
                <p>{selectedContact.companyName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Job Title:</h3>
                <p>{selectedContact.jobTitle}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold">Message:</h3>
                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold">Submitted On:</h3>
                <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  handleSendEmail(selectedContact.email, selectedContact.name)
                }
                className="btn btn-success"
              >
                <FaEnvelope className="mr-2" /> Send Email
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-neutral"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOverview;
