"use client";

import HeadingUi from "@/components/Heading-Ui";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ApiAlert";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1),
  });

  type SettingsFormValues = z.infer<typeof formSchema>;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast({
        title: "Berhasil!",
        description: "Toko berhasil di Update",
        variant: "default",
        className: "bg-green-500 text-slate-100 py-[2rem]",
      });
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: "Cek kembali data yang diinput",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({
        title: "Mantap",
        description: "Toko udah kehapus bro",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Serius nih mau dihapus?",
        description: "Ilang nanti datanya",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <div className="flex items-center justify-between">
        <HeadingUi title="Settings" description="Atur Toko" />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          disabled={isLoading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nama toko"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="" disabled={isLoading} type="submit">
            Save
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title={"PUBLIC_API_URL"}
        description={`${origin}/api/${params.storeId}`}
        variant={"public"}
      />
    </>
  );
};

export default SettingsForm;
