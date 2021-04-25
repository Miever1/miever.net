import usePortal from 'react-useportal';

export const useModal = ({ ...config } = {}) => {
  const { isOpen, togglePortal, openPortal, closePortal, Portal } = usePortal({
    ...config,
  });

  return {
    Modal: Portal,
    toggleModal: togglePortal,
    openModal: openPortal,
    closeModal: closePortal,
    isOpen,
  };
};

export default useModal;
