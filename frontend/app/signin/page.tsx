"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { instance } from "@/axios/instance";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await instance.post("/auth/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);

        router.push("/blogs");
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center flex-col gap-5 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <Button className="ms-auto" type="submit">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
