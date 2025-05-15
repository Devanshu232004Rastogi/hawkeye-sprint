// import { z } from "zod";

// export const createWorkSpaceSchema = z.object({
//   name: z.string().trim().min(1, "Required"),
//   image: z
//     .union([
//       z.instanceof(File),
//       z.string().transform((value) => (value === "" ? undefined : value)),
//     ])
//     .optional(),
// });
// schemas.ts
import { z } from "zod";
import { GRADIENTS } from "./components/workspace-avatar";

// Define the gradient keys type
const gradientKeysArray = Object.keys(GRADIENTS) as [string, ...string[]];

// Updated schema without image file upload requirements
export const createWorkSpaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  gradientKey: z.enum(gradientKeysArray).optional(), // Type-safe gradient key
});

// Infer the type from the schema
export type CreateWorkspaceFormValues = z.infer<typeof createWorkSpaceSchema>;