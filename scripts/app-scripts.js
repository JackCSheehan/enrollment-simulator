document.addEventListener("DOMContentLoaded", init);

/*
Init routines for app section.
*/
function init()
{
    // Add event listener to goal hours input
    document.getElementById("goal-hours-input").addEventListener("input", updateGlobalStats);

    // Add event listener to add semester button
    document.getElementById("add-semester-button").addEventListener("click", function()
    {
        addSemester();
    })

    // Add event listener to first remove semester button
    document.getElementsByClassName("remove-semester-button")[0].addEventListener("click", removeSemester);
    
    // Add event listener to first add row button
    document.getElementsByClassName("add-row-button")[0].addEventListener("mouseup", function()
    {
        addRow(this);
    });

    // Add event listener to first remove row button
    var firstRemoveRowButton = document.getElementsByClassName("remove-row-button")[0];
    firstRemoveRowButton.addEventListener("mouseup", function()
    {
        removeRow(this);
    });
    
    // Add event listeners to first course number input
    var firstCourseNumberInput = document.getElementsByClassName("course-number-input")[0];
    firstCourseNumberInput.addEventListener("input", extractCreditHours);
    firstCourseNumberInput.addEventListener("input", function()
    {
        updateSemesterCreditCount(this);
        updateGlobalStats();
    });
    firstCourseNumberInput.addEventListener("keydown", function(event)
    {
        // If the user pressed the enter key, add a row
        if (event.keyCode === 13)
        {
            addRow(this.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("add-row-button")[0]);
        }
    });

    // Add event listeners to first credit hours input
    var firstCreditHoursInput = document.getElementsByClassName("credit-hours-input")[0];
    firstCreditHoursInput.addEventListener("input", function()
    {
        updateSemesterCreditCount(this);
        updateGlobalStats();
    });
    firstCreditHoursInput.addEventListener("keydown", function(event)
    {
        // If the user pressed the enter key, add a row
        if (event.keyCode === 13)
        {
            addRow(this.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("add-row-button")[0]);
        }
    });
}

/*
Updates the count of credit hours under each semester editor.
*/
function updateSemesterCreditCount(input)
{
    // Declare variable to accumulate credit hours in the current semester editor
    var hours = 0;

    // Regex search string to check for non-digits in input
    var numberSearch = /[^0-9]+/g;

    // Get current semester editor
    var semesterEditor = input.parentNode.parentNode.parentNode.parentNode;

    // Check to see if the current element is not a semester editor. If it's not, THAT parent element should be used
    if (semesterEditor.className !== "semester-editor card")
    {
        semesterEditor = semesterEditor.parentNode;
    }

    // Get the semester credit count element
    var semesterCreditCountElement = semesterEditor.getElementsByClassName("semester-credit-count")[0];

    // Get the current hours number being displayed
    var currentHoursDisplay = semesterCreditCountElement.textContent;

    // Get all credit hour inputs in the current semester editor
    var creditHourInputs = semesterEditor.getElementsByClassName("credit-hours-input semester-editor-inputs text-input");

    // Iterate through each credit hours input and accumulate the values
    for (var count = 0; count < creditHourInputs.length; count++)
    {
        // Check to make sure that the current credit hour input only contains numbers
        if (creditHourInputs[count].textContent.search(numberSearch) == -1)
        {
            hours += parseInt(creditHourInputs[count].value);
        }
    }

    // If hours is NaN, display the current value being displayed
    if (isNaN(hours))
    {
        semesterCreditCountElement.textContent = currentHoursDisplay;
    }
    // If hours is a valid number, then display that number
    else
    {
        semesterCreditCountElement.textContent = hours;
    }
}

/*
Adds a row to the selected semester editor.
*/
function addRow(button)
{
    // Get the semester table to append a new row to
    semesterTableElement = button.previousSibling;

    // If the previous element is a text node, the element before that one must be used
    // (used to get around a quirk where whitespace nodes are automatically put into HTML source)
    if (semesterTableElement.nodeType == 3)
    {
        semesterTableElement = semesterTableElement.previousSibling;
    }

    // Create elements needed for course number data column
    var removeRowButtonElement = document.createElement("button");
    removeRowButtonElement.className = "remove-row-button icon-button";
    removeRowButtonElement.addEventListener("mouseup", function()
    {
        removeRow(this);
    });

    var removeRowButtonIconElement = document.createElement("img");
    removeRowButtonIconElement.className = "remove-row-button-icon";
    removeRowButtonIconElement.src = "images/close.svg";

    removeRowButtonElement.appendChild(removeRowButtonIconElement);

    var courseNumberInputElement = document.createElement("input");
    courseNumberInputElement.className = "course-number-input semester-editor-inputs text-input";
    courseNumberInputElement.placeholder = "Course Number...";
    courseNumberInputElement.addEventListener("input", extractCreditHours);
    courseNumberInputElement.addEventListener("input", function()
    {
        updateSemesterCreditCount(this);
        updateGlobalStats();
    });
    courseNumberInputElement.addEventListener("keydown", function(event)
    {
        // Check to see if the enter key was pressed before adding row
        if (event.keyCode === 13)
        {
            addRow(button);
        }
    });

    // Create course number data column and add remove button and input to it
    var courseNumberDataColumn = document.createElement("td");
    courseNumberDataColumn.appendChild(removeRowButtonElement);
    courseNumberDataColumn.appendChild(courseNumberInputElement);

    // Create elements needed for credit hour data column
    var creditHoursInputElement = document.createElement("input");
    creditHoursInputElement.className = "credit-hours-input semester-editor-inputs text-input";
    creditHoursInputElement.placeholder = "Credit Hours...";
    creditHoursInputElement.addEventListener("input", function()
    {
        updateSemesterCreditCount(this);
        updateGlobalStats();
    });
    creditHoursInputElement.addEventListener("keydown", function(event)
    {
        // Check to see if the enter key was pressed before adding row
        if (event.keyCode === 13)
        {
            addRow(button);
        }
    });

    // Create credit hours data column and add credit hours input to it
    var creditHoursDataColumn = document.createElement("td");
    creditHoursDataColumn.appendChild(creditHoursInputElement);

    // Create first table row element and add the table data columns to it
    var firstDataRowElement = document.createElement("tr");
    firstDataRowElement.className = "data-row";
    firstDataRowElement.appendChild(courseNumberDataColumn);
    firstDataRowElement.appendChild(creditHoursDataColumn);

    // Append table data to table element
    semesterTableElement.appendChild(firstDataRowElement);

    // Focus the new course number input
    courseNumberInputElement.focus();
}

/*
Removes the selected row from the selected semester editor.
*/
function removeRow(button)
{
    // Get the current row that contains the current row
    var currentRow = button.parentNode.parentNode;

    // Get the current semester editor
    var semesterEditor = currentRow.parentNode.parentNode;

    // Get the credit hours input in the same row as this remove row button
    var creditHoursInput = currentRow.getElementsByClassName("credit-hours-input")[0];
    
    // Make sure that there are at least more than one data row before removing
    if (semesterEditor.getElementsByClassName("data-row").length > 1)
    {
        // Set the value of the credit hours input and update the credit hours counter before removing row
        creditHoursInput.value = "0";
        updateSemesterCreditCount(creditHoursInput);
        updateGlobalStats();

        currentRow.parentNode.removeChild(currentRow);
    }
}

/*
Removes selected semester editor. 
*/
function removeSemester()
{
    // Get the wrapper that contains all semester editor cards
    var semesterEditorWrapper = this.parentNode.parentNode;
    
    // Make sure that there are at least more than one semester before removing
    if (semesterEditorWrapper.getElementsByClassName("semester-editor card").length > 1)
    {
        semesterEditorWrapper.removeChild(this.parentNode);
    }
    
}

/*
This function adds a new empty semester editor.
*/
function addSemester()
{
    // Create elements needed to add a new semester card to the div
    var semesterTitleInputElement = document.createElement("input");
    semesterTitleInputElement.className = "semester-title-input text-input";
    semesterTitleInputElement.placeholder = "Semester...";

    var removeSemesterButtonElement = document.createElement("button");
    removeSemesterButtonElement.className = "remove-semester-button icon-button";
    removeSemesterButtonElement.addEventListener("click", removeSemester);

    var removeSemesterButtonIconElement = document.createElement("img");
    removeSemesterButtonIconElement.className = "remove-semester-button-icon";
    removeSemesterButtonIconElement.src = "images/close.svg";

    removeSemesterButtonElement.appendChild(removeSemesterButtonIconElement);

    // Create semester data table elements
    var semesterTableElement = document.createElement("table");
    semesterTableElement.className = "semester-table";

    var tableHeaderRowElement = document.createElement("tr");

    var courseNumberHeaderElement = document.createElement("th");
    courseNumberHeaderElement.appendChild(document.createTextNode("Course Number"));

    var creditHoursHeaderElement = document.createElement("th");
    creditHoursHeaderElement.appendChild(document.createTextNode("Credit Hours"));

    // Append headers to create first table row
    tableHeaderRowElement.appendChild(courseNumberHeaderElement);
    tableHeaderRowElement.appendChild(creditHoursHeaderElement);
    
    // Create elements needed for course number data column
    var removeRowButtonElement = document.createElement("button");
    removeRowButtonElement.className = "remove-row-button icon-button";
    removeRowButtonElement.addEventListener("mouseup", function()
    {
        removeRow(this);
    });

    var removeRowButtonIconElement = document.createElement("img");
    removeRowButtonIconElement.className = "remove-row-button-icon";
    removeRowButtonIconElement.src = "images/close.svg";

    removeRowButtonElement.appendChild(removeRowButtonIconElement);

    var courseNumberInputElement = document.createElement("input");
    courseNumberInputElement.className = "course-number-input semester-editor-inputs text-input";
    courseNumberInputElement.placeholder = "Course Number...";
    courseNumberInputElement.addEventListener("input", extractCreditHours);
    courseNumberInputElement.addEventListener("input", function()
    {
        updateSemesterCreditCount(this);
        updateGlobalStats();
    });
    courseNumberInputElement.addEventListener("keydown", function(event)
    {
        // If the user pressed the enter key, add a row
        if (event.keyCode === 13)
        {
            addRow(this.parentNode.getElementsByClassName("add-row-button")[0]);
        }
    });

    // Create course number data column and add remove button and input to it
    var courseNumberDataColumn = document.createElement("td");
    courseNumberDataColumn.appendChild(removeRowButtonElement);
    courseNumberDataColumn.appendChild(courseNumberInputElement);

    // Create elements needed for credit hour data column
    var creditHoursInputElement = document.createElement("input");
    creditHoursInputElement.className = "credit-hours-input semester-editor-inputs text-input";
    creditHoursInputElement.placeholder = "Credit Hours...";
    creditHoursInputElement.addEventListener("input", function()
    {
        updateSemesterCreditCount(this);
        updateGlobalStats();
    });
    creditHoursInputElement.addEventListener("keydown", function(event)
    {
        // Check to see if the enter key was pressed before adding row
        if (event.keyCode === 13)
        {
            addRow(this.parentNode.getElementsByClassName("add-row-button")[0]);
        }
    });

    // Create credit hours data column and add credit hours input to it
    var creditHoursDataColumn = document.createElement("td");
    creditHoursDataColumn.appendChild(creditHoursInputElement);

    // Create first table row element and add the table data columns to it
    var firstDataRowElement = document.createElement("tr");
    firstDataRowElement.className = "data-row";
    firstDataRowElement.appendChild(courseNumberDataColumn);
    firstDataRowElement.appendChild(creditHoursDataColumn);

    // Append table data to table element
    semesterTableElement.appendChild(tableHeaderRowElement);
    semesterTableElement.appendChild(firstDataRowElement);

    // Create button to add a new row
    var addNewRowButton = document.createElement("button");
    addNewRowButton.className = "add-row-button icon-button";
    addNewRowButton.addEventListener("mouseup", function()
    {
        addRow(this);
    });

    var addNewRowButtonIcon = document.createElement("img");
    addNewRowButtonIcon.className = "add-row-button-icon";
    addNewRowButtonIcon.src = "images/add.png";
    addNewRowButton

    addNewRowButton.appendChild(addNewRowButtonIcon);

    // Create total hours counter
    var creditHoursCounterLabelElement = document.createElement("span");
    creditHoursCounterLabelElement.className = "semester-credit-count-label";
    creditHoursCounterLabelElement.appendChild(document.createTextNode("Total Hours: "));

    var creditCountElement = document.createElement("span");
    creditCountElement.className = "semester-credit-count";
    creditCountElement.appendChild(document.createTextNode("0"));

    var creditHoursCounterDivElement = document.createElement("div");
    creditHoursCounterDivElement.className = "semester-credit-count-wrapper";
    creditHoursCounterDivElement.appendChild(creditHoursCounterLabelElement);
    creditHoursCounterDivElement.appendChild(creditCountElement);

    // Get div to append new semester editor to
    var semesterEditorWrapper = document.getElementById("semester-editor-wrapper");

    // Create semester editor card element that contains all new elements
    var semesterEditorCardDivElement = document.createElement("div");
    semesterEditorCardDivElement.className = "semester-editor card";

    // Add created elements to semester editor card element
    semesterEditorCardDivElement.appendChild(semesterTitleInputElement);
    semesterEditorCardDivElement.appendChild(removeSemesterButtonElement);
    semesterEditorCardDivElement.appendChild(semesterTableElement);
    semesterEditorCardDivElement.appendChild(addNewRowButton);
    semesterEditorCardDivElement.appendChild(creditHoursCounterDivElement);

    // Append created semester editor to the semester editor wrapper
    semesterEditorWrapper.appendChild(semesterEditorCardDivElement);

    // Scroll down to newly added semester editor card
    location.hash = "#" + "new-semester";
}

/*
Parses the course number as it is entered and extracts the number of credit hours.
*/
function extractCreditHours()
{
    // Regex search strings for extracting data from inputs
    var courseRegex = /[a-zA-z&]+\s*[0-9]{3,4}/g;
    var courseDigitsRegex = /[0-9]+/g;
    var courseSubjectRegex = /[a-zA-z]+/g;

    // Get each data row
    var dataRows = document.getElementsByClassName("data-row");

    // Declare match variable to hold regex matches
    var match;

    // Declare variable to hold extracted credit hours
    var hours;

    // Iterate through each row and parse the course number and fill the course hours input when necessary
    for (var count = 0; count < dataRows.length; count++)
    {
        // Get value in course number input
        var courseNumber = dataRows[count].getElementsByClassName("course-number-input")[0].value;

        // Get credit hours input
        var creditHoursInput = dataRows[count].getElementsByClassName("credit-hours-input")[0];

        // Set default of credit hours input to be blank for when users input is invalid
        creditHoursInput.value = "";

        // If the user's input matches the regex search
        if (match = courseNumber.search(courseRegex) != -1)
        {
            // Get the subject portion of the course number
            var courseSubject = courseNumber.match(courseSubjectRegex)[0];

            // Get the digit portion of the course number
            var courseDigits = courseNumber.match(courseDigitsRegex)[0];

            // Extract the number of credit hours from course digits
            if (courseDigits.length == 4)
            {
                hours = courseDigits[1];
            }
            else
            {
                hours = courseDigits[0];
            }

            // Once hours have been found, set the value of the hours input to the found hours
            creditHoursInput.value = hours;
        }
    }
}

/*
Updates the total hours and goal hours stats at the bottom of the page.
*/
function updateGlobalStats()
{
    // Declare counter for hours
    var hours = 0;

    // Get the total hours stat div
    var totalHoursStatDiv = document.getElementById("total-hours-div").getElementsByClassName("stat-body")[0];

    // Get all of the semester credit hour counts from each semester editor
    var semesterCreditCountElements = document.getElementsByClassName("semester-credit-count");
    console.log(semesterCreditCountElements);

    // Iterate through each count element and tally up the total hours
    for (var count = 0; count < semesterCreditCountElements.length; count++)
    {
        hours += parseInt(semesterCreditCountElements[count].textContent);
    }

    // Set text content of total hours stat div
    totalHoursStatDiv.textContent = hours;

    // After updating the total hours, update the goal hours stat

    // Get the goal hours stat body and caption
    var goalHoursStatBodyElement = document.getElementsByClassName("stat-body")[1];
    var goalHoursStatCaptionElement = document.getElementsByClassName("stat-caption")[1];

    // Get the current hours number being displayed
    var currentHoursDisplay = goalHoursStatBodyElement.textContent;

    // Get the goal hours 
    var goalHours = parseInt(document.getElementById("goal-hours-input").value);

    // If goal hours is NaN (no value or is invalid), revert caption to default and return from function
    if (isNaN(goalHours))
    {
        goalHoursStatBodyElement.textContent = "0";
        goalHoursStatCaptionElement.textContent = "Please Provide a Goal Hour";
        return;
    }

    // Calculate difference in hours
    var hourDifference = goalHours - hours;

    // Change goal hour stats body/caption based on sign of hour difference
    if (hourDifference >= 0)
    {
        // If the hour difference is positive, show difference as-is an show "from" caption
        goalHoursStatBodyElement.textContent = hourDifference;

        // If there is only one hour left, show hour as singular
        if (hourDifference === 1)
        {
            goalHoursStatCaptionElement.textContent = "Hour From Goal";
        }
        // Otherwise, show hours as plural
        else
        {
            goalHoursStatCaptionElement.textContent = "Hours From Goal";
        }
    }
    else
    {
        // If the hour difference is negative, show difference * -1 and show "over" caption
        goalHoursStatBodyElement.textContent = hourDifference * -1;

        // If there is only one hour above, show hour as singular
        if (hourDifference === -1)
        {
            goalHoursStatCaptionElement.textContent = "Hour Above Goal";
        }
        // Otherwise, show hours as plural
        else
        {
            goalHoursStatCaptionElement.textContent = "Hours Above Goal";
        }
    }

    // If hours difference is NaN, display the current value being displayed
    if (isNaN(hourDifference))
    {
        goalHoursStatBodyElement.textContent = currentHoursDisplay;
    }
    // If hours difference is a valid number, then display that number
    else
    {
        goalHoursStatBodyElement.textContent = hourDifference;
    }
}