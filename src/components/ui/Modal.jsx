// Import modules

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  const dark = useSelector((state) => state.theme.dark);

  if (name !== openName) return null;

  return createPortal(
    // Overlay
    <div
      className={`${
        dark ? "dark" : ""
      } fixed top-0 left-0 w-full h-screen backdrop-blur-md z-[1000] transition-all duration-500`}
    >
      {/*Container*/}
      <div
        className="bg-white dark:bg-black/90 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 transition-all duration-500"
        ref={ref}
      >
        {/* Close button */}
        <button
          className="dark:text-white absolute top-1 right-2 cursor-pointer bg-none border-none p-[4px] rounded-md translate-x-[6px] transition-all duration-200 hover:bg-red-500"
          onClick={close}
        >
          <HiXMark />
        </button>

        <div className="min-w-[220px]">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
