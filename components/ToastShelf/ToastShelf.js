import React from 'react';
import { useToasts } from '../contexts/ToastsProvider';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf() {
    const { toastsList, setToastsList } = useToasts();

    function useEscapeKey(fn) {
        React.useEffect(() => { 
           function handleKeyDown(e) {
                const code = e.code || undefined;
                code === "Escape" && fn();
            }

             window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            }
    }, []);
    }

    useEscapeKey(() => {
        setToastsList([]);
    });


    return(
		<ol className={styles.wrapper}>
			{toastsList?.map((toast) => {
				return (
					<li className={styles.toastWrapper} key={toast.id}>
						<Toast
							variant={toast.variant}
							id={toast.id}>
							{toast.message}
						</Toast>
					</li>
				);
			})}
		</ol>,
	);
}

export default ToastShelf;
