var fs = require('fs')
    , odt = require('odt-old-archiver')
    , template = odt.template
    , createWriteStream = fs.createWriteStream
var doc = 'plantilla.ott';

var values  = {
    "area": { "type": "string", "value": "GPO.MULTIDISCI. SUM. Y SERV.ADMVOS.R. N" },
    "casa": { "type": "string", "value": "12" },
    "colonia": { "type": "string", "value": "LOMA ALTA" },
    "nombre": {"type": "string", value:"MARTÍN BRAVO NOYOLA"},
    "ficha": {"type": "string", value:"203918"},
    "nivel": {"type": "string", value:"41"},
    "cp": {"type": "string", value:"93380"},
    "puesto": {"type": "string", value:"No proporcionado"},
    "categoria": {"type": "string", value:'ESPECIALISTA TÉCNICO "A"'},
    "profesion": {"type": "string", value:"LIC."}
};

// apply values

template(doc)
    .apply(values)
    .on('error', function(err){
        throw err;
    })
    .on('end', function(doc){

        // write archive to disk.
        console.log('Escribiendo');

        doc.pipe(createWriteStream('salida.odt'))
        doc.finalize(function(err){
            console.log('hola');
            if (err) throw err;
            console.log('document written!');
        });
    });