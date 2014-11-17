var express = require('express');
var Contratos = require('contratos');
var router = express.Router();

router.get('/list', function(req, res) {
  var contratos = new Contratos(req.db);

  contratos.get_contratos({},function(contratos) {
    res.json(contratos);
  });

});


module.exports = router;


