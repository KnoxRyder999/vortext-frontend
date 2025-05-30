import { showBankModalSlice } from "@/store/bankModalSlice";
import { baseURL } from "@/utils/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ item, index, handleService }) => {
  const { isLoggedIn, user } = useSelector(store => store['auth'])
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (id) => {
    setLoading(true);
    const res = await fetch(baseURL + '/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId: id }),
    });

    const data = await res.json();

    // dispatch(showBankModalSlice(data.url))
    window.location.href = data.url;
  };

  return (
    <div key={index}
      className="bg-gray-800/50 w-[300px] relative hoverview cursor-pointer">
      <div className="child1 mb-2 text-[#aaa]">
        <img src={item.photo} alt="cover" className="w-full h-[200px]" />
        <div className="flex justify-around items-center w-full">
          <span className="text-center text-[#aaa] text-xl font-bold text-white my-3">
            {item.name}
          </span>
          <span className="text-green-400 text-[22px]" >
            ${(item.price / 100).toFixed(2)}
          </span>
        </div>
        <button className="border-purple-600 hover:bg-purple-700 border-[1px] hover:text-white rounded-[5px] w-full h-10"
          disabled={loading}
          onClick={() => isLoggedIn && user.isAdmin > 0 ? handleService(item.id) : handleCheckout(item.id)}
        >{isLoggedIn && user.isAdmin > 0 ? 'Setting ' : 'Buy Now'}
        </button>
      </div>
      <div className="child2 absolute top-10 opacity-0 p-4 text-[20px]">
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
