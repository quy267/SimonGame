/**
 * Created by MyPC on 29/10/2016.
 */
$(document).ready(function () {
    //Initializing Audio
    var simon1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var simon2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var simon3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var simon4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    //Initializing Game object
    var gameObj = {
        gameArr: [],
        inputArr: [],
        mode: 'normal',
        level: 0,
        record: false,
        init: function (mode) {
            $("button").prop('disabled', true);
            setTimeout(function () {
                $("button").prop('disabled', true);
            }, 3000);
            this.mode = mode;
            this.level = 0;
            this.gameArr = [];
            this.inputArr = [];
            this.play();
        },
        play: function (repeat) {
            this.record = false;
            if (this.level < 20 || repeat) {
                if (!repeat) {
                    this.level++;
                    $('#roundLevel').val(this.level);
                    while (true) {
                        var index = Math.floor(Math.random() * 4);
                        if (index <= 3) {
                            this.gameArr.push(index);
                            break;
                        }
                    }
                    $("#msg").val("Playing");
                }
                this.gameArr.forEach(function (e, i, a) {
                    setTimeout(function () {
                        $("#" + e).trigger("mousedown");
                        console.log(e);
                        setTimeout(function () {
                            $("#" + e).trigger("mouseup");
                            if (i === a.length - 1) {
                                console.log("Record");
                                $('#msg').val("Listen");
                                gameObj.record = true;
                            }
                        }, 500);
                    }, (i + 1) * 1500);

                });
            }
            else {
                $('#msg').val("Win !");
            }
        },
        chkInput: function (n) {
            this.inputArr.push(n);
            if (this.inputArr.toString() === this.gameArr.toString()) {
                console.log("well done! moving on...");
                this.inputArr = [];
                this.play();
            } else if (n !== this.gameArr[this.inputArr.length - 1]) {
                console.log('That was a mistake!');
                if (this.mode == 'normal') {
                    $('#msg').val("Replay");
                    this.inputArr = [];
                    this.record = false;
                    this.play(true);
                } else if (this.mode == 'strict') {
                    console.log('You lose!');
                    $('#msg').val("Lose !!");
                }
            }
        }
    };

    //Button press effects
    $("#0").on("mousedown", function () {
        $(this).css("opacity", 1);
        simon1.pause();
        simon1.currentTime = 0;
        simon1.play();
    });

    $("#1").on("mousedown", function () {
        $(this).css("opacity", 1);
        simon2.pause();
        simon2.currentTime = 0;
        simon2.play();

    });

    $("#2").on("mousedown", function () {
        $(this).css("opacity", 1);
        simon3.pause();
        simon3.currentTime = 0;
        simon3.play();

    });

    $("#3").on("mousedown", function () {
        $(this).css("opacity", 1);
        simon4.pause();
        simon4.currentTime = 0;
        simon4.play();
    });

    $("#0,#1,#2,#3").on("mouseup", function () {
        $(this).css("opacity", 0.6);
        if (gameObj.record) {
            console.log($(this).attr("id"));
            gameObj.chkInput($(this).attr("id"));
        }
    });


    $('#startBtn').on("click", function () {
        $('#strictOnOff').css("background-color", "black");
        gameObj.init('normal');
    });

    $('#strictBtn').on('click', function () {
        $('#strictOnOff').css("background-color", "red");
        gameObj.init('strict');
    })
});