'use client';

import { useState } from 'react';
import {
  Breadcrumb,
  Avatar,
  Input,
  Button,
  Table,
  Card,
} from 'switch-core-react';
import styles from './page.module.css';

// Sample transaction data
const transactions = [
  { id: '1', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Successful', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '2', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Pending', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '3', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Successful', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '4', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Successful', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '5', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Failed', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '6', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Successful', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '7', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Successful', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
  { id: '8', ref: 'IMTO20250828014736\n653000508', amount: 'US$10.00', date: '28/08/2025, 13:47:53', recipient: 'AYOMIDE\nMUHAMMED BAKARE', bank: 'WELLS FARGO', status: 'Failed', rate: '1500', credited: 'NGN 15000.00', fee: 'NGN 15.00' },
];

const StatusChip = ({ status }: { status: string }) => {
  return (
    <span
      className={styles.statusChip}
      data-status={status.toLowerCase()}
    >
      {status}
    </span>
  );
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TransactionsPage() {
  const [search, setSearch] = useState('');

  const columns = [
    {
      key: 'ref',
      header: 'PAYMENT REFERENCE',
      render: (val: unknown) => <span style={{ whiteSpace: 'pre-line', fontSize: 13 }}>{String(val)}</span>
    },
    { key: 'amount', header: 'AMOUNT DEBITED' },
    { key: 'date', header: 'TRANSACTION DATE TIME' },
    {
      key: 'recipient',
      header: 'RECIPIENT NAME',
      render: (val: unknown) => <span style={{ whiteSpace: 'pre-line' }}>{String(val)}</span>
    },
    { key: 'bank', header: 'RECIPIENT BANK' },
    {
      key: 'status',
      header: 'STATUS',
      render: (val: unknown) => <StatusChip status={String(val)} />
    },
    { key: 'rate', header: 'CONVERSION RATE' },
    { key: 'credited', header: 'CREDITED AMOUNT' },
    { key: 'fee', header: 'FEE' },
  ];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { id: 'partners', label: 'All Partners', href: '/partners' },
          { id: 'partner', label: 'Owambe Global 1756127463256', href: '/partners/owambe' },
          { id: 'transactions', label: 'Transactions' },
        ]}
      />

      {/* Page Title */}
      <h1 className={styles.title}>Transactions</h1>

      {/* Partner Details Card */}
      <Card padding="medium" className={styles.partnerCard}>
        <p className={styles.cardLabel}>PARTNER DETAILS:</p>
        <div className={styles.partnerInfo}>
          <Avatar initials="OG" size="large" />
          <div>
            <h2 className={styles.partnerName}>OWAMBE GLOBAL 1756127463256</h2>
            <p className={styles.partnerEmail}>chinedu.okafor.mldp@sharklasers.com</p>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className={styles.toolbar}>
        <Input
          placeholder="Search by transactions reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leadingIcon={<SearchIcon />}
          className={styles.searchInput}
        />
        <Button variant="outline" leftIcon={<FilterIcon />} rightIcon={<ChevronIcon />}>
          Filter
        </Button>
      </div>

      {/* Transactions Table */}
      <Table columns={columns} data={transactions} />

      {/* Pagination Footer */}
      <div className={styles.pagination}>
        <span className={styles.resultCount}>8 results found</span>
        <div className={styles.paginationControls}>
          <span>Rows per page: 10</span>
          <ChevronIcon />
          <span style={{ marginLeft: 24 }}>1-10 of 276</span>
          <button className={styles.pageBtn} disabled>&lt;</button>
          <button className={styles.pageBtn}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
