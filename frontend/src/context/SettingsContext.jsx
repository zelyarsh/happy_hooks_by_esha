import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  initialGeneral,
  initialShipping,
  initialPayment,
  initialSocial,
} from "../data/settings";

import { getSettings, updateSettings } from "../services/settingsService";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [general, setGeneral] = useState(initialGeneral);
  const [shipping, setShipping] = useState(initialShipping);
  const [payment, setPayment] = useState(initialPayment);
  const [social, setSocial] = useState(initialSocial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();
        if (data.settings) {
          setGeneral((prev) => ({ ...prev, ...data.settings.general }));
          setShipping((prev) => ({ ...prev, ...data.settings.shipping }));
          setPayment((prev) => ({ ...prev, ...data.settings.payment }));
          setSocial((prev) => ({ ...prev, ...data.settings.social }));
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateGeneral = async (data) => {
    try {
      const result = await updateSettings({ general: data });
      setGeneral((prev) => ({ ...prev, ...result.settings.general }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateShipping = async (data) => {
    try {
      const result = await updateSettings({ shipping: data });
      setShipping((prev) => ({ ...prev, ...result.settings.shipping }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updatePayment = async (data) => {
    try {
      const result = await updateSettings({ payment: data });
      setPayment((prev) => ({ ...prev, ...result.settings.payment }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateSocial = async (data) => {
    try {
      const result = await updateSettings({ social: data });
      setSocial((prev) => ({ ...prev, ...result.settings.social }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = useMemo(
    () => ({
      general, updateGeneral,
      shipping, updateShipping,
      payment, updatePayment,
      social, updateSocial,
      loading,
    }),
    [general, shipping, payment, social, loading]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
