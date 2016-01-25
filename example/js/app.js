// var app = angular.module('app', []);

var app = angular.module('app', ['mapa.recorrido']);

app.controller('AppCtrl', [
    '$scope', 'mapa.service', '$timeout',
    function($scope, mapa, $timeout){
        console.log(mapa.getMapa());
        console.log(mapa.edge.get(43));
        console.log(mapa.edge.getByNodes(43, 56));
        console.log(mapa.node.setValor(43));
        console.log(mapa.node.setValor(4356));
        console.log(mapa.node.getValor());
        // mapa.path.add([1, 1, 2, 3, 4 ,1 ]);
        mapa.setAnimacion(true);
        var n = 100;
        $scope.toggleAnimacion = function(){
            mapa.setAnimacion($scope.animacion);
        };
        $scope.agregarNodo = function(){
            mapa.node.add({id: n, label: 'N-'+n});
        };

        $scope.guardarPosicion = function(){
            mapa.savePositions();
        };

        $scope.restaurarPosiciones = function(){
            mapa.restorePositions();
        };
        $scope.addNextAtLast = function(){
            mapa.node.addNextAtLast();
        };

        $scope.getNodeData = function(){
            $scope.nodeData = mapa.getData.nodes;
        };
        $scope.getEdgeData = function(){
            $scope.edgeData = mapa.getData.edges;
        };

        mapa.events.nodoSeleccionado.suscribe($scope, function(){
            $timeout(function(){
                var nodo = mapa.node.getSelected()[0];
                $scope.nodoSeleccionado = mapa.node.get(nodo);
            },0);
        });

        mapa.events.arcoSeleccionado.suscribe($scope, function(){
            $timeout(function(){
                var arco = mapa.edge.getSelected()[0];
                $scope.arcoSeleccionado = mapa.edge.get(arco);
            },0);
        });

        mapa.events.clickCanvas.suscribe($scope, function(){
            if (mapa.node.getSelected().length === 0) {
                $timeout(function(){
                    $scope.nodoSeleccionado = null;
                },0);
            }
            if (mapa.edge.getSelected().length === 0) {
                $timeout(function(){
                    $scope.arcoSeleccionado = null;
                },0);
            }
        });

        $scope.updateInfRef = function(){
            mapa.edge.update($scope.arcoSeleccionado);
        };

        $scope.updateOrientacion = function(){
            mapa.node.updateOrientacion($scope.nodoSeleccionado);
        };

        $scope.validarOrientacion = function(){
            mapa.node.validarOrientacion();
        };

        $scope.eliminarNodoSeleccionado = function(){
            mapa.node.remove($scope.nodoSeleccionado.id);
        };

        $scope.eliminarArcoSeleccionado = function(){
            mapa.edge.remove($scope.arcoSeleccionado.id);
        };

        $scope.calcularDistancia = function(){
            console.log(mapa.path.shortest(1,3));
            console.log(mapa.path.distancia(mapa.path.shortest(1,3)));
        };

        $scope.cambiarColorArco = function(){
            arco = mapa.edge.getByNodes(1,2);
            arco.color = {
                color:'#F1A417',
                highlight:'#F1A417',
                hover: '#F1A417',
                opacity:1.0
            };
            mapa.edge.update(arco);
            console.log(arco);
        };

        mapa.setUrlRemoteMap("http://localhost/mapa-recorrido/example/mapa.json");
        mapa.getRemoteMap();
        // $scope.red = mapa.network;

        // $scope.nodo = {
        //     add: function(){
        //         id = parseInt(Math.random()*100, 10);
        //         mapa.nodes.add({id: id, label: id});
        //     }
        // };

        // $scope.toggleAnimacion = mapa.comportamiento.toggleMovimiento;
    }
]);