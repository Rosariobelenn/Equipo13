import React from 'react';
import { CircleCheckBig } from 'lucide-react';

const Check: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#7FFFD4', // verde agua (Aquamarine)
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        borderRadius: '50%', // opcional, para hacerlo circular
      }}
    >
      <CircleCheckBig color="#006400" size={20} /> {/* verde oscuro */}
    </div>
  );
};

export default Check;
