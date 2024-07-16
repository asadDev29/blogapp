import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      <div className=" flex justify-center flex-col gap-4">
        <h1 className="text-4xl text-capitalize font-bold ">blog app </h1>
        <Link href={"/signin"}>
          <Button className="bg-blue-600 hover:bg-blue-800" variant={"default"}>
            Try It
          </Button>
        </Link>
      </div>
    </main>
  );
}
