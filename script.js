let str = '';
let btnTrigger = false;

function addBannedWord() {
    if ($('#word').val() != "") {
        if (btnTrigger == false) {
            btnTrigger = true;
            str += ($('#word').val());
            console.log(str);
            $('#listWord').append(`<div>${$('#word').val()}</div>`);
            $('#word').val('');
        } else {
            str += ',' + ($('#word').val());
            $('#listWord').append(`<div>,${$('#word').val()}</div>`);
            console.log(str);
            $('#word').val('');
        }
    }

}
$("#listWord").click(function (e) {
    if (e.target != document.getElementById("listWord")) {
        let targetText = e.target.innerText;
        let delNumb = str.indexOf(targetText);
        let delNumbWidth = targetText.length;
        let strStart = str.slice(0, delNumb);
        let strEnd = str.slice(delNumb + delNumbWidth)
        str = strStart + strEnd;
        e.target.style.display = "none";
        if (str == "") {
            btnTrigger = false;
        }
    }

});
$('#addBtn').click(function () {
    addBannedWord();
});
document.onkeydown = function (e) {
    if (e.key == "Enter") {
        addBannedWord();
    }
}
$('#cenzor').click(function () {
    let words = str.split(',');
    let allText = clearArr($('#textInfo').val().split(' '));
    console.log(words);
    console.log(allText);

    for (let i = 0; i < allText.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (allText[i].indexOf(words[j]) != -1) {
                allText[i] = sumbolReplace(allText[i]);
            }
        }
    }
    $("#textInfo").val(allText.join(" "));
})

function clearArr(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != '') {
            res.push(arr[i]);
        }
    }
    return res;
}

function sumbolReplace(word) {
    let wordWidth = word.length;
    let res = "";
    for (let i = 0; i < wordWidth; i++) {
        console.log(word[i])
        if (word[i] != "." && word[i] != "," && word[i] != "?" && word[i] != "!" && word[i] != "%" && word[i] != "@" && word[i] != "#" && word[i] != "$" && word[i] != "%" && word[i] != "^" && word[i] != "&" && word[i] != "*" && word[i] != "(" && word[i] != ")" && word[i] != "-" && word[i] != "_") {
            res += "*";
        } else {
            res += word[i];
        }
    }
    return res;
}