import { useEffect } from 'react';
import { HoroscopeData } from '../service/zodiacApi.ts';

interface ZodiacDetailsProps {
  sign: {
    name: string;
    period: string;
    img: string;
  };
  data: HoroscopeData;
  onClose: () => void; 
}

export function ZodiacDetails({ sign, data, onClose }: ZodiacDetailsProps) {

  useEffect(() => {
    if (window.TelegramWebviewProxy) {
     
      window.TelegramWebviewProxy.postEvent('web_app_setup_back_button', { is_visible: true });

      const handleMessage = (event: MessageEvent) => {
        const messageData = JSON.parse(event.data);
        if (messageData.eventType === 'back_button_pressed') {
          onClose(); 
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        window.TelegramWebviewProxy?.postEvent('web_app_setup_back_button', { is_visible: false });
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [onClose]);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center p-2 items-center z-50'>
      <div className='bg-black p-8 rounded-lg max-w-96 w-full relative'>
        <button onClick={onClose} className='absolute text-2xl top-2 right-2 text-white-200'>
          &#x2715; 
        </button>
        <img src={sign.img} alt={sign.name} className="w-24 h-24 mx-auto mb-4" />
        <h2 className='text-blue-300 text-2xl font-bold mb-4 font-xl'>
          <b className='text-orange-300'>{sign.name}</b> - Daily Horoscope
        </h2>
        <p className='mb-4'><strong className='text-blue-300'>Horoscope:</strong> {data.horoscope}</p>
      </div>
    </div>
  );
}


