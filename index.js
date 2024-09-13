var buttoncolour=["red","yellow","blue","green","white","black"];
var gamepattern=[]
var userclickedpattern=[]
var started=false;
var level=0;

$(".btn").on("click", function() {
    var userchosencolor = $(this).attr("id");
    userclickedpattern.push(userchosencolor);
    sound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userclickedpattern.length-1);
});

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextsequence();
        started=true;
    }
});



function nextsequence()
{   userclickedpattern=[];
    level++;
    $("#level-title").text("level "+level);
    var random=Math.floor(Math.random()*6);
    var randomchosencolor=buttoncolour[random];
    gamepattern.push(randomchosencolor);

    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomchosencolor);
    
}

function sound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}
function animatepress(current)
{
    
    $("#"+current).addClass("pressed");
    setTimeout(function(){$("#"+current).removeClass("pressed")},100);
}


function checkanswer(currentlevel)
{
    if (userclickedpattern[currentlevel]==gamepattern[currentlevel])
    {
        console.log("success");
        if (userclickedpattern.length==gamepattern.length)
        {
            setTimeout(function(){nextsequence()},1000);
        }
    }
    else{
        console.log("false");
        sound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);

        $("#level-title").text("Get lost");
        startover();

    }

}

function startover(){
    level=0;
    gamepattern=[];
    started=false;
}









