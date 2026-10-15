"use client";
import { authClient, signIn } from "@/lib/auth-client";
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
  Link,
  Separator,
  Surface,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { redirect } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await authClient.signUp.email({
      name: userData.name, // required, The name of the user.
      email: userData.email, // required, The email address of the user.
      password: userData.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      image: userData.image, // An optional profile image of the user.
      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    });

    console.log({ data, error });

    if (data) {
      toast.success("User signup successful");
    }

    if (error) {
      toast.danger(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="my-4">
      <Link href="/">Back to Home</Link>

      <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
        <Surface className="w-full min-w-95">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Legend>Sign up</Fieldset.Legend>
              <Description>provide profile information to continue</Description>
              <Fieldset.Group>
                {/* Name */}

                <TextField
                  isRequired
                  name="name"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Name must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Name</Label>
                  <Input placeholder="John Doe" variant="secondary" />
                  <FieldError />
                </TextField>

                {/* Photo URL */}

                <TextField
                  isRequired
                  name="image"
                  validate={(value) => {
                    if (value.length === 0) {
                      return "Please provide photo url";
                    }
                    return null;
                  }}
                >
                  <Label>Image</Label>
                  <Input
                    placeholder="https://i.ibb.co.com"
                    variant="secondary"
                    type="url"
                  />
                  <FieldError />
                </TextField>

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
                  Sign up
                </Button>
                <Button type="reset" variant="tertiary">
                  Cancel
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
          <p className="my-4 text-center">Social Login</p>

          <Separator></Separator>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full mt-4"
            variant="tertiary"
          >
            <Icon icon="devicon:google" />
            Sign in with Google
          </Button>
        </Surface>
      </div>
    </div>
  );
};

export default SignupPage;
