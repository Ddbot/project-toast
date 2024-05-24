import React from 'react';

const ToastsContext = React.createContext();

function ToastsProvider({children}) {
    const [toastsList, setToastsList] = React.useState([]);
    
    const value = React.useMemo(() => ({ toastsList, setToastsList }), [toastsList]);
    
	return <ToastsContext.Provider value={value}>{children}</ToastsContext.Provider>;
}

function useToasts() {
    const context = React.useContext(ToastsContext);
    if (!context) { 
        throw new Error('useToasts doit être utilisé dans un ToastsProvider');
    }

    return context
}

export { ToastsProvider, useToasts  };
