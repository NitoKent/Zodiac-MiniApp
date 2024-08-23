
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/store';
import { translate } from '../service/translations';

interface HeaderProps {
    userData: UserData | null;
  }
  
  // Пропсы для типа UserData
  interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
  }

export function Header() {
  const dispatch = useDispatch();
  const language = useSelector((state: any) => state.language);

  const toggleLanguage = () => {
    dispatch(setLanguage(language === 'en' ? 'ru' : 'en'));
  };

  return (
    <header className='flex p-4'>
      <h1 className='text-xl'>{translate('appTitle', language)}</h1>
      <button onClick={toggleLanguage} className='ml-auto border rounded-xl w-20 text-sm'>
        {language === 'en' ? 'RU' : 'EN'}
      </button>
    </header>
  );
}
