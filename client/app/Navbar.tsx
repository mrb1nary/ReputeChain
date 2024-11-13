import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Menu, MessageSquare, Plus, Settings, Users } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useRouter } from "next/navigation";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Floatingnavbar() {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center">
      <nav className="flex items-center justify-center space-x-4 rounded-full border bg-gray-800 p-2 shadow-lg">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:text-gray-800 hover:bg-white transition-colors duration-200"
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Button>
        <Button
          onClick={() =>
            window.open("https://github.com/mrb1nary/ReputeChain", "_blank")
          }
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:text-gray-800 hover:bg-white transition-colors duration-200"
        >
          <SiGithub className="h-5 w-5" />

          <span className="sr-only">Github</span>
        </Button>

        <Button
          onClick={() =>
            window.open(
              "https://twitter.com/intent/tweet?text=%F0%9F%9A%80%20Share%20your%20github%20reputation%20score%20with%20ReputeChain%20https%3A%2F%2Frepute-chain.vercel.app%2F",
              "_blank"
            )
          }
          size="icon"
          className="rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-colors duration-200"
        >
          <BsTwitter className="h-5 w-5" />
          <span className="sr-only">Tweet</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:text-gray-800 hover:bg-white transition-colors duration-200"
          onClick={() =>
            (window.location.href = "mailto:anubhab.techie@gmail.com")
          }
        >
          <MdEmail className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </Button>

        <Button
          onClick={() => (
            window.open("https://www.linkedin.com/in/anubhab-nayak-b84b35112/"),
            "_blank"
          )}
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:text-gray-800 hover:bg-white transition-colors duration-200"
        >
          <BsLinkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </nav>
    </div>
  );
}
