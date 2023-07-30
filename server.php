<?php

    $code = $_POST['code'];
    $input = $_POST['input'];
    $lang = $_POST['lang'];
    
    $inputfilepath = "input.txt";
    $inputfile = fopen($inputfilepath, "w");
    fwrite($inputfile, $input);
    fclose($inputfile);

   
    $filename = substr(md5(mt_rand()), 0, 5);
    $codepath = "program_files/" . $filename . "." . "c"; 
    $codefile = fopen($codepath, "w");
    fwrite($codefile, $code);
    fclose($codefile);

    if ($lang == "c_c++") {        
        $command = "g++ -o csourcecode $codepath 2>&1" . "&&"."csourcecode.exe"."<" ."input.txt";
    } 
    else if ($lang == "python"){       
        $command = "python $codepath 2>&1" . "<" ."input.txt";
    }
    else if ($lang == "js"){       
        $command = "node $codepath 2>&1" . "<" ."input.txt";
    }

    $output = shell_exec($command);

    unlink($codepath);

    if ($lang == "c_c++") {        
        unlink("csourcecode.exe");
    } 
   
    


    echo $output;


?>






