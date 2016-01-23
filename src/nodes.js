
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
    updateOrientacion: function(n){
        var nodo = nodes.get(n.id);
        if (typeof nodo.conexiones != "undefined") {
            angular.forEach(nodo.conexiones, function(value, key){
                nodoVecino = nodes.get(key);
                nodoVecino.conexiones[nodo.id] = direccionInversa(value);
            });
        }
    },
    validarOrientacion: function(){
        console.log('validación de orientacion entre nodos');
        var flag = true;
        angular.forEach(nodes._data, function(elem){
            if (typeof elem.conexiones != "undefined") {
                // Verifica que las conexiones de cada nodo hacia sus vecinos no este repetida.
                var conexiones = [];
                angular.forEach(elem.conexiones, function(conex){
                    conexiones.push(conex);
                });
                if (conexiones.length != $.unique(conexiones).length) {
                    console.log('El nodo ' + elem.id + ' tiene direcciones repetidas hacia sus nodos vecinos.');
                    elem.color = nodoWarning;
                    node.update(elem);
                    flag = false;
                }else{
                    // Verifica que las direcciones entre dos nodos sea la correcta uno respecto del otro
                    // Ejemplo: Si el nodo 1 esta conectado por la derecha al nodo 2, entonces el nodo 2 
                    // debe tener una conexión al nodo 1 con dirección izquierda.
                    angular.forEach(elem.conexiones, function(value, key){
                        var nodoVecino = nodes.get(key);
                        if (nodoVecino.conexiones[elem.id] != direccionInversa(value)) {
                            console.log('La orientación entre los nodos ' + elem.id + ' y ' + key + ' no es la correcta.');
                            elem.color = nodoWarning;
                            node.update(elem);
                            flag = false;
                        }else{
                            elem.color = nodoSuccess;
                            node.update(elem);
                        }
                    });
                }
            }
        });
        return flag;
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
