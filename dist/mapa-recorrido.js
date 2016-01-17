(function(window, angular, vis, undefined){


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

    // 
    // Definición de Eventos de la Red
    // 
    network.on('selectEdge', function(){
        console.log('arco seleccionado');
    });

    network.on('selectNode', function(){
        console.log('nodo seleccionado');
    });

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

    function getMapa(){
        return "maps";
    }

/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Nodos
 */
node = {
    add: function(nodes){
        nodes.add(nodes);
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
    update: function(ids, changeData){
        nodes.update(ids, changeData);
    },
    remove: function(ids){
        nodes.remove(ids);
    },
    get: function (id) {
        return 'nodo: '+id;
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
    add: function(edges){
        edges.add(edges);
    },
    update: function(ids, changeData){
        edges.update(ids, changeData);
    },
    remove: function(ids){
        edges.remove(ids);
    },
    get: function(id) {
        return 'arco: ' + id;
    },
    count: function(){
        return edges.length;
    },

    getByNodes: function (n1, n2) {
        return 'arco de ' + n1 + ' a ' + n2;
    }

};

/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre trayectorias
 */
path = {
    add: function(trayecto){
        // Creación de Nodo unicamente si no existe
        if ($.inArray(0, trayecto) != -1) {
            console.log('no se permiten valores menores que 1');
            return false;
        }
        angular.forEach(trayecto, function(value){
            if (!nodes.get(value)) {
                nodo = {
                    id: value,
                    label: 'N-'+value
                };
                nodes.add(nodo);
            }
        });
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
                }
            }
        }
        return true;
    },
    shortest: function(n1, n2){
        if (n1 == n2) {
            return 0;
        }
        console.log('calcular el camino mas corto');
    }
};

/**
 * Definición del Servicio Angular
 */
angular.module('mapa.recorrido',[])
    .factory('mapa.service', [
        function(){
            return {
                getMapa: getMapa,
                node: node,
                edge: edge,
                path: path,
                setAnimacion: setAnimacion,
                savePositions: savePositions,
                restorePositions: restorePositions
            };
        }
    ])
;

})(window, window.angular, vis);