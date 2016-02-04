
/**
 * Definición del Servicio Angular
 */
angular.module('mapa.recorrido',['dijkstras-service'])
    .factory('mapa.service', [
        '$rootScope', 'dijkstras', '$http',
        function($rootScope, dijkstrasService, $http){
            dijkstras = dijkstrasService; // Asignando el servicio a una variable global
            var urlRemoteMap = "";
            var urlSaveRemoteMap = "";

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

            function setUrlSaveRemoteMap(url){
                urlSaveRemoteMap = url;
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
            function sendMap(){
                console.log(data);
                if (urlSaveRemoteMap !== "") {
                    $http({
                        url: urlSaveRemoteMap,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    })
                    .success(function(data, status){
                        console.log('Se guardo el mapa correctamente.');
                    })
                    .error(function(err){
                        console.log('No se pudo guardar el mapa.');
                    });
                }
            }

            return {
                getMapa: getMapa,
                getData: data,
                node: node,
                edge: edge,
                path: path,
                lugar: lugar,
                setAnimacion: setAnimacion,
                savePositions: savePositions,
                restorePositions: restorePositions,
                events: events,
                setUrlRemoteMap: setUrlRemoteMap,
                getRemoteMap: getRemoteMap,
                setUrlSaveRemoteMap: setUrlSaveRemoteMap,
                sendMap: sendMap
            };
        }
    ])
;

