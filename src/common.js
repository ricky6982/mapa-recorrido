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