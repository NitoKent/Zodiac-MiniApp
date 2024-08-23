interface Translations {
    [key: string]: {
      [key: string]: string;
    };
  }
  
  export const translations: Translations = {
    en: {
      appTitle: 'Zodiac App',
      aries: 'Aries',
      taurus: 'Taurus',
      gemini: 'Gemini',
      cancer: 'Cancer',
      leo: 'Leo',
      virgo: 'Virgo',
      libra: 'Libra',
      scorpio: 'Scorpio',
      sagittarius: 'Sagittarius',
      capricorn: 'Capricorn',
      aquarius: 'Aquarius',
      pisces: 'Pisces',
      horoscope: 'Daily Horoscope',
      close: 'Close',
      loading: 'Loading...',
      number: 'Number',
      color: 'Color',
      strength: 'Strength',
      weakness: 'Weakness',
      welcomeMessage: 'Welcome, {name}!',
      guestMessage: 'Welcome, Guest!',
    },
    ru: {
      appTitle: 'Зодиак',
      aries: 'Овен',
      taurus: 'Телец',
      gemini: 'Близнецы',
      cancer: 'Рак',
      leo: 'Лев',
      virgo: 'Дева',
      libra: 'Весы',
      scorpio: 'Скорпион',
      sagittarius: 'Стрелец',
      capricorn: 'Козерог',
      aquarius: 'Водолей',
      pisces: 'Рыбы',
      horoscope: 'Ежедневный Гороскоп',
      close: 'Закрыть',
      loading: 'Загрузка...',
      number: 'Номер',
      color: 'Цвет',
      strength: 'Сила',
      weakness: 'Слабость',
      welcomeMessage: 'Добро пожаловать, {name}!',
      guestMessage: 'Добро пожаловать, Гость!',
    },
  };
  
  export const translate = (key: string, language: string, params?: { [key: string]: string }) => {
    let translation = translations[language]?.[key] || translations['en'][key];
    
    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, params[paramKey]);
      });
    }
    
    return translation;
  };
  