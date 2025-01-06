"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
    title: z.string().min(1, { message: "El título es requerido" }),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("los valores ingresados para el curso: ",values);
        try{
            const res = await axios.post("/api/courses", values, {
                headers: { "Content-Type": "application/json" },
            });
            router.push(`/teacher/courses/${res.data.id}`);
            toast.success("Curso creado exitosamente")
        }catch(error){
            toast.error("Error al crear el curso")
            console.error("Error al crear el curso: ",error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto md:items-center md:justify-center h-full p-6">
            <h1 className="text-2xl">Ingrese el nombre del curso</h1>
            <p className="text-sm text-slate-600">
                El nombre del curso puede ser cambiado en cualquier momento.
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Título de curso</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Ej: Unreal fundamentals"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        ¿Qué enseñarás en este curso?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button type="button" variant="ghost">
                                Cancelar
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Ingresar
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreatePage;