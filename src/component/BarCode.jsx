import React from 'react';

const Barcode = ({ data }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Barcode Image */}
      <img
        alt="Barcode Generator TEC-IT"
        src={`https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&translate-esc=on`}
      />

      {/* Required TEC-IT Attribution */}
      <div
        style={{
          paddingTop: '8px',
          textAlign: 'center',
          fontSize: '15px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
        }}
      >
        {/* <a
          href="https://www.tec-it.com"
          title="Barcode Software by TEC-IT"
          target="_blank"
          rel="noopener noreferrer"
        >
          TEC-IT Barcode Generator
          <br />
          <img
            alt="TEC-IT Barcode Software"
            src="http://www.tec-it.com/pics/banner/web/TEC-IT_Logo_75x75.gif"
            border="0"
          />
        </a> */}
      </div>
    </div>
  );
};

export default Barcode;