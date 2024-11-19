import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-11/12 md:w-1/2">
        {title && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 border-b flex justify-center items-center">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <a
              href="#"
              className="ml-3 bg-white p-1 rounded-full text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-8 8a1 1 0 01-1.414-1.414l8-8-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 11a1 1 0 011-1h4a1 1 0 110 2H5v4a1 1 0 11-2 0v-5z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        )}
        <div className="p-6 text-center">
          {children}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
