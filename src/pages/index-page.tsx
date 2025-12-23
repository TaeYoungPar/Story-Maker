import { useSession } from "@/store/session";

import BeforeLoginMain from "@/components/main/before-login-main-page";
import DashboardMain from "@/components/main/dashbord-main-page";

export default function MainPage() {
  const session = useSession();

  if (!session) {
    return <BeforeLoginMain />;
  }

  return <DashboardMain />;
}
