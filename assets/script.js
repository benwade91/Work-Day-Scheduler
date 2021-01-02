var tasks = [];

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks){ tasks = [];}
    $.each(tasks, function (e) {
        var lineId = $(this).attr("id");
        var lineText = $(this).attr("content");
        var pEl = $("#" + lineId).find("p");
        pEl.text(lineText);
    });
};

var timeCheck = function () {
    var time = moment().hour();
    for (i = 9; i < 18; i++) {
        var cellTime = parseInt($("#" + i).attr("id"));
        var thisCell = $("#" + i).find(".content");
        if (cellTime < time) {
            thisCell.removeClass("future", "present");
            thisCell.addClass("past");
        } else if (cellTime === time) {
            thisCell.removeClass("future");
            thisCell.addClass("present");
        } else if (time == 1) {
            reload();
        };
    }
};

$(".content").on("click", function () {
    var text = $(this)
        .find("p")
        .text()
        .trim();
    var textInput = $("<textarea>").addClass("col-10").val(text);
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");
});

$(".content").on("blur", "textarea", function () {
    var text = $(this).val();
    if (text) {
        var taskP = $("<p>")
            .text(text);

        $(this).replaceWith(taskP);

        var lineItem = {
            content: text,
            id: $(taskP).parent().parent().attr("id")
        };
        tasks.push(lineItem);
        saveTasks();
    } else {
        var taskP = $("<p>");
        $(this).replaceWith(taskP);
    }
});

$(".saveBtn").on("click", function () {
    var text = $(".content textarea").val();
    if (text) {
        console.log(text);
        var taskP = $("<p>")
            .text(text);

        $(".content textarea").replaceWith(taskP);

        var lineItem = {
            content: text,
            id: $(taskP).parent().parent().attr("id")
        };

        tasks.push(lineItem);
        saveTasks();
    } else {
        var taskP = $("<p>");

    $(".content textarea").replaceWith(taskP);
}
});

$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm a'));

timeCheck();
loadTasks();
setInterval(function () {
    timeCheck();
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm a'));
}, 15000);