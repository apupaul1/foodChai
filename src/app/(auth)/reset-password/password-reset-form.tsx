"use client";

import { authClient, resetPassword } from "@/lib/auth-client";
import { Eye, FloppyDisk, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  Surface,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const PasswordResetForm = () => {
  const [showPass, setShowPass] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter()

  if (!token) {
    toast.danger("Token is not found");
    return;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await resetPassword({
      newPassword: userData.password, // required, The new password to set
      token, // required, The token to reset the password
    });

    if (data?.status) {
      toast.success("Password Reset Successful");

      router.push('/signin')
    }

    if (error) {
      toast.danger(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
        <Surface className="w-full min-w-95">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Legend>Reset Password</Fieldset.Legend>
              <Description>Provide new password to reset</Description>
              <Fieldset.Group>
                {/* Password */}

                <TextField
                  isRequired
                  name="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                      return "Password must contain at least one uppercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                      return "Password must contain at least one number";
                    }
                    return null;
                  }}
                >
                  <Label>Password</Label>
                  <InputGroup fullWidth>
                    <InputGroup.Input
                      placeholder="Enter password"
                      type={showPass ? "text" : "password"}
                    />
                    <InputGroup.Suffix>
                      {showPass ? (
                        <EyeSlash onClick={() => setShowPass(!showPass)} />
                      ) : (
                        <Eye
                          onClick={() => setShowPass(!showPass)}
                          className="size-4 text-muted"
                        />
                      )}
                    </InputGroup.Suffix>
                  </InputGroup>

                  <Description>
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </Description>
                  <FieldError />
                </TextField>
              </Fieldset.Group>
              <Fieldset.Actions>
                <Button type="submit">
                  <FloppyDisk />
                  Reset Password
                </Button>
                <Button type="reset" variant="tertiary">
                  Cancel
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
};

export default PasswordResetForm;
