import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";
import { Button } from "../ui/button";

export default function EditProfileButton() {
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button
      onClick={openProfileEditorModal}
      variant="outline"
      className="h-10 cursor-pointer rounded-xl border-gray-200 bg-white px-6 font-bold text-gray-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-transparent dark:text-gray-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
    >
      프로필 수정
    </Button>
  );
}
