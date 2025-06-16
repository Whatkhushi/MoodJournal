// import React from 'react';

// const MoodSelector = ({ selectedMood, onMoodSelect }) => {
//   const moods = [
//     { emoji: '😢', label: 'Very Sad', value: 1 },
//     { emoji: '😔', label: 'Sad', value: 2 },
//     { emoji: '😐', label: 'Neutral', value: 3 },
//     { emoji: '🙂', label: 'Happy', value: 4 },
//     { emoji: '😄', label: 'Very Happy', value: 5 }
//   ];

//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-medium text-gray-700">
//         How are you feeling?
//       </label>
//       <div className="flex justify-center space-x-4">
//         {moods.map(({ emoji, label, value }) => (
//           <button
//             key={value}
//             onClick={() => onMoodSelect(value)}
//             className={`p-3 rounded-full text-2xl transition-all hover:scale-110 ${
//               selectedMood === value
//                 ? 'bg-blue-100 ring-4 ring-blue-300'
//                 : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//             title={label}
//           >
//             {emoji}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoodSelector;