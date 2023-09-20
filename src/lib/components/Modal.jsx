import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, className }) => {
	return createPortal(<div className={className}>{children}</div>, document.getElementById('portal'));
};

export default Modal;
