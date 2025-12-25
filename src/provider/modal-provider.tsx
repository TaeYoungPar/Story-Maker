import ProfileEditorModal from "@/components/modal/profile-editor-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          {/* <PostEditorModal />
          <AlertModal /> */}
          <ProfileEditorModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
