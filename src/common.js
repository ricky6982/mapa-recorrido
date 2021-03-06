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

    var arcoSuccess = {
        color:'#33B907',
        highlight:'#33B907',
        hover: '#33B907',
        opacity:1.0
    };

    var arcoWarning = {
        color:'#F1A417',
        highlight:'#F1A417',
        hover: '#F1A417',
        opacity:1.0
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