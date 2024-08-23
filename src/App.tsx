import './App.css';
import { Header } from './cmps/Header';
import { ZodiacList } from './cmps/ZodiacList';
import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';


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

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);


  return (

      <div className='flex justify-center'>
        <div className='w-full bg-gray-900 text-white h-screen font-bold flex flex-col max-w-xl'>
          <Header  />
          <ZodiacList />
        </div>
      </div>
 
  );
} 