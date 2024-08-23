import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';
import { translate } from '../service/translations';
import { RootState, AppDispatch } from '../store/store';

interface HeaderProps {
  userData: UserData | null;
}

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export function Header({ userData }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: RootState) => state.language.value);

  // Функция для переключения языка
  const toggleLanguage = () => {
    dispatch(setLanguage(language === 'en' ? 'ru' : 'en'));
  };

  return (
    <header className='flex p-4 items-center'>
      <div className='flex flex-col'>
        <h1 className='text-xl font-bold'>
          {translate('appTitle', language)}
        </h1>
        <p className='text-blue-400'>
          {userData
            ? translate('welcomeMessage', language, { name: userData.first_name })
            : translate('guestMessage', language)}
        </p>
      </div>
      <button
        onClick={toggleLanguage}
        className='ml-auto border rounded-xl px-4 py-2 text-xl'
      >
        {language === 'en' ? 'RU' : 'EN'}
      </button>
    </header>
  );
}
