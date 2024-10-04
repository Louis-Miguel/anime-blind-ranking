"use client"
import React, { useState } from 'react';

const items = [
  { name: "Dere Characters", image: "/images/item1.jpg" },
  { name: "Overpowered Protagonist", image: "/images/item2.jpg" },
  { name: "Power of Friendship", image: "/images/item3.jpg" },
  { name: "Tragic Anime Backstory", image: "/images/item4.jpg" },
  { name: "Absent or Dead Parents", image: "/images/item5.jpg" },
  { name: "Signature Attacks", image: "/images/item6.jpg" },
  { name: "Tournament Arc", image: "/images/item8.jpg" },
  { name: "Power-up", image: "/images/item9.jpg" },
  { name: "Inner Monologue", image: "/images/item10.jpg" },
  { name: "Transported to Another World", image: "/images/item11.jpg" },
];

export default function Home() {
  const [ranking, setRanking] = useState(Array(5).fill(null)); 
  const [remainingItems, setRemainingItems] = useState([...items]);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemPulled, setItemPulled] = useState(false); 

  const pickRandomItem = () => {
    if (remainingItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingItems.length);
      const selectedItem = remainingItems[randomIndex];
      setCurrentItem(selectedItem);
      setItemPulled(true); 
    }
  };

  const rankItem = (position) => {
    if (currentItem && ranking[position] === null) { 
      const newRanking = [...ranking];
      newRanking[position] = currentItem;
      setRanking(newRanking);
      setRemainingItems(remainingItems.filter(item => item !== currentItem));
      setCurrentItem(null);
      setItemPulled(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-white">Anime Tropes Blind Ranking</h1>

      {ranking.includes(null) ? (
        <div className="w-1/3 bg-gray-700 p-6 rounded shadow-md"> 
          <h2 className="text-xl font-semibold mb-4 text-white">Randomly Select an Item:</h2>
          
          {!itemPulled ? (
            <button
              onClick={pickRandomItem}
              className="px-4 py-2 bg-[#4F8A8B] text-white rounded hover:bg-[#3C6E71] transition-all w-full mb-4"
            >
              Pull Random Item
            </button>
          ) : (
            <div className="mb-4">
              <div className="p-4 border-2 border-[#008087] rounded-lg text-white flex flex-col items-center">
                <img src={currentItem.image} alt={currentItem.name} className="h-40 w-40 mb-2 rounded-lg object-cover" />
                <span>{currentItem.name}</span>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {[1, 2, 3, 4, 5].map((rank, index) => (
                  <button
                    key={index}
                    onClick={() => rankItem(index)} 
                    className={`px-4 py-2 rounded 
                      ${ranking[index] === null ? 'bg-[#4F8A8B] hover:bg-[#3C6E71] text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}
                    `}
                    disabled={ranking[index] !== null} 
                  >
                    {rank}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-1/3 bg-gray-700 p-6 rounded shadow-md"> 
          <h2 className="text-[40px] font-semibold mb-4 text-white text-center">Ranking Completed! Thank You For Listening!</h2>
        </div>
      )}

      <div className="mt-8 w-1/2 bg-gray-700 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Rankings:</h2>
        <div className="grid grid-cols-5 gap-4 text-white">
          {ranking.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-lg font-bold">{index + 1}</span>
              <div className="border-2 border-[#008087] rounded-lg h-32 w-32 flex flex-col items-center justify-center relative">
                {item ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">Empty</div>
                )}
              </div>
              {item && <span className="text-xl mt-1 text-center">{item.name}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  







