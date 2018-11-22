import { Router, Request, Response} from 'express';


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

    res.json({
        ok: true,
        mensaje: 'Mensaje de POST -Listo',
        cuerpo: cuerpo,
        de: de,
        id: id
    });

});

export default router;