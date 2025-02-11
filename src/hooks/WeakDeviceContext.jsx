import { createContext, useContext, useEffect, useState } from "react";

const WeakDeviceContext = createContext();

function WeakDeviceProvider({ children }) {
  const [isWeakDevice, setIsWeakDevice] = useState(false);

  useEffect(() => {
    const detectWeakDevice = () => {
      const cpuCores = navigator.hardwareConcurrency || 2;
      const ram = navigator.deviceMemory || 2;
      return cpuCores <= 4 || ram <= 3;
    };

    setIsWeakDevice(detectWeakDevice());
  }, []);

  return (
    <WeakDeviceContext.Provider value={{ isWeakDevice }}>
      {children}
    </WeakDeviceContext.Provider>
  );
}

function useWeakDevice() {
  const context = useContext(WeakDeviceContext);
  if (!context) throw new Error("WeakDeviceTest was used outside scope");
  return context;
}

export { WeakDeviceProvider, useWeakDevice };
