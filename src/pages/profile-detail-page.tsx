// import PostFeed from "@/components/post/post-feed";
import ProfileInfo from "@/components/profile/profile-info";
import { Navigate, useParams } from "react-router";
import StoryItems from "./story-Items-page";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  if (!userId) return <Navigate to={"/"} replace />;

  return (
    <div className="flex flex-col gap-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      {<StoryItems userId={userId} />}
    </div>
  );
}
