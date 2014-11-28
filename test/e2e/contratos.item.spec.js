describe('Pruebas sobre el contrato', function () {

    beforeEach(function () {
        browser.get('/#/contratos/item/5464f378218d3e9521175c91');
    });

    it('De entrada el botón Guardar y Deshacer deben estar ocultos', function () {
        var selector = 'button.btn.btn-primary.ng-hide';

        var buttons = element.all(by.css(selector));

        expect(buttons.count()).toEqual(2);

        element(by.id('btnGuardar')).isDisplayed().then(function (visible) {
            expect(visible).toBeFalsy();
        });

        element(by.id('btnDeshacer')).isDisplayed().then(function (visible) {
            expect(visible).toBeFalsy();
        });
    });


});