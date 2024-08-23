import axios, { AxiosResponse } from 'axios';

// Константы для API
const API_URL = 'https://poker247tech.ru/get_horoscope/';
const MAX_RETRIES = 3; // Максимальное количество попыток
const RETRY_DELAY = 2000; // Задержка между попытками в миллисекундах

export interface HoroscopeData {
  sign: string;
  language: string;
  period: string;
  horoscope: string;
}

export const getHoroscope = async (sign: string, language: string = 'translated', period: string = 'today', retries = 0): Promise<HoroscopeData | null> => {
  try {
    const response: AxiosResponse<HoroscopeData> = await axios.post(API_URL, {
      sign,
      language,
      period
    });
    return response.data;
  } catch (error: any) {
    // Если ошибка и количество попыток не превышено, пробуем снова
    if (retries < MAX_RETRIES) {
      console.warn(`Error fetching horoscope. Retrying in ${RETRY_DELAY / 2000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return getHoroscope(sign, language, period, retries + 1);
    } else {
      console.error("Error fetching horoscope:", error);
      return null;
    }
  }
};
