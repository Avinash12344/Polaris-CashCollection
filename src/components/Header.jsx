
import { TopBar, Avatar, Button, Icon } from '@shopify/polaris';
import { PlusCircleIcon, NotificationIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

function Header({ toggleMobileNavigation }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((open) => !open);
  }, []);

  return (
    <TopBar
      showNavigationToggle={true}
      onNavigationToggle={toggleMobileNavigation}
      userMenu={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button plain icon={<Icon source={PlusCircleIcon} />} accessibilityLabel="Add something" />
          <Button plain icon={<Icon source={NotificationIcon} />} accessibilityLabel="Notifications" />
          <Button plain onClick={toggleUserMenu}>
            <Avatar customer name="Avinash Vishwakarma" initials="AV" />
          </Button>
        </div>
      }
      secondaryMenu={
        <div style={{ fontWeight: 'bold', color: 'white' }}>
          Avinash Vishwakarma
        </div>
      }
      logo={{
        width: 124,
        topBarSource: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Shopify_logo_2018.svg',
        url: '#',
      }}
    />
  );
}

export default Header;
