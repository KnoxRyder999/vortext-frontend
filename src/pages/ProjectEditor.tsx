import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeProjetPage, projectActions } from '@/store/projectSlice';
import { Close } from '@radix-ui/react-toast';

const defaultProject = {
  name: '',
  description: '',
  category: '',
  client: '',
  clientPublic: true,
  skills: [],
  photos: [],
  video: null,
};

const ProjectEditor = () => {
  const { user, isLoggedIn } = useSelector(store => store['auth'])
  const { list, current, editFlag, selected } = useSelector(store => store['projects'])
  const [data, setData] = useState(editFlag && list.find(it => it.id === selected) || defaultProject);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>(data.photos || []);
  const [previewVideo, setPreviewVideo] = useState<string | null>(data.video || []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const skillbox = useRef();

  const handleChange = (field: string, value: any) => {
    if (field === 'photos') {
      setData(prev => ({ ...prev, photos: value }));
      const photoURLs = value.map((file: File) => URL.createObjectURL(file))
      setPreviewPhotos(photoURLs);
    } else if (field === 'video') {
      setData(prev => ({ ...prev, video: value }));
      if (value) setPreviewVideo(URL.createObjectURL(value));
      else setPreviewVideo(null);
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
  };

  const deletePhoto = idx => {
    setData(prev => ({ ...prev, photos: prev.photos.filter((it, id) => id !== idx) }));
    setPreviewPhotos(items => items.filter((it, id) => id !== idx));
  }

  const handleSave = async () => {
    if (!data.name) {
      alert("Name should be included.")
      return
    } else {
      let formData = new FormData();
      for (let key in data) {
        if (key === 'photos') {
          if (data[key].length > 0) {
            for (let p of data[key]) formData.append('photos', p)
          }
        } else formData.append(key, data[key]);
      }
      if (editFlag) {
        dispatch(projectActions.update(selected, formData))
          .then(res => navigate('/'))
      } else {
        dispatch(projectActions.create(formData))
          .then(res => navigate('/'))
      }
    }
  };

  const cancelHandler = () => {
    dispatch(closeProjetPage())
    navigate('/')
  }

  return ( isLoggedIn &&
    <div className="flex w-full  bg-gradient-to-b from-black to-gray-600 min-h-[100vh]">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800/50 hover:bg-gray-800/80 border-purple-900/50 border-[2px] text-[white] max-w-[600px] w-full shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-6 text-white">
          {editFlag ? "Edit " : 'Create A New '}Portfolio
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-300">Name</label>
            <input
              className="bg-[#334] w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data.name} required
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Description</label>
            <textarea
              className="w-full bg-[#334] border border-gray-300 rounded px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Category</label>
            <select
              className="w-full bg-[#334] text-[#777] border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data.category}
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
            <label className="block mb-1 font-medium text-gray-300">Client</label>
            <input
              className="w-full bg-[#334] border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data.client}
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
            <label htmlFor="clientPublic" className="text-sm text-gray-300">
              Publicly show client name
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Skills (comma-separated)</label>
            <div className="flex flex-wrap w-full gap-4 text-white">
              {
                data.skills.map((item, idx) =>
                  <div className="flex" key={idx + "skill"}>
                    <div className="flex bg-primary py-1 rounded-full px-4"> {item}
                    </div>
                    <span className='rounded-full text-[10px] pt-2 bg-[#830] px-3 py-1 hover:scale-[1.2] transition-transform cursor-pointer duration-[0.5s] text-[#ff0] text-bolder'
                      onClick={e => { handleChange('skills', data.skills.filter((it, i) => i !== idx)) }}
                    >X</span>
                  </div>
                )
              }
              <div className="flex w-full gap-10">
                <input className="bg-[#334] w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" ref={skillbox} />
                <button className="flex bg-[#090] rounded-[5px] px-4 pt-1"
                  onClick={e => { handleChange('skills', data.skills.concat(skillbox.current.value)) }}
                > Add </button>
              </div>

            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-300">Upload Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleChange('photos', Array.from(e.target.files || []))}
              className="block w-full text-sm text-gray-300 border border-gray-300 rounded cursor-pointer focus:outline-none"
            />
          </div>

          {/* Show photo previews */}
          {previewPhotos.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {previewPhotos.map((url, idx) => (
                <div className="relative" key={idx + "photos"}>
                  <div className="absolute w-full h-full flex justify-center items-center">
                    <span className='text-[30px] hover:scale-[4] transition-transform cursor-pointer duration-[0.5s] text-[#ff0] text-bolder' onClick={() => deletePhoto(idx)}>X</span>
                  </div>
                  <img
                    key={idx}
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Video Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-300">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleChange('video', e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-300 border border-gray-300 rounded cursor-pointer focus:outline-none"
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
            > {editFlag ? "Edit" : "Create a New"} Project
            </button>
            <button
              onClick={cancelHandler}
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
