// import { Hono } from "hono";
// import { zValidator } from "@hono/zod-validator";
// import { createWorkSpaceSchema } from "../schemas";
// import { sessionMiddleware } from "@/lib/session-middleware";
// import {
//   DATABASE_ID,
//   IMAGES_BUCKET_ID,
//   MEMBERS_ID,
//   WORKSPACES_ID,
// } from "@/config";
// import { ID, Query } from "node-appwrite";
// // import { MemberRole } from "@/features/members/types";
// import { generateInviteCode } from "@/lib/utils";

// const app = new Hono().post(
//   "/",
//   zValidator("form", createWorkSpaceSchema),
//   sessionMiddleware,
//   async (c) => {
//     const databases = c.get("databases");
//     const user = c.get("user");
//     const storage = c.get("storage");
//     const { name, image } = c.req.valid("form");

//     let uploadImageUrl: string | undefined;
//     if (image instanceof File) {
//       const file = await storage.createFile(
//         IMAGES_BUCKET_ID,
//         ID.unique(),
//         image
//       );

//       const arrayBuffer = await storage.getFilePreview(
//         IMAGES_BUCKET_ID,
//         file.$id
//       );
//       uploadImageUrl: `data:image/png;base64,${Buffer.from(
//         arrayBuffer
//       ).toString(`base64`)}`;
//     }

//     const workspace = await databases.createDocument(
//       DATABASE_ID,
//       WORKSPACES_ID,
//       ID.unique(),
//       {
//         name,
//         userId: user.$id,
//         imageUrl : uploadImageUrl
//       }
//     );
//     return c.json({workspace });
//   }
// );

// export default app;
// api/use-create-workspace.ts

// api/workspaces/route.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { createWorkSpaceSchema } from "../schemas";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID
    );
    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", createWorkSpaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const { name, gradientKey } = c.req.valid("form");

      // No image upload, just store workspace with name and gradient key
      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          gradientKey: gradientKey || null, // Store the gradient key instead of imageUrl
        }
      );

      return c.json({ workspace });
    }
  );

export default app;
