import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import WorkspaceAvatar, { GradientKey } from "./workspace-avatar";
import Link from "next/link";
import { Workspace } from "@/../interfaces/workspace";

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  return (
    <Link href={`/workspace/${workspace.$id}`}>
      <Card className="h-full overflow-hidden hover:border-black/20 transition">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <WorkspaceAvatar
            name={workspace.name}
            size="xl"
            gradientKey={workspace.gradientKey as GradientKey}
            className="mb-4"
          />
          <h3 className="font-medium text-center">{workspace.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WorkspaceCard;
