import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { FaEnvelope, FaEye, FaTrash, FaFilter, FaInbox, FaBlog, FaClock, FaCheck, FaSync, FaSearch } from "react-icons/fa";
import EmailModal from '../../components/EmailModal';

function AdminOverview() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmailRecipient, setSelectedEmailRecipient] = useState(null);
  const [blogs, setBlogs] = useState(0);
  const [stats, setStats] = useState({
    allInquiries: 0,
    blogs: 0,
    notCompleted: 0,
    completed: 0
  });
  const [filters, setFilters] = useState({
    country: "",
    jobTitle: "",
    status: "",
    dateRange: {
      start: "",
      end: "",
    },
  });
  const [isReloading, setIsReloading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "contacted", label: "Contacted" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchBlogs();
  }, []);



  useEffect(() => {
    applyFilters();
  }, [contacts, filters]);

  useEffect(() => {
    // Update stats whenever contacts change
    if (contacts.length > 0) {
      const completed = contacts.filter(contact => contact.status === 'completed').length;
      setStats({
        allInquiries: contacts.length,
        blogs: blogs, // You might want to fetch this from your API
        notCompleted: contacts.length - completed,
        completed: completed
      });
    }
  }, [contacts]);

  const fetchContacts = async () => {
    try {
      const response = await api.getContacts("/contacts");
      if (Array.isArray(response)) {
        setContacts(response);
        setFilteredContacts(response);
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

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs/count');
      setBlogs(response.count);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...contacts];

    // Apply name search filter
    if (searchName) {
      filtered = filtered.filter(
        (contact) => contact.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Apply country filter
    if (filters.country) {
      filtered = filtered.filter(
        (contact) => contact.country.toLowerCase() === filters.country.toLowerCase()
      );
    }

    // Apply job title filter
    if (filters.jobTitle) {
      filtered = filtered.filter(
        (contact) => contact.jobTitle.toLowerCase() === filters.jobTitle.toLowerCase()
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(
        (contact) => contact.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(
        (contact) => new Date(contact.createdAt) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(
        (contact) => new Date(contact.createdAt) <= new Date(filters.dateRange.end)
      );
    }

    setFilteredContacts(filtered);
  };

  const handleFilterChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFilters(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      country: "",
      jobTitle: "",
      status: "",
      dateRange: {
        start: "",
        end: "",
      },
    });
    setSearchName(""); // Clear search name as well
  };

  // Get unique values for dropdowns
  const uniqueCountries = [...new Set(contacts.map(contact => contact.country))];
  const uniqueJobTitles = [...new Set(contacts.map(contact => contact.jobTitle))];

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleSendEmail = (contact) => {
    setSelectedEmailRecipient({
      id: contact._id,
      email: contact.email,
      name: contact.name
    });
    setShowEmailModal(true);
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

  const handleUpdateStatus = async (contactId, newStatus) => {
    try {
      const response = await api.put(`/api/v1/contacts/${contactId}/status`, {
        status: newStatus
      });

      if (response.success) {
        // Update contacts list with new status
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact._id === contactId
              ? { ...contact, status: newStatus }
              : contact
          )
        );

        // Update selected contact if in modal
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  const handleEmailSent = async (success) => {
    if (success && selectedEmailRecipient?.id) {
      await handleUpdateStatus(selectedEmailRecipient.id, "completed");
    }
    setShowEmailModal(false);
    setSelectedEmailRecipient(null);
  };

  const handleReload = async () => {
    setIsReloading(true);
    try {
      await fetchContacts();
      // Reset filters
      setFilters({
        country: "",
        jobTitle: "",
        status: "",
        dateRange: {
          start: "",
          end: "",
        },
      });
    } catch (error) {
      console.error('Error reloading data:', error);
    } finally {
      setIsReloading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-error">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* All Inquiries Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">All Inquires</p>
              <h3 className="text-2xl font-bold text-gray-700">{stats.allInquiries}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaInbox className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Blog Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Blog</p>
              <h3 className="text-2xl font-bold text-gray-700">{stats.blogs}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaBlog className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Not Completed Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Not-Completed</p>
              <h3 className="text-2xl font-bold text-gray-700">{stats.notCompleted}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaClock className="text-yellow-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <h3 className="text-2xl font-bold text-gray-700">{stats.completed}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaCheck className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center">Contact Submissions</h1>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex justify-end gap-2 items-center">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search by name..."
              className="input input-bordered w-full pr-10"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleReload}
            className={`btn btn-primary ${isReloading ? 'loading' : ''}`}
            disabled={isReloading}
          >
            <FaSync className={`mr-2 ${isReloading ? 'animate-spin' : ''}`} />
            {isReloading ? 'Reloading...' : 'Reload'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-primary"
          >
            <FaFilter className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="bg-base-200 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Country Filter */}
              <div>
                <label className="label">Country</label>
                <select
                  className="select select-bordered w-full"
                  value={filters.country}
                  onChange={(e) => handleFilterChange("country", e.target.value)}
                >
                  <option value="">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Title Filter */}
              <div>
                <label className="label">Job Title</label>
                <select
                  className="select select-bordered w-full"
                  value={filters.jobTitle}
                  onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
                >
                  <option value="">All Job Titles</option>
                  {uniqueJobTitles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="label">Status</label>
                <select
                  className="select select-bordered w-full"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="label">Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={filters.dateRange.start}
                    onChange={(e) => handleFilterChange("dateRange.start", e.target.value)}
                  />
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={filters.dateRange.end}
                    onChange={(e) => handleFilterChange("dateRange.end", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={clearFilters} className="btn btn-ghost">
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </div>
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
              <th>Status</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.companyName}</td>
                <td>{contact.country}</td>
                <td>{contact.jobTitle}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status || 'Pending'}
                  </span>
                </td>
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
                      onClick={() => handleSendEmail(contact)}
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

      {filteredContacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No contact submissions found matching the current filters
        </div>
      )}

      {/* Details Modal */}
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
              <div>
                <h3 className="font-semibold">Status:</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                  {selectedContact.status || 'Pending'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">Submitted On:</h3>
                <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold">Message:</h3>
                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleSendEmail(selectedContact)}
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

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setSelectedEmailRecipient(null);
        }}
        onEmailSent={handleEmailSent}
        recipientEmail={selectedEmailRecipient?.email}
        recipientName={selectedEmailRecipient?.name}
        contactId={selectedEmailRecipient?.id}
      />
    </div>
  );
}

export default AdminOverview;
