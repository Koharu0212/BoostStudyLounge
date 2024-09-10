import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

export default function ModalProvider({children}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setIsModalOpen(true);
        setModalContent(content);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{isModalOpen, modalContent, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}