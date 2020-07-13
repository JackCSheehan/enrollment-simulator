document.addEventListener("DOMContentLoaded", downloadScriptsInit);
console.log("FILE");
/*
Init routines for download scripts.
*/
function downloadScriptsInit()
{
    document.getElementById("pdf-download-button").addEventListener("mouseup", downloadAsPDF);
}

/*
Opens the browser's print window to allow user to print to PDF or print directly.
*/
function downloadAsPDF()
{
    window.print();
    window.close();
}