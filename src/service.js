
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

