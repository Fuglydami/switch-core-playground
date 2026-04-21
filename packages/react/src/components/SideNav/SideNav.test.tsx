import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SideNav } from './SideNav';

function Icon() { return <svg data-testid="icon" />; }

const items = [
  { id: 'home',     label: 'Home',     icon: <Icon /> },
  { id: 'reports',  label: 'Reports',  icon: <Icon />, badge: 3 },
  { id: 'settings', label: 'Settings', icon: <Icon />,
    children: [
      { id: 'account',  label: 'Account' },
      { id: 'security', label: 'Security' },
    ],
  },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

describe('SideNav', () => {
  it('renders all top-level nav items', () => {
    render(<SideNav items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('marks the active item with aria-current=page', () => {
    render(<SideNav items={items} activeId="home" />);
    expect(screen.getByText('Home').closest('[aria-current]')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNavigate when an item is clicked', async () => {
    const onNavigate = vi.fn();
    render(<SideNav items={items} onNavigate={onNavigate} />);
    await userEvent.click(screen.getByText('Home'));
    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('renders badge count', () => {
    render(<SideNav items={items} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders logo slot', () => {
    render(<SideNav items={items} logo={<span>MyLogo</span>} />);
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
  });

  it('renders footer slot', () => {
    render(<SideNav items={items} footer={<span>Support</span>} />);
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('expands children on click', async () => {
    render(<SideNav items={items} />);
    expect(screen.queryByText('Account')).toBeNull();
    await userEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('disabled item has aria-disabled', () => {
    render(<SideNav items={items} />);
    const disabledItem = screen.getByText('Disabled').closest('[aria-disabled]');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onNavigate for disabled items', async () => {
    const onNavigate = vi.fn();
    render(<SideNav items={items} onNavigate={onNavigate} />);
    await userEvent.click(screen.getByText('Disabled'));
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('hides labels in compact variant', () => {
    render(<SideNav items={items} variant="compact" />);
    expect(screen.queryByText('Home')).toBeNull();
    expect(screen.queryByText('Reports')).toBeNull();
  });
});
