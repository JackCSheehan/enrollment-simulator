/*
Init routines for app section.
*/
function init()
{
    // Get blank HTML for semester editor
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
    location.hash = "#" + "semester-editor-button-anchor";

    // Add event listener to each remove semester button
    var removeSemesterButtons = document.getElementsByClassName("remove-semester-button");
    for (var count = 0; count < removeSemesterButtons.length; count++)
    {
        removeSemesterButtons[count].addEventListener("click", removeSemester);
    }
}