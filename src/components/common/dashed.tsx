import React from 'react';

type Props = {} & React.SVGProps<SVGSVGElement>;

const HrDashed = (props: Props) => {
  return (
    <svg width="100%" height="1" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 1H1272" stroke="currentColor" strokeLinejoin="round" strokeDasharray="8 8" />
    </svg>
  );
};

export default HrDashed;
