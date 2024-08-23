import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getHoroscope, HoroscopeData } from '../service/zodiacApi';
import { ZodiacDetails } from './ZodiacDetails';
import zodiacImages from '../service/zodiacImages';
import { translate } from '../service/translations'; 

interface ZodiacSign {
  name: string;
  period: string;
  img: string;
}

const getFormattedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
  return date.toLocaleDateString('en-US', options).replace('.', '');
};

const today = new Date();
const todayFormatted = getFormattedDate(today);


const zodiacSigns: ZodiacSign[] = [
  { name: 'aries', period: todayFormatted, img: zodiacImages.Aries },
  { name: 'taurus', period: todayFormatted, img: zodiacImages.Taurus },
  { name: 'gemini', period: todayFormatted, img: zodiacImages.Gemini },
  { name: 'cancer', period: todayFormatted, img: zodiacImages.Cancer },
  { name: 'leo', period: todayFormatted, img: zodiacImages.Leo },
  { name: 'virgo', period: todayFormatted, img: zodiacImages.Virgo },
  { name: 'libra', period: todayFormatted, img: zodiacImages.Libra },
  { name: 'scorpio', period: todayFormatted, img: zodiacImages.Scorpio },
  { name: 'sagittarius', period: todayFormatted, img: zodiacImages.Sagittarius },
  { name: 'capricorn', period: todayFormatted, img: zodiacImages.Capricorn },
  { name: 'aquarius', period: todayFormatted, img: zodiacImages.Aquarius },
  { name: 'pisces', period: todayFormatted, img: zodiacImages.Pisces },
];

export function ZodiacList() {
  const language = useSelector((state: RootState) => state.language.value);
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSignClick = async (sign: ZodiacSign) => {
    try {
      const data = await getHoroscope(sign.name, language === 'en' ? 'translated' : 'original', 'today');
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
              <h1 className='text-lg text-orange-300'>{translate(sign.name, language)}</h1>
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
