import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Iconbadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListCheck, File } from "lucide-react";
import TitleForm from "@/app/(dashboard)/_components/title-form";
import DescriptionForm from "@/app/(dashboard)/_components/description-form";
import ImageForm from "@/app/(dashboard)/_components/image-form";
import CategoryForm from "@/app/(dashboard)/_components/category-form";
import PriceForm from "@/app/(dashboard)/_components/price-form";

const CourseIdPage = async ({
    params
}:{
    params: { courseId: string}
}) => {

    const { userId } = await auth();

    if( !userId ){
        return redirect("/");
    }

    const courseId = params.courseId;

    const course = await db.course.findUnique({
        where:{
            id: courseId
        }
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        }
    })

    console.log("Categorías: ", categories);
    if(!course){
        return redirect("/");
    }

    const requiredFields=[
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFields = requiredFields.length;
    const completedFields= requiredFields.filter(Boolean).length;

    const completitionText =`(${completedFields}/${totalFields})`
  return (
    <div className="p-6">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                    Resto del curso
                </h1>
                <span className="text-sm text-slate-700">
                    Complete el resto de los campos {completitionText}
                </span>
            </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div >
                <div className="flex items-center gap-x-2">
                    <Iconbadge size="sm"  icon={LayoutDashboard}/>
                    <h2 className="text-xl">
                        Edite su curso
                    </h2>
                </div>
                <TitleForm 
                initialData ={course}
                courseId={course.id}
                />
                <DescriptionForm 
                initialData ={course}
                courseId={course.id}
                />
                <ImageForm 
                initialData ={course}
                courseId={course.id}
                />
                <CategoryForm 
                initialData ={course}
                courseId={course.id}
                options ={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                }))}
                />
            </div>
            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-x-2">
                        <Iconbadge icon={ListCheck}/>
                        <h2 className="text-xl">
                            Capitulos del curso
                        </h2>
                    </div>
                </div>
                <div>
                    TODO: Capitulos
                </div>
            </div>
            <div>
                <div className="flex items-center gap-x-2">
                <Iconbadge icon={CircleDollarSign}/>
                    <h2 className="text-xl">
                            Ingrese el precio del curso
                    </h2>
                </div>
                <PriceForm
                initialData ={course}
                courseId={course.id}
                />
            </div>
            <div>
            <div className="flex items-center gap-x-2">
                <Iconbadge icon={File}/>
                    <h2 className="text-xl">
                            Recursos y Archivos
                    </h2>
                    {/* TODO: ARREGLAR EL FORO DE LA IMAGEN PARA PODER AGREGAR ARCHIVOS PDF */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseIdPage