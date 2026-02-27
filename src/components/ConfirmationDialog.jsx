import { useRef, useEffect } from "react";

const ConfirmationDialog = ({ open, onClose, onConfirm, title = "Confirm", message = "Are you sure?" }) => {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="rounded-md shadow-md p-6 w-80 backdrop:bg-black/30">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="mb-4 text-sm text-gray-600">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;
