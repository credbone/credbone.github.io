import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Route titles and headers mapping
const routeTitles: { [key: string]: { title: string | null, header: string | null } } = {
  'Components': { title: 'Components', header: 'Components' },
  'Typeface': { title: 'Typeface', header: 'Typeface' },
  'Icons': { title: 'Icons', header: 'Icons' },
  'Buttons': { title: 'Buttons', header: 'Buttons' },
  'CheckboxSwitchers': { title: 'Checkbox & Switchers', header: 'Checkbox & Switchers' },
  'Colors': { title: 'Colors', header: 'Colors' },
  'Layout': { title: 'Layout', header: 'Layout' },
  'Navigation': { title: 'Navigation', header: 'Navigation' },
  'InputsAndForms': { title: 'Inputs & Forms', header: 'Inputs & Forms' },
  'TooltipAndPopover': { title: 'Tooltip & Popover', header: 'Tooltip & Popover' },
  'Snackbar': { title: 'Snackbar', header: 'Snackbar' },
  'CardsAndList': { title: 'Cards & List', header: 'Cards & List' },
  'Modals': { title: 'Modals', header: 'Modals' },


  '': { title: 'Home', header: null }, // Root path has title but no header
  'About': { title: 'About', header: 'About' },
  'Settings': { title: 'Settings', header: 'Settings' },
  'Search': { title: 'Search', header: null },

  'Resume': { title: 'Ruben Sargsyan', header: 'Ruben Sargsyan' },
  'Dashboard': { title: 'Dashboard', header: 'Dashboard' },
  'QuickDemos': { title: 'Quick Demos', header: 'Quick Demos' },
  'Modal': { title: 'Modal', header: 'Modal' },
  'Overview': { title: 'Overview', header: 'Overview' },
  'SideBar': { title: 'Sidebar', header: 'Sidebar' },
  'BarsAndTiles': { title: 'Bar & Tiles', header: 'Bar & Tiles' },
  'Miscellaneous': { title: 'Miscellaneous', header: 'Miscellaneous' }
};

const TitleUpdater: React.FC = () => {
  const location = useLocation();
  const [header, setHeader] = useState<string | null>(null);

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { header: newHeader } = routeTitles[lastSegment] || { header: null };
    
    document.title = routeTitles[lastSegment]?.title ? `${routeTitles[lastSegment]?.title} - Credbone` : 'Credbone'; // Update browser title
    setHeader(newHeader);
  }, [location]);

  return null;
};

// Export only the header for internal use
export const useCurrentHeader = (): string | null => {
  const location = useLocation();
  const [header, setHeader] = useState<string | null>(null);

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { header: newHeader } = routeTitles[lastSegment] || { header: null };
    
    setHeader(newHeader);
  }, [location]);

  return header;
};

export default TitleUpdater;
