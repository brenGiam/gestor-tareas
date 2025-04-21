export default function ModalTareas({ isOpen, onClose, children }) {

    const mainBox = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";
    const box = "bg-white rounded-lg shadow-lg p-6 w-96 relative";
    const buttonStyle = "absolute top-2 right-2 text-gray-500 hover:text-gray-700";

    if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

    return (
        <div className={mainBox}>
            <div className={box}>
                <button
                    onClick={onClose}
                    className={buttonStyle}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}