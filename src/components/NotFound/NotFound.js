import React from 'react';

const style = {
  minHeight: '82vh',
  background: 'linear-gradient(47deg, rgba(34,193,195,1) 0%,'
      + ' rgba(253,187,45,0.767927153771665) 100%)',
};

const NotFound = () => (
  <div style={style}>
    <br />
    <br />
    <br />
    <br />
    <h1 style={{
      textAlign: 'center',
      margin: '0',
      padding: '0',
    }}
    >
                Page Not Found...
    </h1>
  </div>
);

export default NotFound;
