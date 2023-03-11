import { Application, config } from "./deps.ts";
import { userRouter } from "./src/routers/user.routes.ts";

const app = new Application()
const {PORT} = config()
console.log(config())
//Inicializamos la APP creando una ruta
app.use(userRouter.routes())
app.listen({ port: Number(PORT) })
console.log (`Server on port ${PORT}`)