import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

export default function ToastTuyn() {
  const [isShow, setShow] = useState(false);
  return (
    <>
      <div
        className={clsx(
          'toast-tuyn fixed top-24 right-1/2 translate-x-[50%] bg-black rounded-sm',
          { block: isShow },
          { hidden: !isShow },
        )}
      ></div>
      {/* <button
        onClick={() => {
          setShow(true);
        }}
      ></button> */}
    </>
  );
}
