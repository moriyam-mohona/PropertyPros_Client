const HostModal = ({ closeModal, isOpen, modalHandler }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-center text-gray-900">
          Become A Host!
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Please read all the terms & conditions before becoming a host.
        </p>
        <hr className="mt-4" />
        <div className="flex justify-around mt-4">
          <button onClick={modalHandler} className="btn btn-success">
            Continue
          </button>
          <button onClick={closeModal} className="btn btn-error">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostModal;
