import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: { [key: string]: string } = {
  'Components': 'Components',
  'Typeface': 'Typeface',
  'Icons': 'Icons',
  'Buttons': 'Buttons',
  'CheckboxSwitchers': 'Checkbox & Switchers',
  'Colors': 'Colors',
  'Layout': 'Layout',
  'Navigation': 'Navigation',
  'InputsAndForms': 'Inputs & Forms',
  'TooltipAndPopover': 'Tooltip & Popover',
  'CardsAndList': 'Cards & List',
  'Modals': 'Modals',
  'About': 'About',
  'Settings': 'Settings',
  'Search': 'Search',
  '': 'Home',
  'Home': 'Home',
  'Resume': 'Ruben Sargsyan',
  'Dashboard': 'Dashboard',
};

const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const title = routeTitles[lastSegment] || 'Credbone';
    document.title = `${title} - Credbone`;
  }, [location]);

  return null;
};

export default TitleUpdater;
