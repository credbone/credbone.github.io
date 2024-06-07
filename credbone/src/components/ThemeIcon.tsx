import React from 'react';
import { useTheme } from './ThemeProvider';


const ThemeIcon = () => {
  const { themeMode } = useTheme();

  let icon;
  switch (themeMode) {
    case 'light':
      icon = 'light_mode';
      break;
    case 'dark':
      icon = 'dark_mode';
      break;
    case 'auto':
      icon = 'auto_mode'; 
      break;
  }

  return <icon data-length="30">{icon}</icon>;
};

export default ThemeIcon;