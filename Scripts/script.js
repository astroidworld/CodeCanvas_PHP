let editor;
var inputs = $("#input");

const fs = require("fs");

window.onload = function() {
    editor = ace.edit("editor");    
    editor.setTheme("ace/theme/textmate");    
    editor.session.setMode("ace/mode/c_cpp");
    
}

$("#language").change(()=>{
    if($('#language').val() === "c_c++")
    {
        editor.session.setMode("ace/mode/c_cpp");
    }
    else if($('#language').val() === "python")
    {
        editor.session.setMode("ace/mode/python");
    }
    else if($('#language').val() === "js")
    {
        editor.session.setMode("ace/mode/javascript");
    }
})  

$("#run").click(function(){
    $(".code_output").text("");

    console.log(parseInt(inputs.text()))
    

    $.ajax({
        url: "server.php",
        method: "POST",
        data: {
            code: editor.getSession().getValue(),
            input: inputs.text(),
            lang: $('#language').val()
        },
        success: function(response){
            $(".code_output").text(response);      
            
        }

    })

})

function download(uri, name) 
{
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}