import React from 'react';

import styles from './Button.module.css';

function Button({ className = '', createToast, ...delegated }) {
	return (
		<button			
			className={`${styles.button} ${className}`}
			{...delegated}
			type="submit"
		/>
	);
}

export default Button;
