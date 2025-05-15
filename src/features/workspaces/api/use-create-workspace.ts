// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/rpc";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
// type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;
// export const useCreateWorkspace = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const mutation = useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async ({ form }) => {
//       const res = await client.api.workspaces["$post"]({ form });
//       if (!res.ok) {
//         throw new Error("workspace creation failed");
//       }
//       return await res.json();
//     },
//     onSuccess: () => {
//       toast.success("workspace creation successful");
//       router.refresh();
//       queryClient.invalidateQueries({ queryKey: ["workspaces"] });
//     },
//     onError: () => {
//       toast.error("workspace creation failed");
//     },
//   });
//   return mutation;
// };

"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.workspaces["$post"]({ form });
      if (!res.ok) {
        throw new Error("workspace creation failed");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("workspace creation successful");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("workspace creation failed");
    },
  });
  return mutation;
};