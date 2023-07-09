import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  useState,
  Ref
} from "react";
import { createPortal } from "react-dom";
import { ZINDEXLEVEL } from "../../config"

export interface PageModalProps {
  addHistory?: boolean;
  children: ReactNode;
}
export type PageModalInstance = {
  open: Function;
  close: Function;
};
let modalRoot = document.getElementById("modal-root")!

const PageModal: React.FC<PageModalProps & { ref: Ref<PageModalInstance> }> = forwardRef(
  ({ children, addHistory = true }, ref) => {
    const [visible, setVisible] = useState(false);
    const open = () => {
      addHistory && window.history.pushState(null, "", window.document.URL);
      setVisible(true);
    };

    useImperativeHandle(ref, () => ({
      open,
      close: () => {
        if (addHistory) window.history.go(-1);
        else {
          setVisible(false);
        }
      },
    }));


    useEffect(() => {
      const close = () => setVisible(false);
      window.addEventListener("popstate", close, false);
      return () => {
        window.removeEventListener("popstate", close, false);
      };
    }, []);

    return (
      visible ?
        createPortal(
          <div
            className="open-modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: ZINDEXLEVEL.level1,
              overflow: "auto",
            }}
          >
            {children}
          </div>,
          modalRoot
        ) :
        null
    )
  }
);

export default PageModal;
