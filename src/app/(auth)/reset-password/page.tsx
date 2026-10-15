import React, { Suspense } from "react";
import PasswordResetForm from "./password-reset-form";

const ResetPasswordPage = () => {
  return (
    <div>
      <h3>Reset Password</h3>

      <Suspense fallback={<h1>Loading..</h1>}>
        <PasswordResetForm></PasswordResetForm>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
