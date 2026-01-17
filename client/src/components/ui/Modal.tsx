import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  className = "",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`modal modal-open ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-box bg-neutral border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h3
            id="modal-title"
            className="font-bold text-2xl font-black italic"
          >
            {title}
          </h3>
          <button
            className="btn btn-sm btn-ghost focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mb-6">{children}</div>

        <div className="modal-action">
          {secondaryAction && (
            <button
              className="btn btn-ghost focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              className="btn btn-primary uppercase font-black tracking-tighter italic focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
              onClick={primaryAction.onClick}
              disabled={primaryAction.loading}
              aria-busy={primaryAction.loading}
            >
              {primaryAction.loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                primaryAction.label
              )}
            </button>
          )}
        </div>
      </div>
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};

export default Modal;

