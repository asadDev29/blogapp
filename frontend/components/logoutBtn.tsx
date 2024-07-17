"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const LogOutBtn = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      {isLogged && (
        <Button
          onClick={() => {
            setIsLogged(false);
            router.push("/");
          }}
          size={"icon"}
          variant={"outline"}
          className="ms-auto my-3"
        >
          <LogOut />
        </Button>
      )}
    </>
  );
};

export default LogOutBtn;
