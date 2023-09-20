import { useEffect, useState } from 'react';
import { axiosConfigInit } from '@service/config/axios';
import { useCallbackOnce } from '@toss/react';

const AxiosWrapper = ({ children }) => {
  const [isConfigDone, setIsConfigDone] = useState(false);
  const configAxios = useCallbackOnce(() => {
    axiosConfigInit();
    setIsConfigDone(true);
  }, []);
  useEffect(() => {
    configAxios();
  }, [configAxios]);
  return isConfigDone && <>{children}</>;
};

export default AxiosWrapper;
