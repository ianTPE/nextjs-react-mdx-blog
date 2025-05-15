import React from 'react';

const KeyIndicatorCards = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">關鍵指標提升效果</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
          <div className="text-gray-600">需求準確率</div>
          <div className="text-sm text-gray-500 mt-2">↑ 41.5% 提升</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">50%</div>
          <div className="text-gray-600">開發週期縮短</div>
          <div className="text-sm text-gray-500 mt-2">從12週到6週</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">3.2x</div>
          <div className="text-gray-600">投資回報率</div>
          <div className="text-sm text-gray-500 mt-2">18個月內實現</div>
        </div>
      </div>
    </div>
  );
};

export default KeyIndicatorCards;