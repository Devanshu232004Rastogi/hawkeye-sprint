import React from "react";
import WorkspaceAvatar, { GradientKey } from "./workspace-avatar";
import { Workspace } from "@/../interfaces/workspace";

interface WorkspaceHeaderProps {
  workspace: Workspace;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ workspace }) => {
  return (
    <div className="flex items-center gap-3">
      <WorkspaceAvatar 
        name={workspace.name} 
        size="lg" 
        gradientKey={workspace.gradientKey as GradientKey} 
      />
      <h1 className="text-2xl font-bold">{workspace.name}</h1>
    </div>
  );
};

export default WorkspaceHeader;
