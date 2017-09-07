
function ProductViewModel() {
    var self = this;
    self.Id = ko.observable("");
    self.ProductName = ko.observable("");
    self.Quantity = ko.observable("");

    var Product = {
        Id: self.Id,
        ProductName: self.ProductName,
        Quantity: self.Quantity
    };

    self.Product = ko.observable();
    //self.Product(Product);
    self.Products = ko.observableArray();

    // Initialize the view-model
    $.ajax({
        url: '/Home/GetAllProducts',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Products(data); //Put the response in ObservableArray
        }
    });
   

    //Add New Item
    self.create = function () {
     
        if (Product.ProductName() != "" && Product.Quantity() != "") {

            var data={
                ProductName:Product.ProductName(),
                Quantity:Product.Quantity()
            }
            $.ajax({
                url: '/Home/AddProduct',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(data),
                success: function (data) {

                    self.Products.push(data);
                    self.ProductName("");
                    self.Quantity("");
                }
            }).fail(
            function (xhr, textStatus, err) {
                alert(err);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    }
    self.delete = function (Product) {
        if (confirm('Are you sure to Delete "' + Product.ProductName + '" product ??')) {
            var id = Product.Id;

            $.ajax({
                url: '/Home/DeleteProduct/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (data) {
                    self.Products.remove(Product);
                }
            }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
        }
    }

    // Edit product details
    self.edit = function (Product) {
        self.Product(Product);
    }

    // Update product details
    self.update = function () {
        var temp = self.Product();
        $.ajax({
            url: '/Home/EditProduct',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(temp),
            success: function (data) {
                self.Products.removeAll();
                self.Products(data); //Put the response in ObservableArray
                self.Product(null);
                alert("Record Updated Successfully");
            }
        })
        .fail(
        function (xhr, textStatus, err) {
            alert(err);
        });
    }
    // Reset product details
    self.reset = function () {
        self.ProductName("");
        self.Quantity("");
        
    }

    // Cancel product details
    self.cancel = function () {
        self.Product(null);
    }
}
var viewModel = new ProductViewModel();
ko.applyBindings(viewModel);
