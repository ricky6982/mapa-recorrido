describe("Primera prueba", function(){
    beforeEach(function(){
        div = '<div id="network_vis">';
        $(document.body).append(div);
    });

    var a = "hola mundo test!";
    it("Verificar si dice hola mundo test!", function(){
        expect(a).toEqual("hola mundo test!");
    });
});