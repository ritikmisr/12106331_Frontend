import React, { useState } from 'react';
import '../styles/DateRangePicker.css';

const DateRangePicker = ({ data, onDateChange }) => {
  const [startDate, setStartDate] = useState({ year: '', month: '', day: '' });
  const [endDate, setEndDate] = useState({ year: '', month: '', day: '' });

  const years = [...Array(15).keys()].map(i => 2010 + i);
  const months = [...Array(12).keys()].map(i => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));
  const days = [...Array(31).keys()].map(i => i + 1);

  const handleDateChange = (type, field, value) => {
    if (type === 'start') {
      const updatedStartDate = { ...startDate, [field]: value };
      setStartDate(updatedStartDate);
      filterData(updatedStartDate, endDate);
    } else if (type === 'end') {
      const updatedEndDate = { ...endDate, [field]: value };
      setEndDate(updatedEndDate);
      filterData(startDate, updatedEndDate);
    }
  };

  const filterData = (start, end) => {
    const startDt = new Date(start.year, start.month - 1, start.day);
    const endDt = new Date(end.year, end.month - 1, end.day);

    const filtered = data.filter(item => {
      const itemDate = new Date(
        `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
      );
      return itemDate >= startDt && itemDate <= endDt;
    });
    onDateChange(filtered);
  };

  return (
    <div className="date-range-picker">
      <h4 style={{ color: 'orange' }}>Select Date Range:</h4>
      <div className="date-picker">
        <span style={{ color: 'orange' }}>From:</span>
        <select
          onChange={e => handleDateChange('start', 'year', e.target.value)}
          value={startDate.year}
        >
          <option value="" disabled>Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          onChange={e => handleDateChange('start', 'month', e.target.value)}
          value={startDate.month}
        >
          <option value="" disabled>Select Month</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select
          onChange={e => handleDateChange('start', 'day', e.target.value)}
          value={startDate.day}
        >
          <option value="" disabled>Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div className="date-picker">
        <span style={{ color: 'orange' }}>To:</span>
        <select
          onChange={e => handleDateChange('end', 'year', e.target.value)}
          value={endDate.year}
        >
          <option value="" disabled>Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          onChange={e => handleDateChange('end', 'month', e.target.value)}
          value={endDate.month}
        >
          <option value="" disabled>Select Month</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select
          onChange={e => handleDateChange('end', 'day', e.target.value)}
          value={endDate.day}
        >
          <option value="" disabled>Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateRangePicker;
