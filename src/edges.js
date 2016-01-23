
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Arcos
 */
edge = {
    add: function(e){
        edges.add(e);
    },
    update: function(ids){
        edges.update(ids);
    },
    remove: function(id){
        arcoEliminar = edges.get(id);
        n1 = arcoEliminar.from;
        n2 = arcoEliminar.to;
        edges.remove(id);
        actualizarConexionOrientacion(arcoEliminar.from, arcoEliminar.to);
    },
    get: function(id) {
        return edges.get(id);
    },
    getSelected: function(){
        return network.getSelectedEdges();
    },
    count: function(){
        return edges.length;
    },

    getByNodes: function (n1, n2) {
        var flag = true;
        var arcoId = null;
        angular.forEach(edges._data, function(arco){
            if ((arco.from == n1 && arco.to == n2) || (arco.from == n2 && arco.to == n1)) {
                arcoId = arco.id;
            }
        });
        return edges.get(arcoId);
    },

    removeByNodes: function(n1, n2){
        a = network.nodesHandler.getConnectedEdges(n1);
        b = network.nodesHandler.getConnectedEdges(n2);
        interseccion = $(b).not($(b).not(a));
        edges.remove(interseccion[0]);
    }

};