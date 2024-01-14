import { createContext, useState, useContext, useEffect } from "react";

export const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        let timer;
        if (message.type === 'success' && message.text) {
            timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [message]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
    };

    const hideMessage = () => {
        setMessage({ type: '', text: '' });
    };

    return (
        <MessageContext.Provider value={{ message, showMessage, hideMessage }}>
            {children}
        </MessageContext.Provider>
    )
}