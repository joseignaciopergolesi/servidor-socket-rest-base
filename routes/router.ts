import { Router, Request, Response} from 'express';
import Server from '../classes/server';


const router = Router(); // me permite crear mis api endpoints

router.get('/mensajes' , (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'todo esta bien'
    });
});

//ejemplo para obtener valores de un post
router.post('/mensajes' , (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload ); // envio un mensaje a todos los usuairos conectados

    res.json({
        ok: true,
        mensaje: 'Mensaje de POST -Listo',
        cuerpo: cuerpo,
        de: de
    });

});

//ejemplo para obtener valores de un post que vienen en la url
router.post('/mensajes/:id' , (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id; //obtengo el valor del parametro id pasado por la url

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    server.io.in( id ).emit( 'mensaje-privado', payload ); // envio un mensaje a una persona que se encuentre en una sala/room

    res.json({
        ok: true,
        mensaje: 'Mensaje de POST -Listo',
        cuerpo: cuerpo,
        de: de,
        id: id
    });

});

export default router;