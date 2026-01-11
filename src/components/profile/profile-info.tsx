import { useProfileData } from "@/hooks/queries/use-profile-data";
import Fallback from "../fallback";
import Loader from "../loader";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { useSession } from "@/store/session";
import EditProfileButton from "./profile-edit-button";

export default function ProfileInfo({ userId }: { userId: string }) {
  const session = useSession();

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetcingProfilePending,
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isFetcingProfilePending) return <Loader />;

  const isMine = session?.user.id === userId;

  return (
    <div className="relative mt-16 flex flex-col items-center justify-center gap-6 text-center">
      <div className="absolute -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-[60px] dark:bg-indigo-500/20" />

      <img
        src={profile.avatar_url || defaultAvatar}
        className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl dark:border-[#16181A] dark:shadow-indigo-900/10"
      />

      <div className="z-10 flex flex-col items-center gap-1">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
          {profile.nickname}
        </h2>
        <p className="max-w-xs text-[15px] font-medium text-gray-500 dark:text-gray-400">
          {profile.bio || "자기소개가 없습니다."}
        </p>
      </div>

      <div className="mt-2">{isMine && <EditProfileButton />}</div>
    </div>
  );
}
