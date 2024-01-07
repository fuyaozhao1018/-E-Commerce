"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
  });


export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      });

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
          setLoading(true);
          const response = await axios.post('/api/stores', values);
          // toast.success("Store created")
          // console.log("response.data",response.data)
          
          //window got refresh and loaded in the database
          window.location.assign(`/${response.data.id}`);
        } catch (error) {
          // console.log("error",error)
          // npm i react-hot-toast
          toast.error('Something went wrong');
        } finally {
          setLoading(false);
        }
      };

    return(
    <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        {/* Create Store Form */}
        <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          {/* disabled when loading */}
                            <Input  disabled={loading} placeholder="E-Commerce" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex w-full items-center justify-end pt-6 space-x-2">
                          {/* disabled when loading */}
                          <Button   disabled={loading} variant="outline" onClick={storeModal.onClose}>
                            Cancel
                          </Button>
                          {/* disabled when loading */}
                          <Button   disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
    )
}