import { createContext, useContext, useState } from 'react';

const TimerContext = createContext({
  isRunning: false,
  setIsRunning: () => {},
});

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </TimerContext.Provider>
  );
};