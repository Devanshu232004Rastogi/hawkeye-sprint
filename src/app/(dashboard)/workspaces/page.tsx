"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrent } from "@/features/auth/api/use-current";
import UserButton from "@/features/auth/components/userButton";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return <div>
  <CreateWorkspaceForm />
  </div>;
}
