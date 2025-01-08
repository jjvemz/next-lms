"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { title } from "process";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import  { useRouter } from "next/navigation";

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, 
    { message: "La descripción es requerido" }
),
});

const DescriptionForm = ({ initialData, 
    courseId 
}: DescriptionFormProps) => {
    const form =useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const { isSubmitting, isValid } = form.formState;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`api/courses/${courseId}`, values );
            toast.success("Descripción del curso actualizado");
            router.refresh();
        }catch(error){
            console.error("Error al actualizar la descripción del curso:", error)
            toast.error("Error al actualizar la descripción del curso")
        }
    };

  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
        Titulo del curso
        <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
                <>Cancelar</>
            ) : (
                    <>
                <Pencil className="h-4 w-4 mr-2"/>
                Editar descripción
                </> 
            )}
           
            
        </Button>
        </div>
        {!isEditing ? (
            <p className="text-sm mt-2">
                {initialData.description}
            </p>
        ):(
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        
                                        <Input
                                        className="bg-white"
                                            disabled={isSubmitting}
                                            id="title"
                                            placeholder="Ingrese el titulo del curso"
                                            {...field}
                                        />
                                        
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }
                    />
                    <div className="flex items-center gap-x-2">
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Guardar
                    </Button>
                    </div>
                </form>
            </Form>
        )}
    </div>
);
};

export default DescriptionForm;
