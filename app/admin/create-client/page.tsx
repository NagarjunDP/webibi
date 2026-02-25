"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { createClient, CreateClientData } from "@/services/clientService";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  slug: z.string().min(3, "URL slug must be unique").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  ownerEmail: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateClientPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await createClient(data);

      if (result.success) {
        toast.success(`Client account created for ${data.businessName}`);
        router.push("/admin");
      } else {
        toast.error(result.error || "Failed to create client.");
      }
    } catch (error) {
      console.error("Error creating client:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" onClick={() => router.push("/admin")}>&larr; Back</Button>
        <h2 className="text-2xl font-bold">Onboard New Client</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>
            Enter the business information and assign an owner. The client will be able to manage their site via the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" {...register("businessName")} placeholder="e.g. Moonlight Cafe" />
              {errors.businessName && <p className="text-sm text-red-500">{errors.businessName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Website Slug (URL)</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">webibi.com/</span>
                <Input id="slug" {...register("slug")} placeholder="moonlight-cafe" />
              </div>
              <p className="text-xs text-muted-foreground">This defines the public URL of the client's website.</p>
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Owner Email Address</Label>
              <Input id="ownerEmail" {...register("ownerEmail")} placeholder="owner@gmail.com" />
              <p className="text-xs text-muted-foreground">The client MUST use this exact email to log in and manage their site.</p>
              {errors.ownerEmail && <p className="text-sm text-red-500">{errors.ownerEmail.message}</p>}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Initializing..." : "Provision Client Website"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800 flex gap-3">
        <div className="text-amber-600 font-bold">!</div>
        <p className="text-xs text-amber-800 dark:text-amber-200">
          Ensure the owner email is correct. They will receive access to the dashboard immediately after choosing Google Login with this account.
        </p>
      </div>
    </div>
  );
}
