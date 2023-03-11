import { Context, helpers, MongoClient, config, ObjectId } from "../../deps.ts";
import {  UserInput } from "../model/dbModels/user.ts";


const { MONGODB } = config()

const client = new MongoClient();
try {
    await client.connect(MONGODB)
    console.log("Conexion existosa")
}
catch(err) {
    console.log(`Hubo un error al conectar ala base de datos, ${err}`)
}

const DB = client.database("serverDeno")
const userModel = DB.collection("users")

//Controlador para obtener todos los usuarios
export const getAllUserControllers = async (ctx:Context) =>
    {
        try{
            const users =  await userModel.find().toArray();
            ctx.response.status = 200
            ctx.response.body = {usuarios: users}
        }
        catch(err){
            ctx.response.status = 400
            ctx.response.body = {Message: `Hubo un error  ${err.message});
            }`}
        }
    }
//Controlador para Buscar un usuario
export const findUserControllers = async(ctx:Context) => {
    {
        try {
            const { id } = helpers.getQuery(ctx,{mergeParams:true})
            const user = await userModel.findOne({_id: new ObjectId(id)})
            ctx.response.status = 200
            ctx.response.body = { Usuario: user }
        }
        catch (err) {
            ctx.response.status = 400
            ctx.response.body = {
                Message: `Hubo un error  ${err.message});
            }`}
        }
    }
    }
//Controlador para Crear usuarios
export const createUserControllers =  async (ctx:Context) => { 
    {
        try {
            const newUser: UserInput  = await ctx.request.body().value
            if (newUser.edad === undefined || newUser.email === undefined || newUser.name === undefined )  return  ctx.response.body = { Message: "Por favor, ingrese los datos correctamente"}              
            const existe = await userModel.findOne({ email: newUser.email })
            if (existe != undefined) return ctx.response.body = ({ Message: `El Usuario que desea crear ya existe con el email : ${newUser.email}`})
            const data = await userModel.insertOne(newUser)
            const usuarioCreado = await userModel.findOne({ _id: new ObjectId(data) })
            ctx.response.status = 200
            ctx.response.body = { 
                Message: "Usuario Creado con exito",
                Usuario: usuarioCreado
                }
        }
        catch (err) {
            ctx.response.status = 400
            ctx.response.body = {
                Message: `Hubo un error  ${err.message});
            }`}
        }
    }
}

//Controlador para Borrar usuarios
export const deletUserControllers = async (ctx:Context) => {
    try
        {
        const { id } = helpers.getQuery(ctx, { mergeParams: true })
        const usuario = await userModel.deleteOne({ _id: new ObjectId(id) })
        console.log(usuario)
        ctx.response.status = 200
        ctx.response.body = {
            Message: "Usuario Borrado con exito",
        }
        }
        catch(err) {
        ctx.response.status = 400
        ctx.response.body = {
            Message: `Hubo un error  ${err.message});
            }`}
        }
}

//Controlador para hacerle update a los usuarios
export const updateUserIDController = async (ctx: Context) => {
    try {
        const { id } = helpers.getQuery(ctx, { mergeParams: true })
        const {name, edad, email} = await ctx.request.body().value
        const usuario = await userModel.updateOne({ "_id": new ObjectId(id) }, { $set: { "edad": edad, "name": name, "email": email }} )
        if (usuario.modifiedCount <= 0) return ctx.response.body = { Message: "Por favor, ingrese los datos correctamente"}   
        console.log(usuario.modifiedCount)
        ctx.response.status = 200
        ctx.response.body = {
            Message: "Usuario Actualizado con exito",
        }
    }
    catch (err) {
        console.log(err)
    }
}