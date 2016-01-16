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