
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Arcos
 */
edge = {
    add: function(e){
        edges.add(e);
    },
    update: function(ids){
        edges.update(ids);
    },
    remove: function(ids){
        edges.remove(ids);
    },
    get: function(id) {
        return edges.get(id);
    },
    getSelected: function(){
        return network.getSelectedEdges();
    },
    count: function(){
        return edges.length;
    },

    getByNodes: function (n1, n2) {
        return 'arco de ' + n1 + ' a ' + n2;
    }

};