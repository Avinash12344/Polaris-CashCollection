
import { Navigation } from '@shopify/polaris';
import { HomeIcon, ChartVerticalFilledIcon, OrderIcon, ProductIcon, PersonIcon } from '@shopify/polaris-icons';

function SideBar({onSelectPage}) {
  return (
    <Navigation location="/">
      <Navigation.Section
        title="Dashboard"
        items={[
          {
            label: 'Home',
            icon: HomeIcon,
            onClick: () => console.log('Home clicked'),
          },
          {
            label: 'Analytics',
            icon: ChartVerticalFilledIcon,
            onClick: () => console.log('Orders clicked'),
          },
          {
            label: 'All Orders',
            icon: OrderIcon,
            onClick: () => console.log('Products clicked'),
          },
          {
            label: 'Local Delivery',
            icon: PersonIcon,
            onClick: () => console.log('Customers clicked'),
          },
          {
            label: 'Store PickUp',
            icon: ProductIcon,
            onClick: () => console.log('Products clicked'),
          },
          {
            label: 'Standard Shipping',
            icon: PersonIcon,
            onClick: () => console.log('Customers clicked'),
          },
        ]}
      />
      <Navigation.Section 
        title="Store Locations"
        items={[
            {
            label: 'Locations, Rules & Rates',
            icon: HomeIcon,
            onClick: () => console.log('Home clicked'),
          },
        ]}
      />
      <Navigation.Section 
        title="Products & Shipping"
        items={[
            {
            label: 'Shipping & Calendar',
            icon: OrderIcon,
            onClick: () => console.log('Orders clicked'),
          },
        ]}
      />
    <Navigation.Section 
        title="Users Permissions"
        items={[
            {
            label: 'Users',
            icon: OrderIcon,
            onClick: () => console.log('Orders clicked'),
          },
          {
            label: 'Cash Collection',
            icon: OrderIcon,
            onClick: () => onSelectPage('Cash Collection'),
          },
        ]}
      />
      <Navigation.Section 
        title="Configurations"
        items={[
            
          {
            label: 'Notifications',
            icon: OrderIcon,
            onClick: () => console.log('Orders clicked'),
          },
          
          
        ]}
      />
      <Navigation.Section 
        items={[
            {
            label: 'Billing Plans',
            icon: OrderIcon,
            onClick: () => console.log('Orders clicked'),
          },
          {
            label: 'Settings',
            icon: OrderIcon,
            onClick: () => console.log('Orders clicked'),
          },
        ]}
      />
    </Navigation>
  );
}

export default SideBar;
