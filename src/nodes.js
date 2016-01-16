
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Nodos
 */
node = {
    add: function(node){
        nodes.add(node);
    },
    get: function (id) {
        return 'nodo: '+id;
    },
    setValor: function(id) {
        valores = id;
    },
    getValor: function() {
        return valores;
    }
};