// Modules for for different task

//! - - - - - - - General Global Scope Task - - - - - -

var general = (function () {

    printFrom = function (functionName, moduleName, variableName, variable) {
        console.log("\n>>> Printing from  \"" + functionName + "\" function, in module :\"" + moduleName + "\" :: " + variableName);
        console.log(variable); //! can be object or simple variable :: anything
    }

    var DOMstrings = {
        type: ".add__type",
        description: ".add__description",
        value: ".add__value",
        add_btn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        totalIncome: ".budget__income--value",
        totalExpenses: ".budget__expenses--value",
        totalExpensesPercent: ".budget__expenses--percentage",
        totalBudget: ".budget__value",
        expenseId: "#expense-",
        itemPercentage: ".item__percentage",
        deleteItemBtn: ".item__delete--btn",
        deleteItemIcon: ".ion-ios-close-outline", // only works when online
        container: ".container",
        close: ".close",
        rules: "#rules",
        year: ".budget__title--year",
        month: ".budget__title--month",
        inputBtn: ".add__btn",

    }


    return {
        printFrom: printFrom,
        DOMstrings: DOMstrings, //* function
    }

})();
//!!  --> i could have made all this general module in a global scope, BUT we want to develope it as a API





//!   - - - - - -    BUDGET-CONTROLLER    - - - - - - 
var budgetController = (function (G) {

    // Amound function-constructor
    // var Amount = function () {}   //!  -> can't create a generic constructor "money" because Expence & Income 
    //! are little different from each other -> eg. we would have some percentage in our Expense


    //! Income function-constructor
    //* if   type -> +   add to Income - array
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }


    //! Expense function-constructor
    //* if   type -> -   add to  Expense - array
    var Expense = function (id, description, value, percent) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percent = percent;
    }


    //! empty expense & income lists
    var budgetData = {
        total: {
            income: 0,
            expense: 0,
            expensePercent: 0
        },
        incomeList: [],
        expenseList: []
    }

    //! id -> it will keep on incrementing  --> and it will be used by the concept of "closure"
    var inc_id = -1;
    var exp_id = -1;


    // --------------------------------------------------------------
    return {


        addItem_toList: function (type, description, value) {
            G.printFrom("deleteItem_fromList", "budgetController", " ---", " ---");

            var newItem;

            if (type == "inc") {
                inc_id++;

                newItem = new Income(inc_id, description, value);
                budgetData.incomeList.push(newItem);

                //! - - - - - -  - - - - - -  - - - - - -  - - - - - - 
                // updateOveralBudget(type, value);
                budgetData.total.income += value; //* total income

                //* handling the OVERALL-percentage in case of expenses
                if (budgetData.total.income != 0) {
                    budgetData.total.expensePercent = -1 * (budgetData.total.expense / budgetData.total.income) * 100;

                } else {
                    budgetData.total.expensePercent = -1;
                }
                //! - - - - - -  - - - - - -  - - - - - -  - - - - - - 

            } else {
                exp_id++;
                newItem = new Expense(exp_id, description, value);
                budgetData.expenseList.push(newItem);

                //* handling the INDIVIDUAL-percentage 
                if (budgetData.total.income === 0) {
                    newItem.percent = -1;
                } else {
                    newItem.percent = (value / budgetData.total.income) * 100;
                }

                //! - - - - - -  - - - - - -  - - - - - -  - - - - - - 
                // updateOveralBudget(type, value);
                budgetData.total.expense -= value; //* total expense

                //* handling the OVERALL-percentage in case of expenses
                if (budgetData.total.income != 0) {
                    budgetData.total.expensePercent = -1 * (budgetData.total.expense / budgetData.total.income) * 100;

                } else {
                    budgetData.total.expensePercent = -1;
                }
                //! - - - - - -  - - - - - -  - - - - - -  - - - - - - 

            }

            return newItem;
        },

        deleteItem_fromList: function (type, id) { // type : "income" or "expense"
            G.printFrom("deleteItem_fromList", "budgetController", "---", "---");
            console.log(type + " ++++ " + id);



            var list;

            if (type === "income") {
                list = budgetData.incomeList;

                list[id].id = -1; //! basically invalidating the id : rather then removing as it will be O(n) operation
                budgetData.total.income -= list[id].value; //* total expense


            } else { // expense
                list = budgetData.expenseList;

                list[id].id = -1; //! basically invalidating the id : rather then removing as it will be O(n) operation
                //! update ovarall budget data
                budgetData.total.expense += list[id].value; //* total expense

            }

            //! ovarall percentage will change no matter if i delet "income" or "expense"
            if (budgetData.total.income != 0) { //* handling the OVERALL-percentage in case of expenses
                budgetData.total.expensePercent = -1 * (budgetData.total.expense / budgetData.total.income) * 100;

            } else {
                budgetData.total.expensePercent = -1;
            }


        },

        updateAllExpensePercentage: function () {
            for (var i = 0; i < budgetData.expenseList.length; i++) {
                var currentExpenseObj = budgetData.expenseList[i];
                if (budgetData.total.income === 0) {
                    currentExpenseObj.percent = -1;
                } else {
                    currentExpenseObj.percent = (currentExpenseObj.value / budgetData.total.income) * 100;
                }

            }
        },

        //! --- getters -----
        getTotalIncome: function () {
            return budgetData.total.income;
        },

        getTotalExpense: function () {
            return budgetData.total.expense;
        },

        getOverallBudget: function () {
            return {
                overallIncome: budgetData.total.income,
                overallExpens: budgetData.total.expense,
                overallExpensPercent: budgetData.total.expensePercent,
            }

        },

        getExpeseList: function () {
            return budgetData.expenseList;
        },


        //? ------------ just to  see on console : had to be deleted  ------------

        outputBudgetData: function () { // ! should not be public --> BUT JUST FOR TESTING
            console.log(">>>  BUDGET - DATA ")
            console.log(budgetData);
        },

        outputList: function (type) {
            G.printFrom("outputList", "budgetController", " ---", " ---");
            var list;

            if (type === "inc") {
                list = budgetData.incomeList;
                list.forEach(function (current, index, array) {
                    console.log("id : " + current.id + "  value : " + current.value);
                });

            } else {
                list = budgetData.expenseList;
                list.forEach(function (current, index, array) {
                    console.log("id : " + current.id + "  value : " + current.value + "  percent : " + current.percent);
                });
            }
            // console.log(list);
        }




    }

    // ------------------------------- -------------------------------


})(general);











//!      - - - - - -    UI-CONTROLLER      - - - - - - 
var uiController = (function (G) {
    var DOMstrings = G.DOMstrings;

    var numberFormat = function (number, type) {
        console.log(" ***  ** * * in the NUMBER-FORMAT FUNCTION  ***  ** * * ")
        // numbar can be 3483 or 8493.43 --> but if its only integer part then add the decimal part

        var numberStr = number.toFixed(2);
        var num = numberStr.split('.');

        console.log(num);

        var intPart = num[0];
        var decPart = num[1];

        //! ADD COMMAS, : to increase the readblity of the amount
        var len = intPart.length;
        if (len > 3) {
            var i = len;
            i -= 3;
            intPart = intPart.slice(0, i) + "," + intPart.slice(i);

            i -= 2;
            for (; i > 0; i -= 2) {
                intPart = intPart.slice(0, i) + "," + intPart.slice(i);
            }

        }

        var a = "123,456";
        var len = a.length;
        var i = len - 3;
        i
        a[i];


        var sign = (type === "exp") ? "-" : "+";
        return sign + "" + intPart + "." + decPart;
    };


    var readData = function () {
        var type = document.querySelector(DOMstrings.type).value; //?   "inc" or "exp"
        // console.log(type + " - type");

        var description = document.querySelector(DOMstrings.description).value; //? String
        // console.log(description + " - description");

        var value = parseFloat(document.querySelector(DOMstrings.value).value); //? number
        // console.log(value + " - value");

        //* need to return an object of all this  --> could have returned just this, but just to print it as an objec below
        var data = {
            type: type,
            description: description,
            value: value,
        }

        printFrom("dataRead", "uiController", "data", data);

        return data;
    };

    var returnMonth = function (monthNumber) {

        switch (monthNumber + "") {
            case "0":
                return "January";
            case "1":
                return "February";
            case "2":
                return "March";
            case "3":
                return "April";
            case "4":
                return "May";
            case "5":
                return "June";
            case "6":
                return "July";
            case "7":
                return "August";
            case "8":
                return "September";
            case "9":
                return "October";
            case "10":
                return "November";
            case "11":
                return "December";
            default:
                "fuck that";
        }

    };

    return { //* returning object of function.. so as to make it public,
        //  and can be accessed through uiController, and then by uiCtrl from inside of appController
        readPageData: readData,


        showRulesModal: function () {
            document.querySelector(DOMstrings.rules).style.display = "block";
        },

        budgetDate: function () {
            var date = new Date();
            // var christmasDate = new Date(2018, 11, 25);  --> another way if you know the date


            var monthNumber = date.getMonth();
            var month = returnMonth(monthNumber);
            document.querySelector(DOMstrings.month).textContent = month;


            document.querySelector(DOMstrings.year).textContent = date.getFullYear();
        },

        addListItemUI: function (object, type) {
            // create html string with place holder text
            var html, domElement;

            if (type === "inc") {
                domElement = document.querySelector(DOMstrings.incomeList);

                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else { // "exp"
                domElement = document.querySelector(DOMstrings.expenseList);

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

                if (object.percent === -1) {
                    html = html.replace("%percentage%", "------");

                } else {

                    var percentageRounded = Math.round(object.percent * 100) / 100; //? keeping at most 2 places
                    html = html.replace("%percentage%", percentageRounded.toFixed(2) + " %");

                }
            }


            // replace the placeholder text with the actual data
            html = html.replace("%id%", object.id);
            html = html.replace("%description%", object.description);

            // html = html.replace("%value%", object.value);
            html = html.replace("%value%", numberFormat(object.value, type)); //! apply custorm number formatting function


            // Finally, insert html into the dom
            console.log(html);
            console.log(typeof html);

            domElement.insertAdjacentHTML("beforeend", html);
        },

        deleteListItemUI(type, id) {
            console.log("IN THE UI FUNCTION");

            var elementID = type + "-" + id;
            // var element = document.querySelector("#" + elementID);
            var element = document.getElementById(elementID);

            var parentElement = element.parentNode;
            parentElement.removeChild(element);

        },

        updateTotalsUI: function (budget) {

            //! apply custorm number formatting function
            var totalIncomeValue = Math.round(budget.overallIncome * 100) / 100;
            document.querySelector(DOMstrings.totalIncome).textContent = numberFormat(totalIncomeValue, "inc");


            //! apply custorm number formatting function
            var totalExpenseValue = Math.round(budget.overallExpens * 100) / 100;
            document.querySelector(DOMstrings.totalExpenses).textContent = numberFormat(Math.abs(totalExpenseValue), "exp"); // ? already in -ve


            if (budget.overallExpensPercent === -1) {
                document.querySelector(DOMstrings.totalExpensesPercent).textContent = "------";
            } else {
                var overallPercent = Math.round(budget.overallExpensPercent * 100) / 100;
                document.querySelector(DOMstrings.totalExpensesPercent).textContent = overallPercent.toFixed(2) + " %";

            }

            //! apply custorm number formatting function
            var overallBudgetValue = Math.round((budget.overallIncome + budget.overallExpens) * 100) / 100;

            if (overallBudgetValue >= 0) {
                document.querySelector(DOMstrings.totalBudget).textContent = numberFormat(overallBudgetValue, "inc");
            } else {
                overallBudgetValue = Math.abs(overallBudgetValue);
                document.querySelector(DOMstrings.totalBudget).textContent = numberFormat(overallBudgetValue, "exp");
            }

        },

        updateAllPercentageValueUI: function (expenseList) {
            for (var i = 0; i < expenseList.length; i++) {

                var obj = expenseList[i];

                if (obj.id === -1) {
                    continue;
                }

                console.log("==== hey there in updateAllPercentageValueUI ===");
                console.log(DOMstrings.expenseId + obj.id + " " + DOMstrings.itemPercentage);

                var element = document.querySelector(DOMstrings.expenseId + obj.id + " " + DOMstrings.itemPercentage);
                console.log(element);

                if (obj.percent === -1) {
                    element.textContent = "------";

                } else {
                    var percentageRounded = Math.round(obj.percent * 100) / 100;
                    element.textContent = percentageRounded.toFixed(2) + " %";
                }

            }

        },

        clearFields: function () {
            var elements = document.querySelectorAll(DOMstrings.description + "," + DOMstrings.value);

            //* The querySelectorAll() method returns all elements in the document that matches a specified CSS selector(s), as a static NodeList object.
            // The NodeList object represents a collection of nodes.The nodes can be accessed by index numbers.The index starts at 0.
            //? Tip: You can use the length property of the NodeList object to determine the number of elements that matches the specified selector, then you can loop through all elements and extract the info you want.

            elements[0].value = "";
            elements[1].value = "";

            elements[0].focus();

            // change the  selection to  '+'

            /** ANOTHER WAY TO DO IT   
             * var elementLists = document.querySelectorAll(DOMstrings.description + "," + DOMstrings.value);
             * 
             * convert this elementLists into array -> using the "slice" methods
             *  --> but we have to call it using the call() mehtod
             * 
             * var elementsArray = Arrays.prototype.slice.call(elementLists);
             * 
             *  //* for each method will apply this function to all the elelments in the array -> could have made the function 
             *  //* as differnet unit (instead of anonymous function) & just gave the name to the function
             * 
             * //* this fuction has 3 parameters, that are providex to us, 
             * //* currnt-> current processing element 
             * //* index -> current index, that is being prcessed
             * //* array -> total array (here its, the 'elementsArray')
             * //* --> doesn't necessary to keep these names
             * 
             * elementsArray.foreach(function (current, index, array) {
             *      current.value = "";
             * });
             * ] 
             */
        },

        changedType: function () {
            var fields = document.querySelectorAll(DOMstrings.type + " , " + DOMstrings.description + " , " + DOMstrings.value);

            // alert(fields);
            //! rmember : querySelectorAll -> returns a NodList objects

            fields.forEach(function (current, index, array) {
                current.classList.toggle("red-focus");
            });

            document.querySelector(DOMstrings.add_btn).classList.toggle("red");
        }

    };


})(general);






//!    - - - - - -    GLOBAL-APP-CONTROLLER    - - - - - - 
var appController = (function (budgetCtrl, uiCtrl, G) {
    var DOMstrings = G.DOMstrings;

    var setupEventListners = function () {
        var DOMstrings = G.DOMstrings;



        //? modal close button
        document.querySelector(DOMstrings.close).addEventListener("click", function () {
            document.querySelector(DOMstrings.rules).style.display = "none";
        });



        // ? add element event
        document.querySelector(DOMstrings.add_btn).addEventListener("click", ctrl_addItem);
        //* instead of making anonymous function calling the "ctrl_addItem" function, we can just call the fuction, 





        //? event listner  for removing the modal  --> Esc
        document.addEventListener("keypress", function (event) {
            // console.log(event); //? check the event

            if (event.keyCode === 27) { //* all mean the same thing
                if (document.querySelector(DOMstrings.rules).style.display === "block") {
                    document.querySelector(DOMstrings.rules).style.display = "none";
                }
            }
        });






        //? add-element event listner   --> Enter
        document.addEventListener("keypress", function (event) {
            // console.log(event);//? check the event

            if (event.key === "Enter" || event.keyCode === 13) { //* all mean the same thing
                // console.log("Enter is pressed!"); //?enter pressed
                ctrl_addItem();
            }
        });




        //! event bubbling   &&   event delegation
        //? delete-element event listner --> applying it on the container
        document.querySelector(DOMstrings.container).addEventListener("click", function (event) {
            console.log(" - - - -  Event handler for DELETE FUNCTION - - - - ");


            var tar = event.target;
            // var tar = event.sender;
            console.log(tar);

            var itemID;

            itemID = event.target.parentNode.parentNode.parentNode.id;

            if (itemID) { //* similar to itemID === "defined"   or itemID != "undefined"
                console.log("itemID is defined : ");
                console.log(itemID);

                ctrl_deleteItem(itemID);

            } else {
                console.log("itemID is not defined");
                itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

                if (itemID) {
                    ctrl_deleteItem(itemID);
                } else {
                    // if still undefined
                    console.log("wrong click");
                }
            }

            /**
                if (event.target === document.querySelector("button.item__delete--btn")) {
                    console.log("clicked on delete button");

                    // console.log(event);
                    // console.log(event.target);
                    // console.log(event.target.parentElement.parentElement);
                    console.log("----- finding the  delet button element  ----- ")
                    console.log(event.target.parentElement.parentElement.parentElement);
                    console.log(event.target.parentElement.parentElement.parentElement.attributes.id);
                    console.log(event.target.parentElement.parentElement.parentElement.attributes.id.value);
                    console.log(typeof (event.target.parentElement.parentElement.parentElement.attributes.id.name));

                    var elementId = event.target.parentElement.parentElement.parentElement.attributes.id.value;

                    

            } else {
                console.log("just clicked");
            }
            */


            // document.addEventListener("change", function (event) {
            //     alert(event);
            // });


            // document.querySelector(DOMstrings.type).addEventListener("change", function (event) {
            //     // alert(event);
            //     alert("yolo");
            // });



        });


        document.querySelector(DOMstrings.type).addEventListener("change", function (event) {
            // console.log(event); //? event
            uiCtrl.changedType();
        });



    };


    var checkValidity = function (pageData) {

        if (pageData.description === "" || pageData.description.length < 4) {
            console.log("\nPlz give a little bit detailed description");
            return false;

        } else if (isNaN(pageData.value)) {
            console.log("\nValue can not be Empty ! --> ie its hould be a number");
            return false;

        } else if (parseInt(pageData.value) < 0) {
            console.log("Value can't be -ve")
            return false;

        } else if (parseInt(pageData.value) === 0) {
            console.log("Value can't be 0")
            return false;
        } else {
            console.log("\nAll good to go, Data VALID !!");
            return true;
        }
    };



    // adding elements
    var ctrl_addItem = function () {

        //  read the data from the text field, 3 fields: +/- , description, value 
        var pageData = uiController.readPageData(); //* an object
        printFrom("ctrl_addItem", "appController", "pageData", pageData);



        // validate the data if its correct or not, in case of "description" & "value" 
        // eg.  description can not be empty,  value can't be -ve 
        if (checkValidity(pageData)) {


            // : depending on the sign "+/-" add it to the income or expense
            var data = budgetCtrl.addItem_toList(pageData.type, pageData.description, pageData.value);
            //! create & insert new object (of expense or income) && simultaneously update the overall budget
            budgetCtrl.outputBudgetData();
            //* now this "data"  -> has the "id" variable, which can be used to put into uicontroller as well as easy to delete


            // : update the expense & income (NOT overall) on the ui too,  (uiController)
            uiCtrl.addListItemUI(data, pageData.type);


            // : update the budget amounts on ui (OVERALL BUDGET)
            var budget = budgetCtrl.getOverallBudget(); //? get the data -> budget controller
            uiCtrl.updateTotalsUI(budget);
            console.log("update overall budget : ui");


            // ? --> so if income changed : percentage of all the expenses have to be changed
            if (pageData.type == "inc") {

                console.log("-----------CHANGE THE PERCENTAGE OF LIST     ON - ADDITION    ----------------------");
                var expenseList = budgetCtrl.getExpeseList();

                // if income changes: then the percentage amount of all the expenses has to be updated
                budgetCtrl.updateAllExpensePercentage(); //! budget-controll

                //  and need to be shown in the UI too
                uiCtrl.updateAllPercentageValueUI(expenseList); //! io-controll
            }

        }


        // : clear all the fields after the addition of data
        uiCtrl.clearFields(); //! irritating as FUCK

    }



    // delete elements
    var ctrl_deleteItem = function (elementId) {
        console.log("- - - - -  function : ctrl_deleteItem - - - - - -");

        // 1. get type & id of the --> item 

        var len = elementId.length;
        var type = elementId.substring(0, len - 2);
        var id = elementId.substring(len - 1, len);

        console.log(type + " .....  " + id);



        //2. delete the item from : dataStructure ---> budgetCtrl       --> ALSO changes the budgetData
        var budget = budgetCtrl.deleteItem_fromList(type, id);

        // 3. update the overall budget on UI
        var budget = budgetCtrl.getOverallBudget(); //? get the data -> budget controller
        uiCtrl.updateTotalsUI(budget);
        console.log("update overall budget : ui");


        // 4. delete item from the ui
        uiCtrl.deleteListItemUI(type, id);


        //5.  if any of the income delets : then percentage of all expenseList changes 
        if (type == "income") {

            console.log("-----------CHANGE THE PERCENTAGE OF LIST     ON - DELETION  ----------------------");
            var expenseList = budgetCtrl.getExpeseList();

            // if income changes: then the percentage amount of all the expenses has to be updated
            budgetCtrl.updateAllExpensePercentage(); //! budget-controll


            //  and need to be shown in the UI too
            uiCtrl.updateAllPercentageValueUI(expenseList); //! io-controll

        }


    }


    return {
        init: function () {
            console.log(" - - - - - - - Application Started  - - - - - - -");
            setupEventListners();
            uiCtrl.showRulesModal();

            // alert("change to inc");
            document.querySelector(DOMstrings.type).value = "inc";


            uiCtrl.budgetDate();
            uiCtrl.clearFields(); //! irritating as FUCK
        }
    }


})(budgetController, uiController, general);



// ONLY LINE OF CODE : OUTSIDE  --> it will setup our eventlistners, so if NO init NO listner, SO NO data AND  NO APPLICATION
appController.init();