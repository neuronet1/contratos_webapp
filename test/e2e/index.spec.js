describe('Pruebas sobre la página de inicio', function () {

    describe('inicio', function () {

        beforeEach(function () {
            browser.get('/#');
        });

        it('Debe mostrar el titulo correcto', function () {
            expect(browser.getTitle()).toBe('Contratos de arrendamiento');
        });

    });

    describe('Pruebas sobre el menú', function () {
        var items;

        beforeEach(function () {
            browser.get('/#');
            items = element.all(by.repeater('item in items'));
        });

        it('Debe de apuntar por default a Inicio', function () {
            element(by.css('.active')).getText().then(function (text) {
                expect(text).toBe('Inicio');
            });
        });

        it('Debe tener 3 elementos', function () {
            expect(items.count()).toEqual(3);
        });

        it('El primer elemento del menú debe ser Inicio', function () {
            expect(items.get(0).getText()).toEqual('Inicio');
        });

        it('Debe seleccionar correctamente el elemento Contratos de arrendamiento', function () {
            items.get(1).click();

            element(by.css('.active')).getText().then(function (text) {
                expect(text).toBe('Contratos de arrendamiento');
            });
        });

    });

});