import { Modal } from '@/components';
import { ModalProps } from '@/components/Common/Modal/Modal';

interface HistoryDetailModalProps extends ModalProps {
  solveId: number;
}

export default function HistoryDetailModal({
  isOpen,
  onClose,
  solveId,
  ...props
}: HistoryDetailModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
        {solveId}
      </Modal>
    </>
  );
}
