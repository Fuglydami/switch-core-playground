import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <DatePicker label="Date of birth" value={date} onChange={setDate} />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(1990, 3, 15));
    return <DatePicker label="Date of birth" value={date} onChange={setDate} />;
  },
};

export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const [date, setDate] = useState<Date | null>(null);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    return (
      <DatePicker
        label="Appointment date"
        value={date}
        onChange={setDate}
        minDate={today}
        maxDate={maxDate}
        placeholder="Choose a future date"
      />
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Date of birth"
        value={date}
        onChange={setDate}
        isError
        errorMessage="Please select a valid date of birth."
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker
      label="Created at"
      value={new Date(2024, 0, 1)}
      onChange={() => {}}
      disabled
    />
  ),
};
