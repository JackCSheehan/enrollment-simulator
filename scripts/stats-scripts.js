/*
Counts the number of courses input by the user into the app. Returns the number of courses input
*/
function getCourseCount()
{
    // Get the div where all the semester editors are
    var semesterEditorsWrapper = document.getElementById("semester-editor-wrapper");

    // Keep track of valid courses entered
    var courseCount = 0;

    // Iterate through all course number inputs
    for (var dataRow in semesterEditorsWrapper.getElementsByClassName("data-row"))
    {
        // Check to make sure that a course number input contains text before counting it as a course
        if (dataRow.getElementsByClassName("course-number-input")[0].value.trim().length != 0)
        {
            courseCount++;
        }
    }

    return courseCount;
}