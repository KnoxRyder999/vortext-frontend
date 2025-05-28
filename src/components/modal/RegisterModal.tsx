import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalSlice, showModalSlice } from '@/store/userModalSlice'; // adjust path
import { userApi } from '@/store/authSlice';

const RegisterModal: React.FC = () => {

    const isRegister = useSelector(state => state['modal'].show1);
    const isLogin = useSelector(state => state['modal'].show2);
    const { register, login } = userApi;
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null,
    });

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files) {
            document.body.style.pointerEvents = 'none'
            document.body.classList.add('loading')
            let formData = new FormData()
            formData.append('file', files[0])
            formData.append("upload_preset", "vortexbytes")
            const response = await fetch("https://api.cloudinary.com/v1_1/djta4ar8o/upload", { method: "POST", body: formData, });
            if (!response.ok) throw new Error(`Upload failed with status: ${response.status}`);
            const res = await response.json();
            setUserData({ ...userData, avatar: res.secure_url });
            document.body.style.pointerEvents = 'auto'
            document.body.classList.remove('loading')
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    if (!(isRegister | isLogin)) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {
                isRegister ?
                    <div className="bg-primary p-12 border-[1px] flex flex-col gap-4 border-border rounded-xl w-full max-w-md shadow-lg relative">
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl pt-5 font-semibold">Register</h2>
                            <label className='cursor-pointer float-right' >
                                <img
                                    src={userData.avatar || "add-man.svg"}
                                    alt="Avatar preview"
                                    className="w-[100px] h-[100px] rounded-full border-[1px] border-[#558] object-cover mx-auto hover:border-border"
                                />
                                <input
                                    hidden
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    className="w-full"
                                    onChange={handleChange}
                                />
                            </label>

                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            className="w-full border text-[#222] px-3 py-2 rounded"
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full text-[#222] border px-3 py-2 rounded"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full text-[#222] px-3 py-2 rounded focus:ring"
                            onChange={handleChange}
                        />
                        <div className="flex justify-between space-x-2 mt-4">
                            <button
                                onClick={() => dispatch(closeModalSlice())}
                                className="px-4 py-2 border rounded w-[40%] hover:bg-destructive "
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-agree text-white w-[40%] rounded hover:bg-hover"
                                onClick={() => dispatch(register(userData))}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                    :
                    <div className="bg-primary p-12 border-[1px] flex flex-col gap-4 border-border rounded-xl w-full max-w-md shadow-lg relative">
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl pt-4 pl-6 font-semibold">Log In</h2>
                            <button
                                className=" bg-[#080] text-white w-[40%] rounded hover:bg-[#0a0]"
                                onClick={() => dispatch(showModalSlice())}
                            >
                                Register
                            </button>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full text-[#222] border px-3 py-2 rounded"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full text-[#222] px-3 py-2 rounded focus:ring"
                            onChange={handleChange}
                        />
                        <div className="flex justify-between space-x-2 mt-4">
                            <button
                                onClick={() => dispatch(closeModalSlice())}
                                className="px-4 py-2 border rounded w-[40%] hover:bg-destructive "
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-agree text-white w-[40%] rounded hover:bg-hover"
                                onClick={() => dispatch(login(userData))}
                            >
                                Log In
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default RegisterModal;