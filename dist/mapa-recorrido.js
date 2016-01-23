(function(window, angular, vis, undefined){


/**
 * Servicio que encapsula la libreria de dijkstras
 * para la utilización en el servicio de mapa de recorridos.
 */
(function(angular){

    var g = new Graph();
    var grafoDijkstra = [];
    var filter;

    function addConexion(nodoInicial, nodoFinal, valorDistancia){
        valorDistancia = parseFloat(valorDistancia);
        buscarNodo = filter('filter')(grafoDijkstra, {origen: nodoInicial });
        if (buscarNodo.length === 0) {
            conexion = [];
            conexion.push({
                destino: nodoFinal,
                distancia: valorDistancia
            });
            grafoDijkstra.push({origen: nodoInicial, conexiones: conexion });
        }else{
            buscarNodo[0].conexiones.push({destino: nodoFinal, distancia: valorDistancia});
        }
    }

    function makeGraph(arcos){
        angular.forEach(arcos, function(value, key){
            addConexion(value.from, value.to, value.label);
            addConexion(value.to, value.from, value.label);
        });

        angular.forEach(grafoDijkstra, function(value, key){
            enlaces = {};
            angular.forEach(value.conexiones, function(conexion, i){
                enlaces[conexion.destino] = conexion.distancia;
            });
            g.addVertex(value.origen, enlaces);
        });
    }

    angular.module('dijkstras-service', [])
        .factory('dijkstras', [
            '$filter',
            function($filter){
                filter = $filter;
                return {
                    makeGraph: makeGraph,
                    shortestPath: function(i, f){
                        i = i.toString();
                        f = f.toString();
                        return g.shortestPath(i, f).concat([i]).reverse();
                    },
                };
            }
        ])
    ;

}(angular));

/** 
 * Funciónes Comunes
 */

//
// Definición de Variables de la Red
//
    var container = document.getElementById('network_vis'),
        nodes = new vis.DataSet([]),
        edges = new vis.DataSet([]),
        options = {},
        data = {
            nodes: nodes,
            edges: edges
        };

    if (!container) {
        console.log('Debe definir el contenedor en el DOM con id: network_vis');
        return false;
    }

    var network = new vis.Network(container, data, options);

    var nodoSuccess = {
        background: "#10E256",
        highlight: {
            background: "#10E256"
        }
    };

    var nodoWarning = {
        background: "#FFBD66",
        highlight: {
            background: "#FFBD66"
        }
    };

    var dijkstras;

//
// Funciones de Animación de la Red
//
    function setAnimacion(flag){
        if (flag) {
            network.setOptions({nodes: { physics: true }});
        }else{
            network.setOptions({nodes: { physics: false }});
        }
    }

    function savePositions(){
        network.storePositions();
        restorePositions();
    }

    function restorePositions(){
        angular.forEach(nodes.getIds(), function(value, key){
            if (nodes.get(value).x) {
                network.moveNode(nodes.get(value).id, nodes.get(value).x, nodes.get(value).y);
            }
        });
    }

//
// Funciones utiles 
//
    // Funcion que actualiza las conexiones de orientación entre dos nodos
    function actualizarConexionOrientacion(id_n1, id_n2){
        if (id_n1 == id_n2) {
            return false;
        }
        nodo1 = nodes.get(id_n1);
        nodo2 = nodes.get(id_n2);

        if($.inArray(id_n2, network.getConnectedNodes(id_n1)) > -1 ){
            if (typeof nodo1.conexiones === "undefined") {
                nodo1.conexiones = {};
                nodo1.conexiones[id_n2] = "";
            }else{
                if (typeof nodo1.conexiones[id_n2] === "undefined") {
                    nodo1.conexiones[id_n2] = "";
                }
            }
            node.update(nodo1);
            if (typeof nodo2.conexiones === "undefined") {
                nodo2.conexiones = {};
                nodo2.conexiones[id_n1] = "";
            }else{
                if (typeof nodo2.conexiones[id_n1] === "undefined") {
                    nodo2.conexiones[id_n1] = "";
                }
            }
            node.update(nodo2);
        }else{
            if (typeof nodo1.conexiones != "undefined") {
                if (typeof nodo1.conexiones[id_n2] != "undefined") {
                    delete nodo1.conexiones[id_n2];
                    node.update(nodo1);
                }
            }
            if (typeof nodo2.conexiones != "undefined") {
                if (typeof nodo2.conexiones[id_n1] != "undefined") {
                    delete nodo2.conexiones[id_n1];
                    node.update(nodo2);
                }
            }
        }
        
    }

    // Función para obtener la inversa de una dirección.
    function direccionInversa(direccion){
        switch(direccion){
            case 'izq':
                return 'der';
            case 'der':
                return 'izq';
            case 'arr':
                return 'abj';
            case 'abj':
                return 'arr';
        }
    }


    function getMapa(){
        return "maps";
    }

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

/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre trayectorias
 */
path = {
    add: function(trayecto){
        // No permite que existe un nodo con id = 0
        if ($.inArray(0, trayecto) != -1) {
            console.log('no se permiten valores menores que 1');
            return false;
        }
        // Creación de Nodo unicamente si no existe
        angular.forEach(trayecto, function(value){
            if (!nodes.get(value)) {
                nodo = {
                    id: value,
                    label: 'N-'+value
                };
                nodes.add(nodo);
            }
        });
        // Creación de Arcos, entre dos nodos puede existir a lo sumo un arco. 
        for (var i = 0 ; i < trayecto.length - 1; i++) {
            // Evita crear nodos que van a un mismo nodo
            if (trayecto[i] !== trayecto[i+1] ) {
                // Verificamos si existe un arco entre un nodo y el nodo siguiente
                if ($.inArray(trayecto[i+1], network.getConnectedNodes(trayecto[i])) == -1) {
                    arco = {
                        from: trayecto[i],
                        to: trayecto[i+1]
                    };
                    edges.add(arco);
                    actualizarConexionOrientacion(trayecto[i], trayecto[i+1]);
                }
            }
        }
        return true;
    },
    shortest: function(i, f){
        dijkstras.makeGraph(edges._data);
        return dijkstras.shortestPath(1,3);
    },
    distancia: function(arrayNodos){
        if (arrayNodos.length > 1) {
            var d = 0;
            for (var i = 0; i < arrayNodos.length - 1; i++) {
                arco = edge.getByNodes(arrayNodos[i], arrayNodos[i+1]);
                if (arco) {
                    d += parseFloat(arco.label);
                }else{
                    return Infinity;
                }
            }
            return d;
        }else{
            return 0;
        }
    }

};

/**
 * Definición del Servicio Angular
 */
angular.module('mapa.recorrido',['dijkstras-service'])
    .factory('mapa.service', [
        '$rootScope', 'dijkstras',
        function($rootScope, dijkstrasService){
            dijkstras = dijkstrasService; // Asignando el servicio a una variable global

            /**
             * Definición de Eventos
             */
            events = {
                nodoSeleccionado:{
                    suscribe: function(scope, callback){
                        var handler = $rootScope.$on('selected-nodes', callback);
                        scope.$on('$destroy', handler);
                    },
                    notify: function() {
                        $rootScope.$emit('selected-nodes');
                    }
                },
                arcoSeleccionado:{
                    suscribe: function(scope, callback){
                        var handler = $rootScope.$on('selected-edges', callback);
                        scope.$on('$destroy', handler);
                    },
                    notify: function() {
                        $rootScope.$emit('selected-edges');
                    }
                },
                clickCanvas: {
                    suscribe: function(scope, callback){
                        var handler = $rootScope.$on('click-canvas', callback);
                        scope.$on('$destroy', handler);
                    },
                    notify: function(){
                        $rootScope.$emit('click-canvas');
                    }

                }
            };

            network.on('selectNode', function(){
                $rootScope.$emit('selected-nodes');
            });
            network.on('selectEdge', function(){
                $rootScope.$emit('selected-edges');
            });
            network.on('click', function(){
                $rootScope.$emit('click-canvas');
            });

            return {
                getMapa: getMapa,
                getData: data,
                node: node,
                edge: edge,
                path: path,
                setAnimacion: setAnimacion,
                savePositions: savePositions,
                restorePositions: restorePositions,
                events: events,
            };
        }
    ])
;

})(window, window.angular, vis);