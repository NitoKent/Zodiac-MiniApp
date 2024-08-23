
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';
import { translate } from '../service/translations';
import { RootState, AppDispatch } from '../store/store'; // Импорт исправлен

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
  const language = useSelector((state: RootState) => state.language.value); // Используем .value

  const toggleLanguage = () => {
    dispatch(setLanguage(language === 'en' ? 'ru' : 'en'));
  };

  return (
    <header className='flex p-4'>
      <div className='flex flex-col'>
        <h1 className='text-xl'>{translate('appTitle', language)}</h1>
        <p className='text-blue-400'>
          Welcome <b className='text-orange-300'>{userData?.first_name}</b>
        </p>
      </div>
      <button onClick={toggleLanguage} className='ml-auto border rounded-xl w-20 text-sm'>
        {language === 'en' ? 'RU' : 'EN'}
      </button>
    </header>
  );
}
