
/**
 * Definición de Funciones relacionadas con operaciones 
 * sobre los Nodos
 */
node = {
    add: function(nodes){
        nodes.add(nodes);
    },
    addNext: function(nodo){

    },
    addNextAtLast: function(){
        var list = nodes.getIds();
        list = list.map(parseFloat);

        var lastNode = Math.max.apply(Math, list);
        var nodos = [lastNode];
        nodos.push(lastNode + 1);
        path.add(nodos);
    },
    update: function(ids, changeData){
        nodes.update(ids, changeData);
    },
    remove: function(ids){
        nodes.remove(ids);
    },
    get: function (id) {
        return nodes.get(id);
    },
    getSelected: function(){
        return network.getSelectedNodes();
    },
    setValor: function(id) {
        valores = id;
    },
    getValor: function() {
        return valores;
    },
    count: function(){
        return nodes.length;
    }
};
