// "use client";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createWorkSpaceSchema } from "../schemas";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DottedSeparator } from "@/components/dotted-separator";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useCreateWorkspace } from "../api/use-create-workspace";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// interface CreateWorkspaceFormProps {
//   onCancel?: () => void;
// }

// const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
//   const { mutate, isPending } = useCreateWorkspace();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
//     resolver: zodResolver(createWorkSpaceSchema),
//     defaultValues: {
//       name: "",
//     },
//   });
//   useEffect(() => {
//     const image = form.watch("image");
//     if (image instanceof File) {
//       const url = URL.createObjectURL(image);
//       setImageUrl(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setImageUrl(null);
//     }
//   }, [form.watch("image")]);
//   const onSubmit = (values: z.infer<typeof createWorkSpaceSchema>) => {
//     const finalValues = {
//       ...values,
//       image: values.image instanceof File ? values.image : "",
//     };
//     mutate({ form: finalValues });
//     console.log({ values });
//   };
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       form.setValue("image", file);
//     }
//   };

//   return (
//     <Card className="w-full h-full border-none shadow-none">
//       <CardHeader className="flex p-7">
//         <CardTitle className="text-xl font-bold">
//           Create a new workspace
//         </CardTitle>
//       </CardHeader>
//       <div className="px-7">
//         <DottedSeparator />
//       </div>
//       <CardContent className="p-7">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-y-4">
//               <FormField
//                 name="name"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Workspace Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter workspace name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name="image"
//                 control={form.control}
//                 render={({ field }) => (
//                   <div className="flex flex-col gap-y-2">
//                     <div className="flex items-center gap-x-5">
//                       {imageUrl && (
//                         <div>
//                           <Image
//                             alt="Logo"
//                             src={imageUrl}
//                             width={60}
//                             height={60}
//                             className="rounded-full object-cover"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex flex-col">
//                       <p className="text-sm">Workspace Icon</p>
//                       <p className="text-sm text-muted-foreground">
//                         JPG, PNG, SVG or JPEG, max 1MB
//                       </p>

//                       <input
//                         type="file"
//                         accept=".jpg, .png, .jpeg, .svg"
//                         className="hidden"
//                         ref={inputRef}
//                         onChange={handleImageChange}
//                         disabled={isPending}
//                       />

//                       <Button
//                         type="button"
//                         disabled={isPending}
//                         variant="tertiary"
//                         size="xs"
//                         className="w-fit mt-2"
//                         onClick={() => inputRef.current?.click()}
//                       >
//                         Upload Image
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               />
//             </div>

//             <div className="flex items-center justify-between mt-7">
//               <Button
//                 type="button"
//                 size="lg"
//                 variant="secondary"
//                 onClick={onCancel}
//                 disabled={isPending}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" size="lg" disabled={isPending}>
//                 Create Workspace
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default CreateWorkspaceForm;
// components/workspace/CreateWorkspaceForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkSpaceSchema, CreateWorkspaceFormValues } from "../schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WorkspaceAvatar, { GradientKey } from "./workspace-avatar";
import GradientSelector from "./GradientSelector";
import { useCreateWorkspace } from "../api/use-create-workspace";

export const CreateWorkspaceForm: React.FC = () => {
  const [previewName, setPreviewName] = useState<string>("");
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkSpaceSchema),
    defaultValues: {
      name: "",
      gradientKey: "blue-violet" as GradientKey, // Default gradient
    },
  });

  const onSubmit = (values: CreateWorkspaceFormValues) => {
    createWorkspace({
      form: values,
    });
  };

  const gradientKey = form.watch("gradientKey") as GradientKey;
  const name = form.watch("name");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center pb-6">
            <WorkspaceAvatar 
              name={previewName || name || "Workspace"} 
              size="xl" 
              gradientKey={gradientKey} 
            />
            <p className="text-sm text-neutral-500 mt-2">Workspace Avatar Preview</p>
          </div>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Workspace name"
                    disabled={isPending}
                    onChange={(e) => {
                      field.onChange(e);
                      setPreviewName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gradientKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Avatar Background</FormLabel>
                <FormControl>
                  <GradientSelector 
                    selectedGradient={field.value as GradientKey} 
                    onSelectGradient={(value) => field.onChange(value)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Workspace"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkspaceForm;