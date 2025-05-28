import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Edit } from 'lucide-react';
import { userApi } from '@/store/authSlice';

const Profile = () => {
    const { isLoggedIn, user } = useSelector(store => store['auth'])
    const [userInfo, setUserInfo] = useState(user)
    const [pending, setPending] = useState(false)
    const [enableChangePassword, setEnableChangePassword] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const inputHandler = async (key, value) => {
        if (key === "avatar") {
            setPending(true)
            document.body.style.pointerEvents = 'none'
            document.body.classList.add('loading')
            let formData = new FormData();
            formData.append("file", value)
            formData.append("upload_preset", "vortexbytes")
            const response = await fetch("https://api.cloudinary.com/v1_1/djta4ar8o/upload", { method: "POST", body: formData, });
            if (!response.ok) throw new Error(`Upload failed with status: ${response.status}`);
            const res = await response.json();
            setUserInfo(prev => ({ ...prev, [key]: res.secure_url }))
            setPending(false)
            document.body.style.pointerEvents = 'auto'
            document.body.classList.remove('loading')
        } else setUserInfo(prev => ({ ...prev, [key]: value }))
        if (key === 'changepassword') setEnableChangePassword(!enableChangePassword)
    }

    const handleSave = () => {
        if (pending) return
        if (enableChangePassword && userInfo.newpassword !== userInfo.confirmpassword) {
            alert('Confirm password, please')
            return
        }
        dispatch(userApi.update(user.id, userInfo))
        navigate('/')
    }

    return (isLoggedIn &&
        <div className="flex w-full justify-center items-center bg-gradient-to-b from-black to-gray-600 min-h-[100vh] p-10">
            <div className="fixed top-6 left-10 h-[40px] w-[100px] bg-[#234] border-[1px] border-[#527] rounded-[5px] center cursor-pointer hover:bg-[#777] text-[#ff0]"
                onClick={() => navigate('/')}>Back
            </div>
            <button className="fixed top-6 right-10 h-[40px] w-[100px] bg-[#253] border-[1px] border-[#527] rounded-[5px] center cursor-pointer hover:bg-[#777] text-[#fa6]"
                disabled={pending}
                onClick={handleSave}>Change
            </button>
            <div className="flex flex-wrap max-w-[1000px] w-full gap-10 text-white justify-between items-center px-16">
                <label className="relative cursor-pointer">
                    <input type="file" className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('avatar', e.target.files[0])} hidden />
                    <Edit className='absolute right-12  bottom-12' />
                    <img src={userInfo.avatar} alt="avatar" className='w-[300px] h-[300px] rounded-full border-[2px] border-[#604]' />
                </label>
                <div className="flex flex-col gap-8 text-[16px] w-[450px] max-h-[600px] overflow-auto border-[1px] border-[#725] p-8  bg-gray-800/50 hover:bg-gray-800/80">
                    <label className='flex justify-between w-full'>
                        <span>Name : </span>
                        <input type="text" required className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('name', e.target.value)} defaultValue={user.name} />
                    </label>
                    <label className='flex justify-between w-full'>
                        <span>Email : </span>
                        <input type="email" required className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('email', e.target.value)} defaultValue={user.email} />
                    </label>
                    <label className='flex justify-between w-full'>
                        <span>Role : </span>
                        <input type="text" required className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('role', e.target.value)} defaultValue={user.role} />
                    </label>
                    <label className='flex justify-between w-full'>
                        <span>Skills : </span>
                        <input type="text" required className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('skill', e.target.value)} defaultValue={user.skill} />
                    </label>
                    <label className='flex justify-between w-full'>
                        <span>Password : </span>
                        <input type="password" className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('password', e.target.value)} />
                    </label>
                    <label className='flex justify-between w-full cursor-pointer'>
                        Change Your Password :
                        <input type="checkbox" className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('changepassword', e.target.checked)} />
                    </label>
                    {enableChangePassword &&
                        <>
                            <label className='flex justify-between w-full'>
                                <span>New Password : </span>
                                <input type="password" className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('newpassword', e.target.value)} />
                            </label>
                            <label className='flex justify-between w-full'>
                                <span>Confirm Password : </span>
                                <input type="password" className='px-1 outline-none border-[3px] focus:border-[#6af] text-[#222]' onChange={e => inputHandler('confirmpassword', e.target.value)} />
                            </label>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
