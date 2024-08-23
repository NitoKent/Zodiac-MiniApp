import axios, { AxiosResponse } from 'axios';

// Константы для API и повторных попыток
const API_URL = 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/';
const API_KEY = '3eca91e577msh4fe29c1f6498403p18f85bjsnb1762ff64b6f';
const MAX_RETRIES = 3; // Максимальное количество попыток
const RETRY_DELAY = 2000; // Задержка между попытками в миллисекундах

export interface HoroscopeData {
  status: boolean;
  prediction: string;
  number: string;
  color: string;
  strength: string;
  weakness: string;
}

export interface ZodiacSign {
  name: string;
  period: string;
  img: string;
}

// Функция для получения гороскопа
export const getHoroscope = async (zodiacSign: string, retries = 0): Promise<HoroscopeData | null> => {
  try {
    const response: AxiosResponse<HoroscopeData> = await axios.get(API_URL, {
      params: { zodiacSign },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error: any) {
    // Если ошибка 429 и количество попыток не превышено, пробуем снова
    if (error.response?.status === 429 && retries < MAX_RETRIES) {
      console.warn(`Rate limit exceeded. Retrying in ${RETRY_DELAY / 2000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return getHoroscope(zodiacSign, retries + 1);
    } else {
      console.error("Error fetching horoscope:", error);
      return null;
    }
  }
};
