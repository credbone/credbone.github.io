import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
    const [themeMode, setThemeMode] = useState<string>('light');

    useEffect(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeMode(prefersDarkScheme ? 'dark' : 'light');
        updateTheme(prefersDarkScheme ? 'dark' : 'light');
    }, []);

    const updateTheme = (mode: string) => {
        document.documentElement.setAttribute('data-theme', mode);
    };

    const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setThemeMode(value);
        updateTheme(value);
    };

    return (
        <group>

<div className="option_bar compact dynamic" data-length="autofit" data-height="40" >
  <label >
  <input
                    type="radio"

                    name="theme-mode"
                    value="light"
                    checked={themeMode === 'light'}
                    onChange={handleModeChange}
                />
    <wrap>
      <icon data-length="30">light_mode</icon>
      <text >Light Mode</text>
    </wrap>
  </label>
  <label >
    
  <input
                    type="radio"

                    name="theme-mode"
                    value="dark"
                    checked={themeMode === 'dark'}
                    onChange={handleModeChange}
                />
    <wrap>
      <icon data-length="30">dark_mode</icon>
      <text >Dark Mode</text>
    </wrap>
  </label>
  <label data-fit="true" >
  <input
                    type="radio"

                    name="theme-mode"
                    value="auto"
                    checked={themeMode === 'auto'}
                    onChange={handleModeChange}
                />
    <wrap>
      <text >Auto Mode</text>
    </wrap>
  </label>
</div>





        </group>
    );
};

export default ThemeToggle;
