import React, { useDeferredValue, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClickEffect } from '@toss/react';

const Modal = ({ children, className, isVisible, setIsVisible }) => {
	const [target, setTarget] = useState(null);
	const isDefferedVisible = useDeferredValue(isVisible);
	useOutsideClickEffect([target], () => {
		if (isDefferedVisible) {
			setIsVisible(false);
		}
	});

	return createPortal(
		isVisible ? (
			<div
				ref={setTarget}
				className={className}
			>
				{children}
			</div>
		) : null,
		document.getElementById('portal'),
	);
};

export default Modal;
