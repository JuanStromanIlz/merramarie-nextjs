import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AdminCont } from '@/context/AdminContext';

const LogOut = () => {
  const {setToken} = useContext(AdminCont);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME);
    setToken(false);
    router.push('/');
  }, []);

  return (
    <span>logging out</span>
  );
}

export default LogOut;