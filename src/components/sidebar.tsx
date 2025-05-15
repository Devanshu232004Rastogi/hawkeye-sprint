import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
// import WorkspaceSwitcher from "./workspace-switcher";
import HSLogo from "@/../public/HSlogo.svg";
import WorkspaceSwitcher from "./workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src={HSLogo} alt="logo" width={85} height={85} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-7" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
