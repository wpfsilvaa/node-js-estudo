import { Router } from "express";
import IngredienteController from "./controllers/IngredienteController.js";
import PedidosController from "./controllers/PedidosController.js";
import PratosController from "./controllers/PratosController.js";

const router = Router();



//ROOT
router.get('/',(req,res) => {res.send(JSON.parse(JSON.stringify(req.headers)))});

//CARDAPIO
router.get('/ingredientes',IngredienteController.index);//Listar Ingredientes
router.get('/ingredientes/:id',IngredienteController.show);//Buscar Ingredientes por Identificador
router.delete('/ingredientes/:id',IngredienteController.delete);//Deleta ingrediente por ID
router.put('/ingredientes/:id', IngredienteController.update);// Altera ingrediente de acordo com o ID
router.post('/ingredientes',IngredienteController.store);//Cadastra novo ingrediente

router.get('/pratos',PratosController.index);//Listar Ingredientes
router.get('/pratos/:id',PratosController.show);//Buscar Ingredientes por Identificador
router.delete('/pratos/:id',PratosController.delete);//Deleta ingrediente por ID
router.put('/pratos/:id', PratosController.update);// Altera ingrediente de acordo com o ID
router.post('/pratos',PratosController.store);//Cadastra novo ingrediente

router.get("/pedidos",PedidosController.index); // Mostrar todos os Pedidos
router.get("/pedidosDia",PedidosController.index2); // Mostrar todos os Pedidos do dia
router.get("/pedidos/:id",PedidosController.show);// Buscar pedido por Identificador
router.delete("/pedidos/:id",PedidosController.delete); // Deletar Pedido
router.put("/pedidos/:id",PedidosController.update); // Alterar Pedido
router.post("/pedidos",PedidosController.store); // Inserir Novo Pedido


// //USUARIOS
// router.get("/usuarios",UsuarioController.index); // Mostrar todos os Usuarios
// router.get("/usuarios/name/:id",UsuarioController.buscarNome); // Buscar Usuario por nome
// router.get("/usuarios/:id",UsuarioController.show); // Buscar Usuario por Identificador
// router.delete("/usuarios/:id",UsuarioController.delete); // Deletar Usuario
// router.put("/usuarios/:id",UsuarioController.update); // Alterar Usuario
// router.post("/registrar",UsuarioController.store); // Registrar Novo Usuario
// //PEDIDOS

export default router;