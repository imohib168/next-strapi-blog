import React from 'react';

interface IHamburgerProps {
  handleHamburger: () => void;
  open: boolean;
}

const Hamburger = ({ handleHamburger, open }: IHamburgerProps) => {
  return (
    <div
      onClick={handleHamburger}
      className={`${!open ? 'hamburger' : 'hamburger open'} `}
    >
      <span className={`${!open ? 'top-close' : 'top top-close'}`}></span>
      <span
        className={`${!open ? 'middle-close' : 'middle middle-close'}`}
      ></span>
      <span
        className={`${!open ? 'bottom-close' : 'bottom bottom-close'}`}
      ></span>
    </div>
  );
};

export default Hamburger;
