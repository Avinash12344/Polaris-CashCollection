// src/App.jsx
import { AppProvider, Frame, Page } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import CashCollectionPage from './components/CashCollectionPage';

function App() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [selectedPage, setSelectedPage] = useState('users');

  const toggleMobileNavigationActive = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const renderPage = () => {
    switch (selectedPage) {
      case 'Cash Collection':
        return (
          <Page title="Cash Collection">
            <CashCollectionPage />
          </Page>
        );
      case 'users':
        return <Page title="Users">Users Page</Page>;
      case 'widgets':
        return <Page title="Widgets">Widgets Page</Page>;
      default:
        return <Page title="Basic">Basic Page</Page>;
    }
  };

  return (
    <AppProvider i18n={{ Polaris: { SearchField: 'Search' } }}>
      <Frame
        topBar={<Header toggleMobileNavigation={toggleMobileNavigationActive} />}
        navigation={<SideBar onSelectPage={setSelectedPage} />}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        {renderPage()};
      </Frame>
    </AppProvider>
  );
}

export default App;
