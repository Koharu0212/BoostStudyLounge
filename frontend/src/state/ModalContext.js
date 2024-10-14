import React, { createContext, useState, useCallback } from 'react';

/**
 * モーダルの状態と操作を管理するためのコンテキスト
 * @type {React.Context}
 */
export const ModalContext = createContext();

/**
 * ModalProvider コンポーネント
 * モーダルの状態を管理し、子コンポーネントにコンテキストを提供する
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} ModalProvider コンポーネントの JSX
 */
export default function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onModalClose, setOnModalClose] = useState(() => {});

  /**
   * モーダルを開く関数
   */
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  /**
   * モーダルを閉じる関数
   * モーダルを閉じた後、設定されたコールバック関数を実行する
   */
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    onModalClose();
  }, [onModalClose]);

  /**
   * モーダルが閉じられた後に実行されるコールバック関数を設定する
   * @param {Function} callback - モーダルが閉じられた後に実行される関数
   */
  const setModalCloseCallback = useCallback((callback) => {
    setOnModalClose(() => callback);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, setModalCloseCallback }}>
      {children}
    </ModalContext.Provider>
  );
};