console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    = = = = = = = = = = = = = = = = = = = = = = = =");


console.log("Our app has modules: ui-module, data-module, controller-module");
console.log("To implement these modules, we use extremely famous, module pattern in javaScript ");
console.log("module pattern is one of the most famous patters in javaScript");

// private & public data, exposing methods, encapsulation & separation of concerns
// and how all this is related to module pattern

//! why do we use modules?
//? because we want to keep pieces of code, that are related to one another together, 
//? inside of separate, independent & organized units
// and each of these modules will have variables and functions that are private (only accessible, inside of the module)
//* we want this so that no other code can override our data, so our data & code is going to be safe
// besides private methods & variables we also gonna have public methods, which means we expose them to the public, so that
// other function and modules can access and use them.. AND this is called data-encapsulation
//! Data Encapsulation: allows us to hide the implementation details of the specific module, from the outside scope so that we 
//! only expose a public interface, which is sometime called an API




//?  Creating modules in JavaScript with "module-pattern" : uses the concept of "closure" & "iife"


//! Module that handles, the budget data -> budgetController
var budgetController = (function () {
    var x = 23;
    var add = function (data) {
        return x + data;
    }

    return { // an object
        publicTest: function (user_ginven_data) {
            return add(user_ginven_data);
        }

    }

})();


// budgetController variable is going to be the "immediately-invoked-function-expression" that will return an object
//* We already know that IIFE, allows us to data privacy because it creates a new scope, not visible from the outside scope
//* so our variables and functions are safe here, they can't be accessed from the outside
//? The secrete of Module is it returns, an "object" containing all of the function : that we want to be public 
//? (function that we want to give outer scope to)

//! prove of data/function privacy -- check
// now if we do 
console.log(budgetController.x); // undefined
// console.log(budgetController.data(5)); //? --> ERROR

console.log(budgetController.publicTest(5)); //* THIS will work


//? Analysis how this function works, behind the scene
// so when the javascript runtime, hits the line --> var budgetController = (function () {})();
// and its in the paranthesis, as its a IIFE, so this anonymous function is declared and immediately envoked
// and then the variable & function in this anonymous function are declare and retrn an object which can contain a method and 
// objects that we want to access in the outer scope, as we have declared the variable "budgetController" in the outer scope to 
// access these variables & function

// now after all of this function is run, and returned, the "budgetController" is simply an object (contianing function & 
// variables) and now these returned function may use variables (here "x") and function (here, "add")even if the outer function 
// has already returned, this is all because of  the "power of closures"
//* because of closures, the inner function has always access, to the variables and parameter of its outer function even if its 
//* outer function has returned
//? and thats why we, say the "publicTest" method here is a public method, because it was returned and we can use it 
//? while "x" & "add()" are private as they are in the IIFE and therefore "publicTest" method  can access them, but outside scope
//? doesn't have access to them


//! Module for the user-Interface
var uiController = (function () {
    // some code here
})();


//! Module for controlling the app, acts as a link bw the  UI-controller && Budget-controller
//? ofcourse : we can pass arguments to modules too, --> well in this case we need to so that we can connect them
//* we will pass the other two, controllers as arguments so that this controller knows about both of the above controllers
//* and can  connect these two
//? so it now knows the other two modules, and it can use ther codes

var controller = (function (budgetCtrl, uiCtrl) {

    console.log("\nfrom inside of the app controller : ")
    console.log(budgetCtrl.publicTest(3));

    //! OR  --> if we want to access the result outside, --> return an object (with method or variable)
    var z = budgetCtrl.publicTest(5);

    return {

        //?  I)  as a method
        anotherPublicMethod: function () {
            return z; // z accessibe due to "closure"
        },

        //? II) as a variable
        z_variable: z

    };

})(budgetController, uiController);


// - - - - - - -
console.log("\nfrom outside scope : ")
console.log(controller.z_variable);
console.log(controller.anotherPublicMethod());




/** 
 * !NOW I COULD HAVE DONE LIKE THIS : 

    var controller = (function () {
        //? not passing the modules as argument instead
        //* directly accessing the "budgetController" & "uiController" --> as they are in the outer scope
        
        budgetController.publicTest(3);     //! BUT this is not a good practice, it will make the controller less independet

        //* because, imagine if  we would change the name of the module then we would have to do this all over our code,
        //* but if used arguments, then : we need to do the change to only one place
    })();
*/



//* here they even don't know that other one exists : so we need something to connect them 
//eg.so we can read data from the User-Interface and add that as an expence in the budget controller,so we need a link bw them


// These modules we created are completely independent to each other, so there will not be any interaction, between these ever
// by interection we mean "direct interaction", yeah there will be indirect interactions, which will be done using the
// public methods, 
// we don't want direct interaction, becasue we want them to be a stand-alone modules
// so emagin, if in we want to expand our application, in certain direction, may be with UIperspective or budgetPerspective then 
// we need to only  to change the particular module, and don't think about other module, as all the modules are seprated from 
// each other and they don't communicate at all, they are standalone, and they even don't know that other one exists

//* AND this is known as "Separation of Concerns"  ie, each part of application should only be intrested in doing one thing 
//*  independently

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

//!    - - - - - -    GLOBAL-APP-CONTROLLER    - - - - - - 
var appController = (function (budgetCtrl, uiCtrl) {
    // adding event-listner to add button

    document.querySelector(".add__btn").addEventListener("click", function (e) {
        console.log("clicked - the fuck");
        console.log(e);

        // Todo:  read the data from the text field, 3 fields: +/- , description, value 
        // Todo:  validate the data if its correct or not, in case of "description" & "value" 
        // eg.  description can not be empty,  value can't be -ve 

        // Todo: depending on the sign "+/-" add it to the income or expense
        // Todo : update the expense/income (dataController)

        // TODO : update the expense & income on the ui too,  (uiController)

    });


    //? Do the same things, also on the press of "Enter" too
    //! key event -- little different
    // we are not going to select anything, we will just add this event listner to the global document BECAUSE
    // this keypress event doesn't happen on any specific element, but it happens on the global web-page, so on the gobal object 
    // which in case of webpage is "document" object as we know
    // ::: there are more then one type of events, when someone presses a key --> check out the event reference
    // there are 3 of them : "keydown", "keypress", & "keyup"
    //* NOTE: this event is not for any specific key it detects all the keys on the keyboard

    document.addEventListener("keypress", function (event) {
        console.log(event);
        if (event.key === "Enter" || event.charCode === 0 || event.keyCode === 13) { //* all mean the same thing
            console.log("Enter is pressed!");

            // INSTEAD OF REPEATING  SAME CODE : DO    DRY,  make a seprate function 
        }
    });

    // now our task is to only execute this function on the press of "enter" and not just any random key,
    // for that we take advantage of an parameter passed to this anonymous function which is "an event parameter", and we can 
    // use any name that we want, some developers, uses "e"
    //--> this event parameter, gives us a very detailed insight of what kind of event has occured, and what are the properites 
    // of that event :: and with this we can find out, which key has been pressed, 
    // from the properties like: "key", "charCode", "keyCode", etc,

    //! Note: some browser does not have the "keycode" property instead have "which" propery so check that as well 
    // if (event.keyCode === 13 || event.which === 13) { //* all mean the same thing
    //     console.log("Enter is pressed!");
    // }


})(budgetController, uiController);