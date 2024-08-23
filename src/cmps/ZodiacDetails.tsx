import React from 'react';
import { HoroscopeData } from '../service/zodiacApi.ts';

// Типы пропсов для компонента
interface ZodiacDetailsProps {
  sign: {
    name: string;
    period: string;
    img: string;
  };
  data: HoroscopeData;
  onClose: () => void;
}

export const ZodiacDetails: React.FC<ZodiacDetailsProps> = ({ sign, data, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center p-2 items-center z-50'>
      <div className='bg-black p-8 rounded-lg max-w-96 w-full relative'>
        <button onClick={onClose} className='absolute top-2 right-2 text-white-600'>
          &#x2715; {/* Иконка закрытия */}
        </button>
        <h2 className='text-blue-300 text-2xl font-bold mb-4'><b className='text-orange-300'>{sign.name}</b> - Daily Horoscope</h2>
        <p><strong className='text-blue-300'>Prediction:</strong> {data.prediction}</p>
        <p><strong className='text-blue-300'>Lucky Numbers:</strong> {data.number}</p>
 
        <p><strong className='text-blue-300'>Weaknesses:</strong> {data.weakness}</p>
      </div>
    </div>
  );
};
