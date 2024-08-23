import './App.css';
import { Header } from './cmps/Header';
import { ZodiacList } from './cmps/ZodiacList';
import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useDispatch } from 'react-redux';
import { setLanguage } from './store/slices/languageSlice';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      const userLanguage = user.language_code;

      // Установите язык в Redux, если это 'ru', иначе 'en'
      if (userLanguage === 'ru') {
        dispatch(setLanguage('ru'));
      } else {
        dispatch(setLanguage('en'));
      }
    }
  }, [dispatch]);

  return (
    <div className='flex justify-center'>
      <div className='w-full bg-gray-900 text-white h-screen font-bold flex flex-col max-w-xl'>
        <Header userData={userData} />
        <ZodiacList />
      </div>
    </div>
  );
}
