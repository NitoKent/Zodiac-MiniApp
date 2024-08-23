import  { useState } from 'react';
import '../App.css';
import libraImage from '../assets/libra.png';
import taurusImage from '../assets/taurus.png'
import ariesImage from '../assets/aries.png'
import geminiImage from '../assets/gemini.png'
import cancerImage from '../assets/cancer.png'
import leoImage from '../assets/leo.png'
import virgoImage from '../assets/virgo.png'
import scorpioImage from '../assets/scorpio.png'
import sagittariusImage from '../assets/sagittarius.png'
import capricornImage from '../assets/capricorn.png'
import aquariusImage from '../assets/aquarius.png'
import piscesImage from '../assets/pisces.png'
import { getHoroscope, HoroscopeData } from '../service/zodiacApi.ts';
import { ZodiacDetails } from './ZodiacDetails';

// Типизация знаков зодиака
interface ZodiacSign {
    name: string;
    period: string;
    img: string;
}

// Массив знаков зодиака с типизацией
const zodiacSigns: ZodiacSign[] = [
    { name: 'Aries', period: '23 Aug', img: ariesImage },
    { name: 'Taurus', period: '20 Apr - 20 May', img: taurusImage },
    { name: 'Gemini', period: '21 May - 20 Jun', img: geminiImage },
    { name: 'Cancer', period: '21 Jun - 22 Jul', img: cancerImage },
    { name: 'Leo', period: '23 Jul - 22 Aug', img: leoImage },
    { name: 'Virgo', period: '23 Aug - 22 Sep', img: virgoImage },
    { name: 'Libra', period: '23 Sep - 22 Oct', img: libraImage },
    { name: 'Scorpio', period: '23 Oct - 21 Nov', img: scorpioImage },
    { name: 'Sagittarius', period: '22 Nov - 21 Dec', img: sagittariusImage },
    { name: 'Capricorn', period: '22 Dec - 19 Jan', img: capricornImage },
    { name: 'Aquarius', period: '20 Jan - 18 Feb', img: aquariusImage },
    { name: 'Pisces', period: '19 Feb - 20 Mar', img: piscesImage },
];

export function ZodiacList() {
    const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
    const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSignClick = async (sign: ZodiacSign) => {
        const data = await getHoroscope(sign.name.toLowerCase());
        if (data) {
            setHoroscopeData(data);
            setSelectedSign(sign);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSign(null);
        setHoroscopeData(null);
    };

    return (
        <div className=' flex-grow  mt-9 bg-[#fcfcfc] rounded-t-[46px] relative top-glow z-0'>
            <div className=' overflow-y-auto absolute top-[3px] left-0 right-0 bottom-0 bg-[#111418] rounded-t-[44px] p-4'>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {zodiacSigns.map((sign) => (
                        <div
                            key={sign.name}
                            className="bg-gradient-to-t from-blue-400 to-slate-800 border-none rounded-xl h-44 text-center text-white flex flex-col justify-center items-center cursor-pointer"
                            onClick={() => handleSignClick(sign)}
                        >
                            <h1 className="text-lg text-orange-300">{sign.name}</h1>
                            <p className="text-sm">{sign.period}</p>
                            <img src={sign.img} alt={sign.name} className="mt-auto mb-2 w-24 h-24" />
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && selectedSign && horoscopeData && (
                <ZodiacDetails sign={selectedSign} data={horoscopeData} onClose={closeModal} />
            )}
        </div>
    );
}
