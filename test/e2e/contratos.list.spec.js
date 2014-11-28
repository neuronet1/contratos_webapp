describe('Pruebas sobre la lista de funcionarios', function () {
    var funcionarios = null;
    var pro;

    beforeEach(function () {
        pro = protractor.getInstance();
        browser.get('/#/contratos');
        funcionarios = element.all(by.repeater('t in trabajadores'));
    });

    it('Valida que la lista de funcionarios tenga mas de 10 elementos', function () {
        expect(funcionarios.count( )).toBeGreaterThan(10);
    });

    it('Valida que al seleccionar un funcionario este se active', function () {
        // damos click en el primer funcionario (agustin mejia sanchez)
        funcionarios.get(0).click();

        var selector = 'body > div.ng-scope > div > div > div.col-sm-3.col-md-2.sidebar > ul > li.active';
        element(by.css(selector)).getText().then(function (text) {
            expect(text).toBe('AGUSTIN MEJIA SANCHEZ');
        });
    });

    it('Debe filtrar a los usuarios que tengan el nombre Alejandro', function () {
        var input = element(by.model('search.trabajador.nombre'));

        input.clear();
        input.sendKeys('Alejandro');

        alejandros = element.all(by.repeater('t in trabajadores'));
        expect(alejandros.count()).toEqual(4);
    });

    it('Al seleccionar un usuario debe mostrar los datos del contrato', function() {
        // apuntamos al primer funcionario
        var itemSelector= 'body > div.ng-scope > div > div > div.col-sm-3.col-md-2.sidebar > ul > li:nth-child(1) > a';
        var item = element(by.css(itemSelector));

        //El header que vamos a buscar
        var elementoBuscado = element(by.id('headerNombreTrabajador'));

        item.click().then(function () {

            browser.wait(function () {
                return pro.isElementPresent(elementoBuscado);
            },9000);

            element(by.id('headerNombreTrabajador')).getText().then(function (text) {
                expect(text).toEqual('AGUSTIN MEJIA SANCHEZ');
            });

            element(by.id('trabajadorNombre')).getAttribute('value').then(function (value) {
                expect(value).toEqual('AGUSTIN MEJIA SANCHEZ');
            });

            element(by.id('trabajadorFicha')).getAttribute('value').then(function (value) {
                expect(value).toEqual('202670');
            });

            element(by.id('trabajadorNivel')).getAttribute('value').then(function (value) {
                expect(value).toEqual('41');
            });

            element(by.id('trabajadorProfesion')).getAttribute('value').then(function (value) {
                expect(value).toEqual('ING.');
            });

            element(by.id('trabajadorCategoria')).getAttribute('value').then(function (value) {
                expect(value).toEqual('COORDINADOR ESPECIALISTA "A"');
            });

            element(by.id('trabajadorPuesto')).getAttribute('value').then(function (value) {
                expect(value).toEqual('-');
            });

            // -- sobre la casa

            element(by.id('casaNumero')).getAttribute('value').then(function (value) {
                expect(value).toEqual('61');
            });

            element(by.id('casaColonia')).getAttribute('value').then(function (value) {
                expect(value).toEqual('LOMA BONITA');
            });


            element(by.id('casaParcela')).getAttribute('value').then(function (value) {
                expect(value).toEqual('42');
            });


            element(by.id('casaCodigoPostal')).getAttribute('value').then(function (value) {
                expect(value).toEqual('93380');
            });

            element(by.id('casaStatus')).getAttribute('value').then(function (value) {
                expect(value).toEqual('OCUPADA');
            });

            element(by.id('casaEscritura')).getAttribute('value').then(function (value) {
                expect(value).toEqual('3091 17/02/1955');
            });

            element(by.id('empresaCentro')).getAttribute('value').then(function (value) {
                expect(value).toEqual('SEDE RN');
            });

            element(by.id('empresaArea')).getAttribute('value').then(function (value) {
                expect(value).toEqual('COPIE');
            });

        });

    });

});