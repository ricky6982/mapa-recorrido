
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Nodos
 */
node = {
    add: function(n){
        nodes.add(n);
    },
    addNext: function(nodo){

    },
    addNextAtLast: function(){
        var list = nodes.getIds();
        list = list.map(parseFloat);

        var lastNode = Math.max.apply(Math, list);
        var nodos = [lastNode];
        nodos.push(lastNode + 1);
        path.add(nodos);
    },
    update: function(ids){
        nodes.update(ids);
    },
    remove: function(id){
        var nodoEliminar = nodes.get(id);
        if (typeof nodoEliminar.conexiones != "undefined") {
            var conexiones = Object.keys(nodoEliminar.conexiones);
            angular.forEach(conexiones, function(element){
                edge.removeByNodes(id, element);
                actualizarConexionOrientacion(id, element);
            });
        }
        nodes.remove(id);
    },
    get: function (id) {
        return nodes.get(id);
    },
    getSelected: function(){
        return network.getSelectedNodes();
    },
    setValor: function(id) {
        valores = id;
    },
    getValor: function() {
        return valores;
    },
    count: function(){
        return nodes.length;
    }
};
