String.prototype.format = function() {
    a = this;
    for (k in arguments) { a = a.replace("{" + k + "}", arguments[k]) }
    return a;
}

function isEmpty(value) {
    if (value.value.length == 0) return true;
    return false;
}

function updateFormable() {
    
    var output = document.getElementById("output-text");

    var name = document.getElementById("name");
    var canform = document.getElementById("canform");
    var required = document.getElementById("required");
    var exclusive = document.getElementById("exclusive");
    var buttonName = document.getElementById("button-name");
    var buttonDesc = document.getElementById("button-desc");
    var alertTitle = document.getElementById("alert-title");
    var alertDesc = document.getElementById("alert-desc");
    var alertButton = document.getElementById("alert-button");
    var flagLink = document.getElementById("flag-link");

    canformlist = "";
    requiredlist = "";
    exclusivelist = "";

    canformlist = formListString(canform, canformlist);
    requiredlist = formListString(required, requiredlist);
    exclusivelist = formListString(exclusive, exclusivelist);


    if (!isEmpty(name) && !isEmpty(canform) && !isEmpty(required) && !isEmpty(buttonName) && !isEmpty(buttonDesc) && !isEmpty(flagLink)) {

        copyVisibility('visible');

        if (!isEmpty(alertTitle) || !isEmpty(alertDesc) || !isEmpty(alertButton)) {
            output.innerHTML = "{<br>FormableName = \"{0}\",<br>CountriesCanForm = {{1}},<br>RequiredCountries = {{2}},<br>ExclusiveFormables = {{3}},<br>FormableButton = {<br>ButtonName = \"{4}\",<br>ButtonDescription = \"{5}\",<br>},<br><br>CustomAlert = {<br>Title = \"{6}\",<br>Desc = \"{7}\",<br>Button = \"{8}\",<br>},<br>},<br><br>Flag link: {9}".format(name.value, canformlist, requiredlist, exclusivelist, buttonName.value, buttonDesc.value, alertTitle.value, alertDesc.value, alertButton.value, flagLink.value);
        }
        else output.innerHTML = "{<br>FormableName = \"{0}\",<br>CountriesCanForm = {{1}},<br>RequiredCountries = {{2}},<br>ExclusiveFormables = {{3}},<br>FormableButton = {<br>ButtonName = \"{4}\",<br>ButtonDescription = \"{5}\",<br>},<br>},<br><br>Flag link: {6}".format(name.value, canformlist, requiredlist, exclusivelist, buttonName.value, buttonDesc.value, flagLink.value);



    } else {
        output.innerHTML = "Fill out required labels to proceed (marked by asterisks). Italic labels are optional.";
        copyVisibility('hidden');
    }
}

function formListString(input, newlist) {
    var list = input.value.split(",");
    for (nation of list) {
        if (list[list.length - 1] != nation) newlist = newlist + "\"" + nation + "\", ";
        else newlist = newlist + "\"" + nation + "\"";
    }
    return newlist;
}

function copyOutput() {
    var output = document.getElementById("output-text");
    if (output.innerHTML.length < 87) return;
    navigator.clipboard.writeText(output.innerText);
}

function copyVisibility(text) {
    var copyButton = document.getElementById("copy-output");
    copyButton.style.visibility = text;
}
