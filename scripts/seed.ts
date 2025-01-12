const { PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try{
        await db.category.createMany({
            data:[
                { name: "Animación"},
                { name: "Producción virtual"},
                { name: "Programación"},
                { name: "Videojuegos"},
                { name: "Arquitectura"}

            ]
        })
        console.log("Categorías creadas exitosamente!")
    }catch(error){
        console.log("Error en el seed de las categorias: ",error)
    }finally{
        await db.$disconnect();
    }
}
main();