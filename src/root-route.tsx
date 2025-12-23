import { Navigate, Route, Routes } from "react-router-dom";
import GlobalLayout from "./components/layout/global-layout";
import SignUppage from "./pages/sign-up-page";
import SignInPage from "./pages/sign-in-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import ResetPasswordPage from "./pages/reset-password-page";
import MemberOnlyLayout from "./components/layout/member-only-layout";

import GuestOnlyLayout from "./components/layout/guest-only-layout";
import IndexPage from "./pages/index-page";

import OptionsPage from "./pages/options-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-up" element={<SignUppage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route element={<MemberOnlyLayout />}>
          <Route path="/options" element={<OptionsPage />} />
          <Route path="/story" element={<div>Story</div>} />
          <Route path="/export" element={<div>Export</div>} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
