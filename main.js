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


    if (!isEmpty(name) && !isEmpty(canform) && !isEmpty(required) && !isEmpty(buttonName) && !isEmpty(buttonDesc)) {

        copyVisibility('visible');

        output.innerHTML = "{<br>&nbsp;&nbsp;&nbsp;&nbsp;FormableName = \"{0}\",<br>&nbsp;&nbsp;&nbsp;&nbsp;CountriesCanForm = {{1}},<br>&nbsp;&nbsp;&nbsp;&nbsp;RequiredCountries = {{2}},<br>&nbsp;&nbsp;&nbsp;&nbsp;ExclusiveFormables = {{3}},<br><br>&nbsp;&nbsp;&nbsp;&nbsp;FormableButton = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ButtonName = \"{4}\",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ButtonDescription = \"{5}\",<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br><br>&nbsp;&nbsp;&nbsp;&nbsp;CustomAlert = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title = \"{6}\",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desc = \"{7}\",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Button = \"{8}\",<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>},{9}".format(name.value, canformlist, requiredlist, exclusivelist, buttonName.value, buttonDesc.value, isEmpty(alertTitle) ? "" : alertTitle.value, isEmpty(alertDesc) ? "" : alertDesc.value, isEmpty(alertButton) ? "" : alertButton.value, isEmpty(flagLink) ? "" : "<br><br>Flag link: " + flagLink.value);

        isAlertVisible = (!isEmpty(alertTitle) || !isEmpty(alertDesc) || !isEmpty(alertButton));
        if (!isAlertVisible) output.innerHTML = output.innerHTML.replace(output.innerHTML.substring(output.innerHTML.indexOf("<br><br>&nbsp;&nbsp;&nbsp;&nbsp;CustomAlert"), output.innerHTML.indexOf("<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>},") + 31), "");

    } else {
        output.innerHTML = "Fill out required labels to proceed (marked by asterisks). Labels in italic are optional.";
        copyVisibility('hidden');
    }
}

function formListString(input, newlist) {
    for (nation of input.value.split(",")) newlist = "{0}, \"{1}\"".format(newlist, nation.trim());
    return newlist.replace(", ", "");
}

function copyOutput() {
    var output = document.getElementById("output-text");
    if (output.innerHTML.length < 87) return;
    navigator.clipboard.writeText(output.innerText);
}

function copyVisibility(text) {
    document.getElementById("copy-output").style.visibility = text;
}

window.onload = function() {
    updateFormable();
    document.getElementById("copy-output").addEventListener("click", copyOutput);
};
