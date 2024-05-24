import React from 'react';

import Button from '../Button';

import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

import { useToasts } from '../contexts/ToastsProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
    const [message, setMessage] = React.useState('');
    const [variant, setVariant] = React.useState('notice');
    const { setToastsList } = useToasts();
    
    function handleChange(e) {
        e.target.name === 'message'
			? setMessage(e.target.value)
			: setVariant(e.target.value);        
    }

    function createToast(e) {
        e.preventDefault();        
        if (message !== "") {
            setToastsList((prev) => [
				...prev,
				{
					message,
					variant,
					id: crypto.randomUUID(),
				},
            ]);			
            setMessage('');
            setVariant('notice');
        }        
    }

    return (
		<div className={styles.wrapper}>
			<header>
				<img alt="Cute toast mascot" src="/toast.png" />
				<h1>Toast Playground</h1>
			</header>

			<ToastShelf />

			<form className={styles.controlsWrapper} onSubmit={createToast}>
				<div className={styles.row}>
					<label
						htmlFor="message"
						className={styles.label}
						style={{ alignSelf: 'baseline' }}>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea
							id="message"
							name="message"
							className={styles.messageInput}
							value={message}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					{VARIANT_OPTIONS.map((option, i) => (
						<div
							key={option}
							className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
							<label htmlFor={`variant-${option}`}>
								<input
									id={`variant-${option}`}
									type="radio"
									name="variant"
									value={option}
									onChange={handleChange}
									checked={variant === option}
								/>
								{option}
							</label>
						</div>
					))}
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div
						className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						<Button>Pop Toast!</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ToastPlayground;
