"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import CustomModal from "../CustomModal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const fromSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storeModal = useStoreModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    // input nama toko
    try {
      setIsLoading(true);

      const response = await axios.post("/api/stores", values);
      // window.location.assign(`/${response.data.id}`);
      console.log(response.data);
      toast({
        title: "Sukses",
        description: "Sukses menambahkan toko",
        variant: "default",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed",
        description: "Gagal menambahkan toko",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      title="Buat store"
      description="Tambahkan store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nama toko"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant={"destructive"}
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-500"
                  type="submit"
                  disabled={isLoading}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </CustomModal>
  );
};
