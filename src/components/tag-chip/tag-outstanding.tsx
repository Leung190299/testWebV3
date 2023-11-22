import React from 'react';

type Props = {
  text: string;
};

const TagOutstanding = ({ text }: Props) => {
  return <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2">{text}</span>;
};

export default TagOutstanding;
