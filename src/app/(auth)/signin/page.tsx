"use client";
import { authClient } from "@/lib/auth-client";
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
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SigninPage = () => {
  const [showPass, setShowPass] = useState(false);

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: redirect || "/",
    });

    console.log({data,error});

    if (data) {
      toast.success("User signin successful");
    }

    if (error) {
      toast.danger(error.message);
    }
  };
  return (
    <div className="my-4">
      <Link href="/">Back to Home</Link>

      <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
        <Surface className="w-full min-w-95">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Legend>Sign in</Fieldset.Legend>
              <Description>Provide Sign-in information to continue</Description>
              <Fieldset.Group>
                {/* Email */}

                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" variant="secondary" />
                  <FieldError />
                </TextField>

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
                  Sign in
                </Button>
                <Button type="reset" variant="tertiary">
                  Cancel
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
          <p><small>Forget Password?<Link href={"/forget-password"} className="text-blue-500 underline">Click here</Link></small></p>
        </Surface>
      </div>
    </div>
  );
};

export default SigninPage;
