

Acredita su personalidad y facultades en términos de la escritura pública número 91,420 del 22 de Mayo del 2014, otorgada ante la fe del Lic. Miguel Alessio Robles No. 19 de la Ciudad de México, mismas que no le han sido revocadas, modificadas o limitadas en forma alguna a la fecha de firma del presente Contrato.

db.contratos.find({}).forEach(function (doc) {
    print(doc.trabajador.nombre);
});

db.contratos.update({},{$set:{"anme":""}}, false, true);


db.contratos.find({}).forEach(function (doc) {
    doc.escrituras.leyenda1 = 'la escritura No. 466 de fecha 22 de Junio de 1960, transferida a Pemex Exploración y Producción, mediante el Acta Administrativa de Entrega Recepción de Bienes Inmuebles No. de Acta UCAP-77200-02/96 de fecha 19 de Julio del 1996.';
    doc.escrituras.leyenda2 = 'Acredita su personalidad y facultades en términos de la escritura pública número 91,420 del 22 de Mayo del 2014, otorgada ante la fe del Lic. Miguel Alessio Robles No. 19 de la Ciudad de México, mismas que no le han sido revocadas, modificadas o limitadas en forma alguna a la fecha de firma del presente Contrato.';
    db.contratos.save(doc);
    print('guardando');
});



db.contratos.update({},{$set:{"firmas.firma1":""}}, false, true);
db.contratos.update({},{$set:{"firmas.cargo1":""}}, false, true);
db.contratos.update({},{$set:{"firmas.firma2":""}}, false, true);
db.contratos.update({},{$set:{"firmas.cargo2":""}}, false, true);
db.contratos.update({},{$set:{"firmas.firma3":""}}, false, true);
db.contratos.update({},{$set:{"firmas.cargo3":""}}, false, true);
db.contratos.update({},{$set:{"firmas.firma4":""}}, false, true);
db.contratos.update({},{$set:{"firmas.cargo4":""}}, false, true);
db.contratos.update({},{$set:{"firmas.arrendador":""}}, false, true);
db.contratos.update({},{$set:{"firmas.arrendadorCargo":""}}, false, true);
db.contratos.update({},{$set:{"firmas.sancion":""}}, false, true);


db.contratos.find({}).forEach(function (doc) {
    doc.firmas.firma1 = 'LIC. DELFINA DE LOURDES CUPIL DIAZ';
    doc.firmas.cargo1 = 'SUBGERENTE DE ADMINISTRACIÓN DE PERSONAL DE POZA RICA';
    doc.firmas.firma2 = 'ING. EDGAR ANTONIO SILVA HERNÁNDEZ';
    doc.firmas.cargo2 = 'COORDINACIÓN ADMINISTRATIVA DE LA SUBDIRECCIÓN DE PRODUCCIÓN REGIÓN NORTE';
    doc.firmas.firma3 = '"C.P. JOSÉ LUIS OLMEDO DELGADILLO';
    doc.firmas.cargo3 = 'SUBGERENTE DE ADMINISTRACIÓN PATRIMONIAL Y DE SERVICIO REGIÓN NORTE';
    doc.firmas.firma4 = 'LIC. JOSÉ ANGEL RAMÍREZ DORANTES';
    doc.firmas.cargo4 = 'JEFE DEL ÁREA CONTENCIOSA DE LA SUBGERENCIA DE SERVICIOS JURÍDICOS REGIÓN NORESTE POZA RICA';
    doc.firmas.arrendador = 'LIC. RAUL PAZ NERI';
    doc.firmas.arrendadorCargo = 'COORDINADOR DE PROYECTOS R.N. APODERADO GENERAL';
    doc.firmas.sancion = 'DJ/SJCPP/GJEP/SSJRNPR/       /2014';

    db.contratos.save(doc);
    print('guardando');
});


db.contratos.update({},{$set:{"fechas.inicioVigencia":""}}, false, true);
db.contratos.update({},{$set:{"fechas.finVigencia":""}}, false, true);

db.contratos.update({},{$set:{"fechas.solicitud":""}}, false, true);
db.contratos.update({},{$set:{"fechas.autorizacion":""}}, false, true);
db.contratos.update({},{$set:{"fechas.firmaContrato":""}}, false, true);


db.contratos.find({}).forEach(function (doc) {
    doc.fechas.inicioVigencia = new Date(2015,0,1);
    doc.fechas.finVigencia = new Date(2015,11,31);

    doc.fechas.solicitud = new Date(2014,11,1);
    doc.fechas.autorizacion = new Date(2014,11,1);
    doc.fechas.firmaContrato = new Date(2014,11,1);

    db.contratos.save(doc);
    print('guardando');
});
