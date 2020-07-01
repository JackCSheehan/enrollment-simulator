document.addEventListener("DOMContentLoaded", init);

/*
Init routines for app section.
*/
function init()
{
    // Get template HTML for semester editor
    var semesterEditorHTML = document.getElementById("semester-editor-wrapper").innerHTML;

    // Add event listener to add semester button
    document.getElementById("add-semester-button").addEventListener("click", function()
    {
        addSemester(semesterEditorHTML);
    })

    // Add event listener to each remove semester button
    var removeSemesterButtons = document.getElementsByClassName("remove-semester-button");
    for (var count = 0; count < removeSemesterButtons.length; count++)
    {
        removeSemesterButtons[count].addEventListener("click", removeSemester);
    }

    // Get template HTML for semester editor data row
    var dataRowHTML = document.getElementsByClassName("data-row")[0].outerHTML;

    // Add event listener to first add row button
    document.getElementsByClassName("add-row-button")[0].addEventListener("click", function()
    {
        addRow(this, dataRowHTML);
    });

    // Add event listener to first remove row button
    document.getElementsByClassName("remove-row-button")[0].addEventListener("click", function() 
    {
        removeRow(this);
    })

    // Add event listener to first course number input
    document.getElementsByClassName("course-number-input")[0].addEventListener("input", extractCreditHours);
}

/*
Adds a row to the selected semester editor.
*/
function addRow(button, dataRowHTML)
{
    // Get table to add row to
    var table = button.previousSibling.previousSibling;
    
    // Add row to table
    table.innerHTML += dataRowHTML;

    // Add event listeners to all new data rows
    var dataRows = document.getElementsByClassName("remove-row-button");
    for (var count = 0; count < dataRows.length; count++)
    {
        dataRows[count].addEventListener("click", function()
        {
            removeRow(this);
        });
    }
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
    
    if (semesterEditor.getElementsByClassName("data-row").length > 1)
    {
        currentRow.parentNode.removeChild(currentRow);
    }
}

/*
Removes selected semester editor. 
*/
function removeSemester()
{
    this.parentNode.parentNode.removeChild(this.parentNode);
}

/*
This function adds a new empty semester editor.
*/
function addSemester(semesterEditorHTML)
{
    // Get div to append new semester editor to
    var semesterEditorWrapper = document.getElementById("semester-editor-wrapper");

    // Add template HTML to wrapper div
    semesterEditorWrapper.innerHTML += semesterEditorHTML;

    // Scroll down to newly added semester editor card
    location.hash = "#" + "new-semester";

    // Add event listener to each remove semester button
    var removeSemesterButtons = document.getElementsByClassName("remove-semester-button");
    for (var count = 0; count < removeSemesterButtons.length; count++)
    {
        removeSemesterButtons[count].addEventListener("click", removeSemester);
    }

    // Get template HTML for semester editor data row
    var dataRowHTML = document.getElementsByClassName("data-row")[0].outerHTML;

    // Add event listener to each add row button
    var addRowButtons = document.getElementsByClassName("add-row-button");
    for (var count = 0; count < addRowButtons.length; count++)
    {
        addRowButtons[count].addEventListener("click", function()
        {
            addRow(this, dataRowHTML);
        });
    }

    // Add event listener to each remove row button
    var dataRows = document.getElementsByClassName("remove-row-button");
    for (var count = 0; count < dataRows.length; count++)
    {
        dataRows[count].addEventListener("click", function()
        {
            removeRow(this);
        });
    }
}

/*
Parses the course number as it is entered and extracts the number of credit hours.
*/
function extractCreditHours()
{
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