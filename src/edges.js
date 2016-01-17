
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Arcos
 */
edge = {
    add: function(edges){
        edges.add(edges);
    },
    update: function(ids, changeData){
        edges.update(ids, changeData);
    },
    remove: function(ids){
        edges.remove(ids);
    },
    get: function(id) {
        return 'arco: ' + id;
    },
    count: function(){
        return edges.length;
    },

    getByNodes: function (n1, n2) {
        return 'arco de ' + n1 + ' a ' + n2;
    }

};