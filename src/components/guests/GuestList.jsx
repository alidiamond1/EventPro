import { useState, useEffect } from 'react';
import {
  sampleGuests,
  guestStatusOptions,
  mealPreferences,
  guestGroups,
  tableAssignments,
  getStatusColor,
  generateGuestId,
  validateGuestEmail,
  validatePhoneNumber,
  suggestTable
} from '../../utils/guestData';

const GuestForm = ({ guest, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    guest || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'pending',
      group: '',
      mealPreference: 'standard',
      tableAssignment: null,
      plusOne: false,
      notes: ''
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!validateGuestEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        id: guest?.id || generateGuestId()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className={`w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className={`w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className={`w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            {guestStatusOptions.map(status => (
              <option key={status.id} value={status.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{status.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Group
          </label>
          <select
            value={formData.group}
            onChange={(e) => setFormData(prev => ({ ...prev, group: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Select Group</option>
            {guestGroups.map(group => (
              <option key={group.id} value={group.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{group.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meal Preference
          </label>
          <select
            value={formData.mealPreference}
            onChange={(e) => setFormData(prev => ({ ...prev, mealPreference: e.target.value }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            {mealPreferences.map(pref => (
              <option key={pref.id} value={pref.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{pref.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Table Assignment
          </label>
          <select
            value={formData.tableAssignment || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              tableAssignment: e.target.value ? Number(e.target.value) : null
            }))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Unassigned</option>
            {tableAssignments.map(table => (
              <option key={table.id} value={table.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{table.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="plusOne"
            checked={formData.plusOne}
            onChange={(e) => setFormData(prev => ({ ...prev, plusOne: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200"
          />
          <label htmlFor="plusOne" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Plus One
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows="3"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {guest ? 'Update Guest' : 'Add Guest'}
        </button>
      </div>
    </form>
  );
};

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [editingGuest, setEditingGuest] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [sortField, setSortField] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const savedGuests = localStorage.getItem('eventGuests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    } else {
      setGuests(sampleGuests);
      localStorage.setItem('eventGuests', JSON.stringify(sampleGuests));
    }
  }, []);

  useEffect(() => {
    if (guests.length > 0) {
      localStorage.setItem('eventGuests', JSON.stringify(guests));
    }
  }, [guests]);

  const handleSaveGuest = (guest) => {
    if (editingGuest) {
      setGuests(prev => prev.map(g => g.id === guest.id ? guest : g));
    } else {
      setGuests(prev => [...prev, guest]);
    }
    setShowForm(false);
    setEditingGuest(null);
  };

  const handleDeleteGuest = (guestId) => {
    if (confirm('Are you sure you want to delete this guest?')) {
      setGuests(prev => prev.filter(g => g.id !== guestId));
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = searchTerm === '' || 
      `${guest.firstName} ${guest.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === '' || guest.status === filterStatus;
    const matchesGroup = filterGroup === '' || guest.group === filterGroup;

    return matchesSearch && matchesStatus && matchesGroup;
  });

  const sortedGuests = [...filteredGuests].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Guest List</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Add Guest
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
          />
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">All Statuses</option>
            {guestStatusOptions.map(status => (
              <option key={status.id} value={status.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{status.label}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">All Groups</option>
            {guestGroups.map(group => (
              <option key={group.id} value={group.id} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{group.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guest Form */}
      {showForm && (
        <div className="mb-6">
          <GuestForm
            guest={editingGuest}
            onSave={handleSaveGuest}
            onCancel={() => {
              setShowForm(false);
              setEditingGuest(null);
            }}
          />
        </div>
      )}

      {/* Guest Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastName')}
              >
                Name
                {sortField === 'lastName' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Contact
                {sortField === 'email' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status
                {sortField === 'status' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('group')}
              >
                Group
                {sortField === 'group' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Table
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedGuests.map(guest => (
              <tr key={guest.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {guest.firstName} {guest.lastName}
                  </div>
                  {guest.plusOne && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      +1 Guest
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{guest.email}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{guest.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(guest.status)}-100 text-${getStatusColor(guest.status)}-800`}>
                    {guestStatusOptions.find(s => s.id === guest.status)?.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {guestGroups.find(g => g.id === guest.group)?.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {guest.tableAssignment ? `Table ${guest.tableAssignment}` : 'Unassigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingGuest(guest);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedGuests.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No guests found. Add some guests to get started.
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Guests',
            value: guests.length + guests.filter(g => g.plusOne).length
          },
          {
            label: 'Confirmed',
            value: guests.filter(g => g.status === 'confirmed').length
          },
          {
            label: 'Pending',
            value: guests.filter(g => g.status === 'pending').length
          },
          {
            label: 'Tables Assigned',
            value: guests.filter(g => g.tableAssignment).length
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center"
          >
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;