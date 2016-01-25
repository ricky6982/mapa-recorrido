
/**
 * Definición del Servicio Angular
 */
angular.module('mapa.recorrido',['dijkstras-service'])
    .factory('mapa.service', [
        '$rootScope', 'dijkstras', '$http',
        function($rootScope, dijkstrasService, $http){
            dijkstras = dijkstrasService; // Asignando el servicio a una variable global
            var urlRemoteMap = "";

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

            function setUrlRemoteMap(url){
                urlRemoteMap = url;
            }

            function getRemoteMap(){
                if (urlRemoteMap !== "") {
                    $http({
                        url: urlRemoteMap,
                        method: 'GET',
                    })
                    .success(function(data, status){
                        angular.forEach(data[0].mapaJson.nodes._data, function(n){
                            node.add(n);
                        });
                        angular.forEach(data[0].mapaJson.edges._data, function(e){
                            edge.add(e);
                        });
                        setAnimacion(false);
                        restorePositions();
                        network.fit();
                    })
                    .error(function(data){
                        console.log('No se encontro un mapa');
                    })
                    ;
                }
            }

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
                setUrlRemoteMap: setUrlRemoteMap,
                getRemoteMap: getRemoteMap
            };
        }
    ])
;

