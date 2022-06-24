
    $(document).ready(function startgame(){
    //Function Startgame Runs On Page Load

    //Hide On Loading DOM
    $("#scorecontainer").hide();
    $("#nextlvlbutton").hide();
    $("#restartbutton").hide();

        //Gets var Playername from local storage and carries through levels
        var playername = localStorage.getItem('playername');
        //User Welcome Plus Name
        $(".welcome").text("" +playername);
        //Random Image Array For User Avatar
        var avatararray = ["images/alienavatar.png", "images/astronaut.png", "images/alienavatar2.png"];
        val = Math.floor(Math.random() * avatararray.length);
        //Stores + Sends Image From Array To IMG on HTML page
        var avatar = document.getElementById("img");
        avatar.innerHTML = "<img class='random' src=" + avatararray[val] + " />";

        localStorage.setItem("avatar", avatar);


    //Score + Timer + Audio Variables
    var levelcompleteaudio = document.getElementById('levelcompleteaudio')
    var outoftimeaudio = document.getElementById('outoftimeaudio');
    var swooshaudio = document.getElementById('swooshaudio');
    var score = 9;
    var clearTimer;
    var counter;
    //Run Start Timer Function
    startTimer();
    
    //On Page Load Execute
    $("#welcome").slideDown();
    $("#gamescore").slideDown("slow");
    $("#scorecontainer").slideDown("slow");
    swooshaudio.play();

    //Makes Planets Draggable
    $(".draggable").draggable({
        revert: "invalid",
        containment:"#border"
        
    }); //End Draggable

    //Dropzone 1
    $(".dropzone1").droppable({
        accept: "#planet2",
        drop: handleDropEvent
    }); //End Dropzone 1

    //Dropzone 2
    $(".dropzone2").droppable({
        accept: "#planet1",
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
        if (dropzonedataval === elementid) {
            $(this).text();
            ui.draggable.draggable({ disabled: true}).css("opacity", 0.0);
            score++
            $(".score").text(score);
            checkScore()
        }   //End Of If Statement
    
    } // End of Drop Event Function

    function checkScore(){
        if (score === 12) {
            $(".welcome").hide();
            $("#avatar").hide();
            $("#planetdraggables").hide();
            $(".scoremessage").slideDown("slow");
            $("#nextlvlbutton").show();
            $(".scoremessage").text("Well Done! " + playername +  " Level 4 Completed");
            //Play Audio On Level Completion
            levelcompleteaudio.play();
            //Stop Timer Function
            stopTimer();
        }

    } //End Check Score

    function startTimer() {
        counter = 31;
        clearTimer = setInterval(function(){
        counter--;
        if (counter >= 0) {
            countdown = document.getElementById("timer")
            countdown.innerHTML = " " + counter;
        }
        //If Counter Reaches 0/-1 Execute
        else if (counter === 0 || counter === -1) {
            $(".scoremessage").slideDown("slow");
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

    } //End Start Timer

    function stopTimer() {
        clearInterval(clearTimer);
    } //End Stop Timer Function
    

    


}); //End Document.Ready