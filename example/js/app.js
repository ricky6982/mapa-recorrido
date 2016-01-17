// var app = angular.module('app', []);

var app = angular.module('app', ['mapa.recorrido']);

app.controller('AppCtrl', [
    '$scope', 'mapa.service',
    function($scope, mapa){
        console.log(mapa.getMapa());
        console.log(mapa.edge.get(43));
        console.log(mapa.edge.getByNodes(43, 56));
        console.log(mapa.node.setValor(43));
        console.log(mapa.node.setValor(4356));
        console.log(mapa.node.getValor());
        mapa.path.add([1, 1, 2, 3, 4 ,1 ]);
        mapa.setAnimacion(false);
        var n = 1;
        $scope.toggleAnimacion = function(){
            mapa.setAnimacion($scope.animacion);
        };
        $scope.agregarNodo = function(){
            mapa.node.add({id: n, label: n});
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