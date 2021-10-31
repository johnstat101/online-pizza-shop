//Constructor for user inputs
function userInputs(name, sizePrize,crustPrize,toppingsPrize){
    //convert NaN inputs to 0
    crustPrize=crustPrize? crustPrize : 0;
    toppingsPrize=toppingsPrize? toppingsPrize : 0;

    this.name = name;
    this.sizePrize = sizePrize;
    this.crustPrize = crustPrize;
    this.toppingsPrize = toppingsPrize;
}

//Define a prototype function to get totals
userInputs.prototype.userTotal = function(){
    return this.sizePrize + this.toppingsPrize + this.crustPrize
}

// define prices objects
var sizePrize = {small: 400, medium: 500, large: 600}
var crustPrize = {crispy: 50, stuffed: 80, glutenFree: 100}
var toppingsPrize = {pepperoni: 80, mushrooms: 60, onions: 50, extraCheese: 45}

// user logic
$(document).ready(function(){
    $("#btnAdd").click(function(event){
        event.preventDefault();
//user input
        var name = $("#userName").val();
        var size = $("#size").val();
        var crust = $("#crust").val();
        var toppings = $("#toppings").val();

        var newUser = new userInputs(name, sizePrize[size], crustPrize[crust], toppingsPrize[toppings]);
        
        //Append order to summary
        var totals = newUser.userTotal();
        totals += $(this).text();
        $("#orderSummary").append("<p id='order'>Pizza size: "+size+" Crust: "+crust+ " Toppings: "+toppings+"</p>");
        $("#totals").text("TOTAL: "+totals);
    })
})
