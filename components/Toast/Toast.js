import React from 'react';
import { useToasts } from '../contexts/ToastsProvider';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, id, children }) {
    const { setToastsList } = useToasts();

    const Tag = ICONS_BY_VARIANT[variant] || Info;
    
    function dismiss(e) {
        const { id } = e.currentTarget;

        setToastsList((prev) => {
            const newList = prev.filter((el) => {
                console.log(el.id, '---', id);
                return el.id !== id;
            });
            return newList;
        });        
    }

	return (
		<div className={`${styles.toast} ${styles[variant]}`}>
			<div className={styles.iconContainer}>
				<Tag size={24} />
			</div>
			<p className={styles.content}>{children}</p>
			<button
				id={id}
				className={styles.closeButton}
				name="dismiss"
				onClick={dismiss}>
				<X size={24} />
				<VisuallyHidden>Dismiss message</VisuallyHidden>
			</button>
		</div>
	);
}

export default Toast;
