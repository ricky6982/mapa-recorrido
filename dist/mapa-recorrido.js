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

    function getMapa(){
        return "maps";
    }

/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Nodos
 */
node = {
    add: function(node){
        nodes.add(node);
    },
    get: function (id) {
        return 'nodo: '+id;
    },
    setValor: function(id) {
        valores = id;
    },
    getValor: function() {
        return valores;
    }
};

/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Arcos
 */
edge = {
    get: function(id) {
        return 'arco: ' + id;
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
    add: function(){

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
                path: path
            };
        }
    ])
;

})(window, window.angular, vis);