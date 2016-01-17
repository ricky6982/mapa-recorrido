
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre trayectorias
 */
path = {
    add: function(trayecto){
        // Creación de Nodo unicamente si no existe
        if ($.inArray(0, trayecto) != -1) {
            console.log('no se permiten valores menores que 1');
            return false;
        }
        angular.forEach(trayecto, function(value){
            if (!nodes.get(value)) {
                nodo = {
                    id: value,
                    label: 'N-'+value
                };
                nodes.add(nodo);
            }
        });
        for (var i = 0 ; i < trayecto.length - 1; i++) {
            // Evita crear nodos que van a un mismo nodo
            if (trayecto[i] !== trayecto[i+1] ) {
                // Verificamos si existe un arco entre un nodo y el nodo siguiente
                if ($.inArray(trayecto[i+1], network.getConnectedNodes(trayecto[i])) == -1) {
                    arco = {
                        from: trayecto[i],
                        to: trayecto[i+1]
                    };
                    edges.add(arco);
                }
            }
        }
        return true;
    },
    shortest: function(n1, n2){
        if (n1 == n2) {
            return 0;
        }
        console.log('calcular el camino mas corto');
    }
};