import { useSession } from "@/store/session";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import Fallback from "../fallback";
import Loader from "../loader";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useProfileEditorModal } from "@/store/profile-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile";
import { Camera } from "lucide-react"; // 카메라 아이콘 추가

type Image = { file: File; previewUrl: string };

export default function ProfileEditModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        toast.success("프로필이 성공적으로 수정되었습니다.", {
          position: "top-center",
        });
        close();
      },
      onError: () => {
        toast.error("프로필 수정에 실패했습니다", {
          position: "top-center",
        });
      },
    });

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
    return () => {
      if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);
    };
  }, [profile, isOpen]);

  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;
    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);
    setAvatarImage({ file, previewUrl: URL.createObjectURL(file) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md gap-6 rounded-[28px] border-none bg-white p-8 dark:bg-[#16181A]">
        <DialogTitle className="text-xl font-black text-gray-900 dark:text-white">
          프로필 수정
        </DialogTitle>

        {fetchProfileError && <Fallback />}
        {isFetchProfilePending && <Loader />}

        {!fetchProfileError && !isFetchProfilePending && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-3">
              <div
                className="group relative h-24 w-24 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img
                  src={
                    avatarImage?.previewUrl ||
                    profile.avatar_url ||
                    defaultAvatar
                  }
                  className="h-full w-full rounded-full border-4 border-gray-50 object-cover shadow-sm transition group-hover:brightness-75 dark:border-white/5"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <Camera className="text-white" size={24} />
                </div>
                <input
                  disabled={isUpdateProfilePending}
                  onChange={handleSelectImage}
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                이미지 변경
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black tracking-wider text-gray-400 uppercase">
                  닉네임
                </label>
                <Input
                  disabled={isUpdateProfilePending}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={8}
                  className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:ring-indigo-500 dark:border-white/5 dark:bg-white/5"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black tracking-wider text-gray-400 uppercase">
                  소개
                </label>
                <Input
                  disabled={isUpdateProfilePending}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={30}
                  placeholder="나를 소개해보세요"
                  className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:ring-indigo-500 dark:border-white/5 dark:bg-white/5"
                />
              </div>
            </div>

            <Button
              disabled={isUpdateProfilePending || isFetchProfilePending}
              onClick={handleUpdateClick}
              className="h-14 cursor-pointer rounded-2xl bg-indigo-600 text-base font-black text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
            >
              {isUpdateProfilePending ? "저장 중..." : "변경 내용 저장"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
