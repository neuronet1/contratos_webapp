var express = require('express');
var Contratos = require('contratos');
var router = express.Router();
var fs = require('fs');
var odt = require('odt-old-archiver');
var template = odt.template;
var createWriteStream = fs.createWriteStream;
var plantilla = 'public/contratos/plantilla_contrato.ott';


router.get('/list', function(req, res) {
  var contratos = new Contratos(req.db);

  contratos.get_contratos({},function(contratos) {
    res.json(contratos);
  });

});

// A partir del id del trabajador, genera el documento odt
router.get('/print/:id', function (req, res) {
      var id = new req.db.ObjectID(req.params.id);

      req.db.contratos.findOne({"_id":id}, function(err, doc) {
        var values  = {
            "area":      {"type": "string", "value": doc.empresa.area},
            "casa":      {"type": "string", "value": doc.casa.casa },
            "colonia":   {"type": "string", "value": doc.casa.colonia},
            "nombre":    {"type": "string", "value": doc.trabajador.nombre},
            "ficha":     {"type": "string", "value": doc.trabajador.ficha},
            "nivel":     {"type": "string", "value": doc.trabajador.nivel},
            "cp":        {"type": "string", "value": doc.casa.cp},
            "puesto":    {"type": "string", "value": doc.trabajador.puesto},
            "categoria": {"type": "string", "value": doc.trabajador.categoria},
            "profesion": {"type": "string", "value": doc.trabajador.profesion}
        };



        template(plantilla)
        .apply(values)
        .on('error', function(err){
            throw err;
        })
        .on('end', function(document){
            // write archive to disk.
            console.log('Escribiendo');
            var filename = req.params.id + '.odt';
            var salida = 'public/contratos/' + filename;
            var descarga = '/contratos/'  + filename;

            document.pipe(createWriteStream(salida));
            document.finalize(function(err){
                console.log('hola');
                if (err) throw err;
                //res.send(descarga);
                //res.download(descarga);
                res.redirect(descarga);
            });
        });


      }); //findOne

    });


module.exports = router;


