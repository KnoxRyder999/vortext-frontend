import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const defaultProject = {
    name: 'VB Advanced Jobs System',
    description: 'A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.',
    category: 'SCRIPTS',
    client: 'MidwestRP',
    clientPublic: true,
    skills: ['QBCore', 'ESX Compatible', 'Lua', 'HTML/CSS/JS'],
    photos: ['vortex-1.png', 'vortex-2.png', 'vortex-3.png', 'vortex-4.png'],
    video: 'night-city-in-gta-5.1920x1080.mp4',
};

const Demo = () => {
    const { list, current, editFlag, selected } = useSelector(store => store['projects'])

    const navigate = useNavigate();
    const { id } = useParams();
    const demo = list[id] || defaultProject
    console.log(demo);
    
    return ( demo &&
        <div className="flex w-full  bg-gradient-to-b from-black to-gray-600 min-h-[100vh] p-10">
            <div className="fixed top-6 left-10 h-[40px] w-[100px] bg-[#444] rounded-[10px] center cursor-pointer hover:bg-[#777] text-[#ff0]"
            onClick={() => navigate('/')}>BACK</div>
            <div className="flex max-w-[600px] gap-10 flex-col text-white justify-center items-center px-16">
                <h1 className='text-6xl text-center' > {demo.name} </h1>
                {demo.clientPublic === 0 && <h3 className='text-xl'> Client: {demo.client} </h3>}
                <h4 className='text-xl'> {demo.description} </h4>
                <div className="text-[20px] flex gap-5 flex-wrap">
                    {
                        demo.skills.map(item =>
                            <div className="flex gap-6" key={item + "skill"}>
                                {item}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col w-[1000px] gap-20">
                <div className="flex w-full">
                    <video
                        src={demo.video}
                        controls
                        autoPlay
                        loop
                        className="w-full rounded shadow border"
                    />
                </div>
                <div className="flex flex-wrap gap-5 w-full bg-gradient-to-r from-gray-900 to-gray-700 p-5 border-[#526] border-[1px] rounded-[10px]">
                    {
                        demo.photos.map((item, idx) => 
                            <img
                                src={item}
                                alt={item.name}
                                key={idx+"photo"}
                                className="w-[200px] border-[#660] border-[1px] rounded-[10px] object-cover object-center transition-transform duration-700 hover:scale-110"
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Demo;
