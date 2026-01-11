import { useAlertModal } from "@/store/alert-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function AlertModal() {
  const store = useAlertModal();

  if (!store.isOpen) return null;

  return (
    <AlertDialog open>
      {/* 1. 모달 컨테이너: 둥근 모서리와 다크모드 대응 */}
      <AlertDialogContent className="max-w-[400px] rounded-[32px] border-none p-8 dark:bg-[#1C1E21]">
        <AlertDialogHeader className="gap-3">
          {/* 2. 아이콘 포인트: 시각적 집중도 향상 */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-500/10">
            <span className="text-2xl">✨</span>
          </div>

          <AlertDialogTitle className="text-center text-2xl font-black text-gray-900 dark:text-white">
            {store.title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400">
            {store.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-row gap-3 sm:justify-center">
          {/* 3. 버튼 디자인: 대시보드 버튼과 통일감 유지 */}
          <AlertDialogCancel
            className="h-12 flex-1 rounded-2xl border-none bg-gray-100 font-bold text-gray-600 transition-all hover:bg-gray-200 active:scale-95 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
            onClick={() => {
              store.onNegative?.();
              store.actions.close();
            }}
          >
            취소
          </AlertDialogCancel>

          <AlertDialogAction
            className="h-12 flex-1 rounded-2xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
            onClick={() => {
              store.onPositive?.();
              store.actions.close();
            }}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
