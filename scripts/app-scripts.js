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

    // Add event listeners to all new data rows rows
    //var dataRows = document
}

/*
Removes the selected row from the selected semester editor.
*/
function removeRow(button)
{
    button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
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
}

/*
Parses the course number as it is entered and extracts the number of credit hours.
*/
function extractCreditHours()
{
    var courseRegex = new RegExp("([a-zA-z]+)\\\s*([0-9]{3,4})");

    // Get each data row
    var dataRows = document.getElementsByClassName("data-row");

    // Iterate through each row and parse the course number and fill the course hours input when necessary
    for (var count = 0; count < dataRows.length; count++)
    {
        // Get value in course number input
        var courseNumber = dataRows.getElementsByClassName("course-number-input")[0].value;

        if (courseRegex.exec(courseNumber))
        {
            console.log(courseNumber);
        }
    }
}