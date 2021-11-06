//Constructor for user inputs
function userInputs(sizePrize, crustPrize, toppingsPrize) {
    //convert NaN inputs to 0
    crustPrize = crustPrize ? crustPrize : 0;
    toppingsPrize = toppingsPrize ? toppingsPrize : 0;

    this.sizePrize = sizePrize;
    this.crustPrize = crustPrize;
    this.toppingsPrize = toppingsPrize;
}

//Define a prototype function to get totals
userInputs.prototype.userTotal = function() {
    return this.sizePrize + this.toppingsPrize + this.crustPrize;
}

// define prices objects
var sizePrize = { small: 400, medium: 500, large: 600 }
var crustPrize = { crispy: 50, stuffed: 80, glutenFree: 100 }
var toppingsPrize = { pepperoni: 80, mushrooms: 60, onions: 50, extraCheese: 45 }

// user logic
$(document).ready(function() {
    $("#btnAdd").click(function(event) {
        event.preventDefault();
        $("#checkOut").show();
        $("#alert").hide();
        //user input
        var name = $("#userName").val();
        var size = $("#size").val();
        var crust = $("#crust").val();
        var toppings = $("#toppings").val();

        // create an instance, for user inputs
        var newUser = new userInputs(sizePrize[size], crustPrize[crust], toppingsPrize[toppings]);

        //Call prototype function, assign to var total
        var total = newUser.userTotal();

        //include order number
        orderNum = 1;
        $("p #rowTotal").each(function() {
            orderNum += 1;
        });

        //Append user selected orders. (name & pizza size are required fields)
        if (name > "" && size > "") {
            $("#orderSummary").append("<p id='order'> <b>Order No. " + orderNum + "</b>: Size: <span id='priceSpan'>" + $("#size option:selected").text() + "</span> Crust: <span id='priceSpan'>" + $("#crust option:selected").text() + "</span> Toppings: <span id='priceSpan'>" + $("#toppings option:selected").text() + "</span> Total KES. " + "<span id = 'rowTotal'>" + total + "</span>" + "</p>");
        }

        //Append grand Totals
        grantTotal = 0;
        $("p #rowTotal").each(function() {
            grantTotal += +$(this).text() || 0;
        });

        $("#totals p").text("GRAND TOTAL: KES. " + grantTotal);

        // 
    })
})


//Check-out and payment & order deliverly
$(document).ready(function() {

    //If deliverly is not checked, hide location text-box
    $("#deliverly").click(function() {
        $("#alert").hide();
        if ($("#deliverly").is(":checked")) $("#location").show();
        else $("#location").hide();
    })

    $("#checkoutBtn").click(function(event) {
        event.preventDefault();
        $("#alert").show();

        var name = $("#userName").val();
        //Check if homedeliverly is checked//
        if ($("#deliverly").is(":checked") && $("p #rowTotal").text() != "" && $("#location").val() != "") {
            var location = $("#location").val();

            //alert user
            $("#alert1").text("Total Amount + Delivery Fee = KES. " + (parseInt(grantTotal) + 200));
            $("#alert2").text("Hello " + name + "!, Thank you for shopping with us, your order will be delivered at " + location);
        }

        //if home deliverly is not checked
        else if (!$("#deliverly").is(":checked") && $("p #rowTotal").text() != "") {
            //alert user
            $("#alert1").text("Total Amount: " + grantTotal);
            $("#alert2").text("Hello " + name + "!, Thank you for shopping with us, please collect your order at our pick point - NAIROBI CBD");
        }
    })
})