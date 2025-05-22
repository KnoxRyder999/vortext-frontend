import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/userModalSlice'; // adjust path to your store type
import { closeUserModal } from '../slices/modalSlice'; // adjust path

type UserFormData = {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
};

const UserModal: React.FC<{ onSubmit: (data: UserFormData) => void }> = ({ onSubmit }) => {
  const isOpen = useSelector((state: RootState) => state.modal.userModalOpen);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files) {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    dispatch(closeUserModal());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
          />

          {formData.avatar && (
            <img
              src={URL.createObjectURL(formData.avatar)}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full object-cover mx-auto mt-2"
            />
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => dispatch(closeUserModal())}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
