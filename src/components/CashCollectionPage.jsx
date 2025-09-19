// src/components/AppBody.jsx
import {
  IndexTable,
  Card,
  Tabs,
  useIndexResourceState,
  Text,
  Badge,
  Button,
  TextField,
  Pagination,
  Select,
  InlineStack, Icon, Tooltip,
  ActionList,
  Popover
} from '@shopify/polaris';
import { SearchIcon, InfoIcon, FilterIcon } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo } from 'react';

function CashCollectionPage() {
  const [queryValue, setQueryValue] = useState('');
  const [assignee, setAssignee] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeFilterPopover, setActiveFilterPopover] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const tabs = [
    { id: 'all', content: 'All' },
    { id: 'pending', content: 'Pending' },
    { id: 'partiallyPaid', content: 'Partially paid' },
    { id: 'partiallyRefunded', content: 'Partially refunded' },
    { id: 'refunded', content: 'Refunded' },
    { id: 'paid', content: 'Paid' },
  ];

  // Generate 30 mock orders
  const orders = Array.from({ length: 30 }).map((_, i) => {
    const statuses = ['pending', 'partiallyPaid', 'partiallyRefunded', 'refunded', 'paid'];
    const status = statuses[i % statuses.length];

    const paymentBadge = {
      pending: <Badge status="attention">Pending</Badge>,
      partiallyPaid: <Badge progress="partiallyComplete">Partially paid</Badge>,
      partiallyRefunded: <Badge status="warning">Partially refunded</Badge>,
      refunded: <Badge status="critical">Refunded</Badge>,
      paid: <Badge progress="complete">Paid</Badge>,
    };

    return {
      id: `${1020 - i}`,
      order: `#${1020 - i}`,
      date: `Jul ${20 - (i % 5)} at ${3 + (i % 5)}:${30 + i}pm`,
      customer: `Customer ${i + 1}`,
      total: `$${(500 + i * 23).toFixed(2)}`,
      paymentStatus: paymentBadge[status],
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
      status,
    };
  });

  const handleQueryChange = useCallback((value) => setQueryValue(value), []);
  const handleAssigneeChange = useCallback((value) => setAssignee(value), []);
  const handleSortChange = useCallback((value) => setSortOption(value), []);
  const handleTabChange = useCallback((selectedIndex) => setSelectedTab(selectedIndex), []);
  const handleQueryClear = useCallback(() => setQueryValue(''), [])
  const toggleFilterPopover = useCallback(
    () => setActiveFilterPopover((active) => !active),
    []
  );

  const applyFilter = (status) => {
    setStatusFilter(status);
    setActiveFilterPopover(false);
  };

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    const selectedTabId = tabs[selectedTab].id;
    if (selectedTabId !== 'all') {
      result = result.filter((order) => order.status === selectedTabId);
    }

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (queryValue.trim() !== '') {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(queryValue.toLowerCase()) ||
          order.customer.toLowerCase().includes(queryValue.toLowerCase())
      );
    }

    return result;
  }, [orders, selectedTab, queryValue, statusFilter]);

  const unpaid = orders.filter((order) => order.status !== "paid");
  const resourceName = { singular: 'order', plural: 'orders' };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);



  const rowMarkup = unpaid.map(
    ({ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card>
      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
        <Card sectioned>
          <InlineStack distribution="equalSpacing" alignment="center">
            <TextField
            label="Search orders"
            labelHidden
            value={queryValue}
            onChange={handleQueryChange}
            clearButton
            onClearButtonClick={handleQueryClear}
            placeholder="Search by orders or customers"
            prefix={<Icon source={SearchIcon} tone="base" />}
            suffix={
    <Tooltip content="Type order ID or customer name to search">
      <Icon source={InfoIcon} tone="subdued" />
    </Tooltip>
  } 
           

          />

          <Popover
            active={activeFilterPopover}
            activator={
              <Button
                icon={FilterIcon}
                onClick={toggleFilterPopover}
                disclosure
              >
                All
              </Button>
            }
            onClose={toggleFilterPopover}
          >
            <ActionList
              items={[
                { content: "All", onAction: () => applyFilter("all") },
                { content: "Paid", onAction: () => applyFilter("paid") },
                { content: "Pending", onAction: () => applyFilter("pending") },
                { content: "Refunded", onAction: () => applyFilter("refunded") },
              ]}
            />
          </Popover>
          <Popover
            active={activeFilterPopover}
            activator={
              <Button
                icon={FilterIcon}
                disclosure
              >
                Assignee
              </Button>
            }
            onClose={toggleFilterPopover}
          >
            <ActionList
              items={[
                { content: "All", onAction: () => applyFilter("all") },
                { content: "Paid", onAction: () => applyFilter("paid") },
                { content: "Pending", onAction: () => applyFilter("pending") },
                { content: "Refunded", onAction: () => applyFilter("refunded") },
              ]}
            />
          </Popover>
          <Popover
            active={activeFilterPopover}
            activator={
              <Button
                icon={FilterIcon}
                onClick={toggleFilterPopover}
                disclosure
              >
                Sort By
              </Button>
            }
            onClose={toggleFilterPopover}
          >
            <ActionList
              items={[
                { content: "All", onAction: () => applyFilter("all") },
                { content: "Paid", onAction: () => applyFilter("paid") },
                { content: "Pending", onAction: () => applyFilter("pending") },
                { content: "Refunded", onAction: () => applyFilter("refunded") },
              ]}
            />
          </Popover>
          </InlineStack>

          <IndexTable
            resourceName={resourceName}
            itemCount={unpaid.length}
            selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Order' },
              { title: 'Date' },
              { title: 'Customer' },
              { title: 'Total', alignment: 'end' },
              { title: 'Payment status' },
              { title: 'Fulfillment status' },
            ]}
          >
        
            {rowMarkup}
          </IndexTable>
              

          <Pagination
            hasPrevious={page > 1}
            hasNext={page * 10 < filteredOrders.length}
            onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </Card>
      </Tabs>
    </Card>
  );
}

export default CashCollectionPage;
