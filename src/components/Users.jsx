import React, { useState } from 'react';
import { Page, Card, IndexTable, Filters, TextField, Button, Badge, Collapsible, Scrollable, TextContainer, BlockStack} from '@shopify/polaris';

function Users() {
  const [queryValue, setQueryValue] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [open,setOpen] = useState(false);
  const [open_faq,setOpen_faq] = useState(false);
  const [open_tutorials,setOpen_tutorials] = useState(false);
  const orders = [
    { id: '1', name: 'Order 101', status: 'Paid' },
    { id: '2', name: 'Order 102', status: 'Pending' },
    { id: '3', name: 'Order 103', status: 'Cancelled' },
  ];

  const appliedFilters = statusFilter.map((status) => ({
    key: status,
    label: `Status: ${status}`,
    onRemove: () => setStatusFilter([]),
  }));

  const filteredOrders = orders.filter((o) =>
    o.name.toLowerCase().includes(queryValue.toLowerCase()) &&
    (statusFilter.length ? statusFilter.includes(o.status) : true)
  );

  return (
    <Page title="Orders">
      <Card>
        <Filters
          queryValue={queryValue}
          filters={[{ key: 'status', label: 'Status', filter: null }]}
          appliedFilters={appliedFilters}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
        />
        <IndexTable
          resourceName={{ singular: 'order', plural: 'orders' }}
          itemCount={filteredOrders.length}
          headings={[{ title: 'Name' }, { title: 'Status' }]}
        >
          {filteredOrders.map((order, index) => (
            <IndexTable.Row key={order.id} id={order.id} position={index}>
              <IndexTable.Cell>{order.name}</IndexTable.Cell>
              <IndexTable.Cell>
                <Badge>{order.status}</Badge>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
      <Card sectioned>
        <BlockStack>
          <Button onClick={() => setOpen(!open)} ariaExpanded={open} ariaControls="example-collapsible">
          {open ? 'Hide Details' : 'Show Details'}
        </Button>
        <Collapsible open={open} id="example-collapsible" transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}>
          <Scrollable shadow style={{ height: '80px', marginTop: '16px' }}>
            <TextContainer>
              {[...Array(20)].map((_, i) => <p key={i}>Line {i+1}</p>)}
            </TextContainer>
          </Scrollable>
        </Collapsible>
        <Button onClick={() => setOpen_faq(!open_faq)}>
          {open_faq ? "Hide FAQ" : "Show FAQ"}
        </Button>
        <Collapsible open={open_faq} id="faq_collapsible" transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}>
          <Scrollable shadow style={{ height: '80px', marginTop: '16px' }}>
            <TextContainer>
            {[...Array(20)].map((_, i) => <p key={i}>Line {i+1}</p>)}
          </TextContainer>
          </Scrollable>
        </Collapsible>
        </BlockStack>
      </Card>
    </Page>
  );
}

export default Users;
