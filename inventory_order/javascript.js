

let inventory = (function() {
  let positionOfInputs = ['name', 'stockNumber', 'quantity'];
  let inventory = {
    collection: [],

    id: -1,
    getNextId: function() {
      return this.id += 1;
    },

    setDate: function() {
      $('#order_date').text((new Date).toGMTString());
    },

    cacheTemplate: function() {
      let $template = $('#inventory_item').remove();
      this.template = Handlebars.compile($template.html());
    },

    newItem: function(e) {
      e.preventDefault();
      $('#inventory').append(this.addItem());
    },

    addItem: function(name = '', stockNumber = '', quantity = 1) {
      let id = this.getNextId();
      this.collection.push({
        id: id,
        name: name,
        stockNumber: stockNumber,
        quantity: quantity,
      });
      return this.template({id: id});
    },

    deleteItem: function(e) {
      e.preventDefault();
      let field = $(e.target);
      let fieldId = this.findIdByField(field);
      this.deleteItemById(fieldId);
      this.removeItemFromTable(field);     
    },

    deleteItemById: function(id) {
      for (let i = 0; i < this.collection.length; i++) {
        if (String(this.collection[i].id) === id) {
          return this.collection.splice(i, 1);
        }
      }
    },

    updateItem: function(e) {
      let field = $(e.target);
      let fieldId = this.findIdByField(field);
      let fieldName = positionOfInputs[field.parent().index()];
      this.findItemById(fieldId)[fieldName] = field.val();
    },

    removeItemFromTable: function(field) {
      this.findParent(field).remove();
    },

    findItemById: function(id) {
      return this.collection.filter(item => String(item.id) === id)[0];
    },

    findIdByField: function(field) {
      return this.findParent(field).find('input').first().val();
    },

    findParent: function(child) {
      return child.closest('tr');
    },

    bindEvents: function() {
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));
      $('#inventory').on('click', '.delete', this.deleteItem.bind(this));
      $('#add_item').on('click', this.newItem.bind(this));
    },

    init: function() {
      this.cacheTemplate();
      this.setDate();
      this.bindEvents();
    },
  };

  return Object.create(inventory);
})();

$(inventory.init.bind(inventory));
