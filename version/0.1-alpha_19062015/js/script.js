var prevID, toolName, image, w, h, t, n, s, c = document.createElement('canvas'),
    ctx, dim;

$(document).ready(function () {
    /*Show Menu*/
    $("#nav-btn").click(function () {
        if ($(this).hasClass("open-nav")) {
            openNav(this);
        } else {
            closeNav(this);
        }
    });

    $("#blur").click(function () {
        closeNav("#nav-btn");
        if ($("#promptCls").show()) {
            $("#promptCls").hide();
        }
    });
    /*End of Show Menu*/

    /*Show amout Area*/
    $("#tools-array button").click(function () {
        $("#type, #slider").addClass("show-range");
    });

    /*Tools*/
})

/*-----------FUNCTIONS----------*/
/*---NAVIGATION---*/
/*Open Navigation*/
function openNav(btn) {
    $("nav").css("margin-left", "0px");
    $("#blur").show();
    $(btn).addClass("close-nav ion-close-round").removeClass("open-nav ion-navicon-round");
}

/*Close Navigation*/
function closeNav(btn) {
    $("nav").css("margin-left", "-82px");
    $("#blur").hide();
    $(btn).addClass("open-nav ion-navicon-round").removeClass("close-nav ion-close-round");
}

/*---Work with Image---*/
/*Open Image*/
function openFile() {
    $("#inputFile").click();
    $("#inputFile").change(function () {
        var file = this.files[0];
        $("#ImgIpt").attr("disabled", true);
        $(".ion-image").removeAttr("disabled");
        $(".ion-trash-a").removeAttr("disabled");
        infoImage(file);
        enaTools();
        closeNav("#nav-btn");
    })
}

function infoImage(file) {
    var imageReader = new FileReader();
    image = new Image();

    imageReader.readAsDataURL(file);
    imageReader.onload = function (_file) {
        image.src = _file.target.result;
        image.onload = function () {
            w = this.width,
                h = this.height,
                t = file.type,
                n = file.name;
            drawImage();
        };

        image.onerror = function () {
            alert("The file format you have selected is invalid: " + file.type);
        };
    };
}

/*Save Image*/
function saveImage() {
    c.toBlob(function (blob) {
        saveAs(blob, "idit_" + n)
    })
}

/*--Clear Canvas--*/
/*Enable Prompt*/
function clearCanvas() {
    $("#promptCls").show()
    closeNav("#nav-btn");
    $("#blur").show()
}

/*Definitive Clear*/
function clearDef() {
    $("canvas").remove();
    $("#ImgIpt").removeAttr("disabled");
    $(".ion-image").attr("disabled", true);
    $(".ion-trash-a").attr("disabled", true);
    $("#slider, #type").removeClass("show-range");
    $("#brgsld, #sharpsld, #blursld").val(0);
    $("output").val(0);
    $("#graysld").attr("checked", false);
    disTools();
    cancelCls();
}

/*Cancel Clear*/
function cancelCls() {
    closeNav("#nav-btn");
    if ($("#promptCls").show()) {
        $("#promptCls").hide()
    }
}

/*---End of Work with Image---*/

/*Redirect to Author website*/
function redirect() {
    var win = window.open("http://captainjkob.tk", "_blank");
    win.focus();
}

/*---TOOLS---*/
/*Select Tools*/
function selectTools(id) {

    if (id != prevID) {
        $(prevID).hide();
        $(id).show();
        prevID = id;
        switching(id);
        $("#typeName").text(toolName);
    }
}

/*Auto Select Header*/
function switching(id) {
    switch (id) {
    case "#Bright-Slide":
        {
            toolName = "Brightness";
            break;
        }
    case "#Gray-Scale":
        {
            toolName = "Grayscale";
            break;
        }
    case "#Sharp-Scale":
        {
            toolName = "Sharpness";
            break;
        }
    case "#Blur-Tools":
        {
            toolName = "Blur";
            break;
        }
    case "#Draw-Tools":
        {
            toolName = "Drawing";
            break;
        }
    }
}

/*Enable Tools*/
function enaTools() {
    $("#tools-array button").removeAttr("disabled");
}

/*Disable Tools*/
function disTools() {
    $("#tools-array button").attr("disabled", true);
}
