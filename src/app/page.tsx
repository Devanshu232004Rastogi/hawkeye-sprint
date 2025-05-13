import { Button } from "@/components/ui/button";
import Image from "next/image";
import HSLogo from "../../public/HSlogo.svg"
export default function Home() {
  return (
   <>
   <div className="flex justify-between gap-2 w-full">
   <div className="h-full w-full ">
   <Image 
    src={HSLogo}
    alt="logo"
    width={100}
    height={100}
    
    />
   </div>
   <Button >
    Hello Dev
   </Button>
   <Button variant={"outline"}>
    Hello Dev
   </Button>
   <Button variant={"tertiary"}>
    Hello Dev
   </Button>
   </div>
   
   </>
  );
}
