
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Arcos
 */
edge = {
    add: function(e){
        edges.add(e);
    },
    update: function(e){
        edge.verificarEstado(e);
        edges.update(e);
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
    verificarEstado: function(e){
        if (typeof e.infRef != "undefined" && typeof e.label != "undefined") {
            if (e.infRef.length > 0 && !isNaN(parseFloat(e.label))) {
                e.color = arcoSuccess;
            }else{
                e.color = arcoWarning;
            }
        }else{
            e.color = arcoWarning;
        }
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