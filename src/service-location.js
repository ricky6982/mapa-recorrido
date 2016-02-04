
/**
 * Definición de Funciones relacionadas con el establecimiento de
 * servicios en los arcos del mapa de recorridos
 */

lugar = {
    create: function(){
        return {
            idCategoria: null,
            idServicio: null,
            categoria: "",
            servicio: "",
            distancia: ""
        };
    },
    add: function(arco, lugar, direccion){
        if (typeof arco !== "object") {
            console.log('El arco enviado como parametro no es un objeto');
            return false;
        }

        if (["der", "izq"].indexOf(direccion) == -1 ) {
            console.log('El parametro dirección enviado no es valido, debe ser der o izq. Se recibio: ' + direccion);
            return false;
        }

        if (typeof arco.from !== 'undefined' && typeof arco.to !== 'undefined') {
            if (typeof arco.lugares === 'undefined') {
                arco.lugares = {"der": [], "izq": []};
            }
        }

        if (typeof lugar !== "object") {
            console.log('El parametro lugar no esta definido correctamente');
        }

        arco.lugares[direccion].push(angular.copy(lugar));

        edges.update(arco);
    },
    remove: function(arco, lugar, direccion){
        console.log('TODO: remover el lugar del arco en la dirección seleccionada');
    }
};