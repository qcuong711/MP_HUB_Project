import React from 'react';

const EventInfo = () => {
  return (
    <div style={{ border: '2px solid blue', padding: '20px', margin: '10px' }}>
      <h2>Thông tin từ Event Micro-Frontend</h2>
      <p>Đây là một component được tải động từ dự án <code>event</code>.</p>
      <p>Port: 3002</p>
    </div>
  );
};

export default EventInfo; 