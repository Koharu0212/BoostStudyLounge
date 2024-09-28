import React, { createContext, useState, useCallback } from 'react';

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onModalClose, setOnModalClose] = useState(() => {});

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    onModalClose();
  }, [onModalClose]);

  const setModalCloseCallback = useCallback((callback) => {
    setOnModalClose(() => callback);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, setModalCloseCallback }}>
      {children}
    </ModalContext.Provider>
  );
};