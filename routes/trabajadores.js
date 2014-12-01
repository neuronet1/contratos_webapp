var express = require('express');
var Contratos = require('contratos');
var router = express.Router();
var fs = require('fs');
var odt = require('odt-old-archiver');
var template = odt.template;
var createWriteStream = fs.createWriteStream;
var plantilla = 'public/contratos/plantilla_contrato.ott';
var moment = require('moment');

var LOG=false;

moment.locale('es');

// lista todos los contratos registrados
router.get('/list', function(req, res) {
  var contratos = new Contratos(req.db,LOG);

  contratos.get_contratos({},function(err, results) {
    res.json(results);
  });

});

//regresa los datos de un determinado trabajador
router.get('/get/:id', function (req, res) {
    var contratos = new Contratos(req.db,LOG);

    contratos.get_contrato(req.params.id, function (err, doc) {
        res.json(doc);
    });

});

// Guardamos los datos del trabajador
router.post('/save', function (req, res) {

    var contratos = new Contratos(req.db,LOG);

    contratos.update(req.body._id, req.body.contrato, function (err, doc) {
        res.json(doc);
    });


});

// Convierte una fecha al formato texto espaniol
var dateToText = function (d,format) {
    var fecha = moment(d);
    return fecha.format(format).toUpperCase();
};

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
            "autorizacion": {"type": "string", "value": dateToText(doc.fechas.autorizacion,'LL')},
            "solicitud": {"type": "string", "value": dateToText(doc.fechas.solicitud, 'LL')},
            "inicioVigencia": {"type": "string", "value": dateToText(doc.fechas.inicioVigencia, 'LL')},
            "finVigencia": {"type": "string", "value": dateToText(doc.fechas.finVigencia, 'LL')},
            "firmaContrato": {"type": "string", "value": dateToText(doc.fechas.firmaContrato, 'LL')},
            "mesFirmaContrato": {"type": "string", "value": dateToText(doc.fechas.firmaContrato, 'MMMM')},
            "diaFirmaContrato": {"type": "string", "value": dateToText(doc.fechas.firmaContrato, 'DD')},
            "anioFirmaContrato": {"type": "string", "value": dateToText(doc.fechas.firmaContrato, 'YYYY')},
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


