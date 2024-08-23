

interface UserData {
    first_name?: string;
    last_name?: string;
    username?: string;
  }
  
  interface HeaderProps {
    userData: UserData | null;
  }
  
  // Определяем компонент Header с типизацией пропсов
  export function Header({ userData }: HeaderProps) {
//   const { language, setLanguage } = useState();

//   const toggleLanguage = () => {
//     setLanguage(language === 'en' ? 'ru' : 'en');
//   };
  const userNameDisplay = userData?.username || `${userData?.first_name || ''} ${userData?.last_name || ''}`

  return (
    <div className='px-4 z-10 flex text-xl items-center pt-4'>
       <p className='text-blue-200'>
        Welcome, {userNameDisplay || 'Guest'}
      </p>
      <div className='ml-auto'>
        <div className='text-black border-none bg-blue-200 w-9 h-9 justify-center flex border rounded-3xl'>
          <button >
            
          </button>
        </div>
      </div>
    </div>
  );
};