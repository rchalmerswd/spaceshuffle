$(document).ready(function(){

    //Hide On Loading DOM
    $("#planetdraggables").hide();
    $("#dropzones").hide();
    $("#scorecontainer").hide();
    $("#nextlvlbutton").hide();
    $("#restartbutton").hide();
    $('#border').hide();

   
    //Change Theme Goes Here
    $("select").on("change",function(){
        var colours=["Red", "Green", "Teal"]
        var selectedcolours = $(this).val()
    
        for(i=0;i <=colours.length;i++){
    
            if(selectedcolours === "Purple"){
                $("h1").css({"color": "#9642D6", "text-shadow": "4px 4px 4px #612A8A"});
            
            } //End IF

            else if(selectedcolours === "Blue"){
                $("h1").css({"color": "#43BDD9", "text-shadow": "4px 4px 4px #0A7AA6"});

            }  

            else if(selectedcolours === "Teal"){
                $("h1").css({"color": "#06DFC4" , "text-shadow": "4px 4px 4px #168C8C"});

            }  


        } //End Loop
    }); //End Function



    //On button click or enter run startgame function()
    $("#startbtn").on("click", startgame);

    //On Enter Key run startgame function()
    $("#userinput").keypress(function (e){
        if (e.which == 13) {
            startgame();
    
        }
    });

    //Game Code//
    function startgame() {
        
        //.val captures values from form #userinput
        //Global Variable Referenced in multiple functions
        var playername = $("#userinput").val();

        //Sends var playername to local storage
        localStorage.setItem("playername", playername);

        //User Welcome Message Plus Name
        $(".welcome").text("Hello " +playername);
        //Random Image Array For User Avatar
        var avatararray = ["images/alienavatar.png", "images/astronaut.png", "images/alienavatar2.png"];
        val = Math.floor(Math.random() * avatararray.length);
        //Stores + Sends Image From Array To IMG on HTML page
        var avatar = document.getElementById("img");
        avatar.innerHTML = "<img class='random' src=" + avatararray[val] + " />";
        
    //Score + Timer + Audio Variables
    var levelcompleteaudio = document.getElementById('levelcompleteaudio');
    var outoftimeaudio = document.getElementById('outoftimeaudio');
    var swooshaudio = document.getElementById('swooshaudio');
    var score = 0;
    var clearTimer;
    var counter;
    //Run Start Timer Function
    startTimer();
    
    //On Start Button Execute
    swooshaudio.play();
    $("#changetheme").hide();
    $("#nameinput").hide();
    $("#startbutton").hide();
    $("#welcome").slideDown();
    $("#gamescore").slideDown("slow");
    $('#border').fadeIn("slow");
    $("#planetdraggables").fadeIn("slow");
    $("#dropzones").fadeIn("slow");
    $("#scorecontainer").slideDown("slow");
    $("h1").slideUp("slow");

    //Makes Planets Draggable
    $(".draggable").draggable({
        revert: "invalid",
        containment:"#border"
        
        
    }); //End Draggable

    //Dropzone 1
    $(".dropzone1").droppable({
        accept: "#planet1",
        drop: handleDropEvent
    }); //End Dropzone 1

    //Dropzone 2
    $(".dropzone2").droppable({
        accept: "#planet2",
        drop: handleDropEvent
    }); //End Dropzone 2

    //Dropzone 3
    $(".dropzone3").droppable({
        accept: "#planet3",
        drop: handleDropEvent
    }); //End Dropzone 3

    

    function handleDropEvent(event, ui) {
        var dropzonedataval = $(this).attr("data-value");
        var elementid = $(ui.draggable).attr('id');
        //IF Planet Matches Dropzone Execute
        if (dropzonedataval === elementid) {
            $(this).text();
            ui.draggable.draggable({ disabled: true}).css("opacity", 0.0);
            score++
            $(".score").text(score);
            checkScore()

        }   //End Of If Statement
        
    } // End of Drop Event Function

    function checkScore(){
        //If Score Reaches 3 Execute
        if (score === 3) {
            $(".welcome").hide();
            $("#avatar").hide();
            $("#planetdraggables").hide();
            $(".scoremessage").slideDown("slow");
            $("#nextlvlbutton").show();
            $(".scoremessage").text("Well Done! " + playername +  " Level 1 Completed");
            //Play Audio On Level Completion
            levelcompleteaudio.play();
            //Stop Timer
            stopTimer();
        }



    } //End Check Score

    function startTimer() {
        counter = 61;
        clearTimer = setInterval(function(){
        counter--;
        if (counter >= 0) {
            countdown = document.getElementById("timer")
            countdown.innerHTML = " " + counter;
        }
        //If Counter Reaches 0/-1 Execute 
        else if (counter === 0 || counter === -1) {
            $(".scoremessage").slideDown("slow");
            $(".welcome").hide();
            $(".scoremessage").text("Sorry " + playername + " You Are Out Of Time");
            outoftimeaudio.play();
            $("#restartbutton").slideDown("slow");
            clearInterval(clearTimer);
            $(".draggable").draggable({ disabled: true }).css("opacity", 0.5);
            $(".dropzone1").droppable({ disabled: true }).css("opacity", 0.5);
            $(".dropzone2").droppable({ disabled: true }).css("opacity", 0.5);
            $(".dropzone3").droppable({ disabled: true }).css("opacity", 0.5);

        }

        }, 1000);

    } // End Start Timer

    function stopTimer() {
        clearInterval(clearTimer);
    } //End Stop Timer Function
    

    }//End of Start Game


}); //End Document.Ready