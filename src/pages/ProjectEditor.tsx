import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { projectActions } from '../store/projectSlice'; // adjust path as needed

const defaultProject = {
  name: '',
  description: '',
  category: '',
  client: '',
  clientPublic: 0,
  skills: '',
  photos: [],
  video: null,
};

const ProjectEditor = ({ isEditing = false, existingData = null }) => {
  const [data, setData] = useState(existingData || defaultProject);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleChange = (field: string, value: any) => {
    if (field === 'photos') {
      setData(prev => ({ ...prev, photos: value }));
      const photoURLs = value.map((file: File) => URL.createObjectURL(file));
      setPreviewPhotos(photoURLs);
    } else if (field === 'video') {
      setData(prev => ({ ...prev, video: value }));
      if (value) setPreviewVideo(URL.createObjectURL(value));
      else setPreviewVideo(null);
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('client', data.client);
    formData.append('clientPublic', String(data.clientPublic));
    formData.append('skills', data.skills);

    data.photos.forEach((file: File) => {
      formData.append('photos', file);
    });

    if (data.video) {
      formData.append('video', data.video);
    }

    // if (isEditing) {
    //   await dispatch(projectActions.updateMultipart(Number(id), formData));
    // } else {
    //   await dispatch(projectActions.createMultipart(formData));
    // }

    navigate('/projects');
  };

  return (
    <div className="flex w-full bg-primary min-h-[100vh]">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white max-w-[600px] w-full shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800"> 
          {isEditing ? 'Edit Project' : 'New Project'}
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.name} required
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">Select category</option>
              <option value="scripts">Scripts</option>
              <option value="mlo">MLO</option>
              <option value="ui">UI</option>
              <option value="server">Server</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Client</label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.client}
              onChange={(e) => handleChange('client', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={!!data.clientPublic}
              onChange={(e) => handleChange('clientPublic', e.target.checked ? 1 : 0)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              id="clientPublic"
            />
            <label htmlFor="clientPublic" className="text-sm text-gray-700">
              Publicly show client name
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Skills (comma-separated)</label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Upload Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleChange('photos', Array.from(e.target.files || []))}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none"
            />
          </div>

          {/* Show photo previews */}
          {previewPhotos.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {previewPhotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}

          {/* Video Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleChange('video', e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none"
            />
          </div>

          {/* Show video preview */}
          {previewVideo && (
            <div className="mt-4">
              <video
                src={previewVideo}
                controls
                className="w-full rounded shadow border"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
            >
              {isEditing ? 'Update' : 'Create'} Project
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
