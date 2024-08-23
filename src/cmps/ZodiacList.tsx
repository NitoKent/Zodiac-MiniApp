import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getHoroscope, HoroscopeData } from '../service/zodiacApi';
import { ZodiacDetails } from './ZodiacDetails';
import zodiacImages from '../service/zodiacImages';
import { translate } from '../service/translations'; // Импорт функции translate

interface ZodiacSign {
  name: string;
  period: string;
  img: string;
}

export function ZodiacList() {
  const language = useSelector((state: RootState) => state.language.value); // Используем язык из состояния Redux
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Определение знаков зодиака с учетом перевода
  const zodiacSigns: ZodiacSign[] = [
    { name: translate('aries', language), period: '21 Mar - 19 Apr', img: zodiacImages.Aries },
    { name: translate('taurus', language), period: '20 Apr - 20 May', img: zodiacImages.Taurus },
    { name: translate('gemini', language), period: '21 May - 20 Jun', img: zodiacImages.Gemini },
    { name: translate('cancer', language), period: '21 Jun - 22 Jul', img: zodiacImages.Cancer },
    { name: translate('leo', language), period: '23 Jul - 22 Aug', img: zodiacImages.Leo },
    { name: translate('virgo', language), period: '23 Aug - 22 Sep', img: zodiacImages.Virgo },
    { name: translate('libra', language), period: '23 Sep - 22 Oct', img: zodiacImages.Libra },
    { name: translate('scorpio', language), period: '23 Oct - 21 Nov', img: zodiacImages.Scorpio },
    { name: translate('sagittarius', language), period: '22 Nov - 21 Dec', img: zodiacImages.Sagittarius },
    { name: translate('capricorn', language), period: '22 Dec - 19 Jan', img: zodiacImages.Capricorn },
    { name: translate('aquarius', language), period: '20 Jan - 18 Feb', img: zodiacImages.Aquarius },
    { name: translate('pisces', language), period: '19 Feb - 20 Mar', img: zodiacImages.Pisces },
  ];

  const handleSignClick = async (sign: ZodiacSign) => {
    try {
      const data = await getHoroscope(
        sign.name.toLowerCase(),
        language === 'en' ? 'translated' : 'original',
        'today'
      );
      if (data) {
        setHoroscopeData(data);
        setSelectedSign(sign);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching horoscope data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSign(null);
    setHoroscopeData(null);
  };

  return (
    <div className='flex-grow mt-9 bg-[#fcfcfc] rounded-t-[46px] relative top-glow z-0'>
      <div className='overflow-y-auto absolute top-[3px] left-0 right-0 bottom-0 bg-[#111418] rounded-t-[44px] p-4'>
        <div className='grid grid-cols-3 gap-4 mt-4'>
          {zodiacSigns.map((sign) => (
            <div
              key={sign.name}
              className='bg-gradient-to-t from-blue-400 to-slate-800 border-none rounded-xl h-44 text-center text-white flex flex-col justify-center items-center cursor-pointer'
              onClick={() => handleSignClick(sign)}
            >
              <h1 className='text-lg text-orange-300'>{sign.name}</h1>
              <p className='text-sm'>{sign.period}</p>
              <img src={sign.img} alt={sign.name} className='mt-auto mb-2 w-24 h-24' />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedSign && horoscopeData && (
        <ZodiacDetails
          sign={selectedSign}
          data={horoscopeData}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
