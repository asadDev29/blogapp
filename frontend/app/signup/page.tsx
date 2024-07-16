"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { instance } from "@/axios/instance";
import { useRouter } from "next/navigation";
import Link from "next/link";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await instance.post("/auth/register/", {
        username,
        password,
        email,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/signin");
        console.log(response.data);
        // Handle successful sign-in, e.g., redirect or show success message
        console.log("Signed in successfully");
      } else {
        // Handle sign-in error
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("Error signUpg in:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center flex-col gap-5 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="Email"
              placeholder="Email"
            />
          </div>
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
          <div className="flex justify-between items-center gap-4 w-full">
            <Link href={"/signin"} className="text-blue-600">
              sign in
            </Link>
            <Button className="ms-auto" type="submit">
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
