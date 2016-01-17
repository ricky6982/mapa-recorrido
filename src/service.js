
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

