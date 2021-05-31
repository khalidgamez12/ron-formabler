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

        output.innerHTML = "{<br>    FormableName = \"{0}\",<br>    CountriesCanForm = {{1}},<br>    RequiredCountries = {{2}},<br>    ExclusiveFormables = {{3}},<br><br>    FormableButton = {<br>        ButtonName = \"{4}\",<br>        ButtonDescription = \"{5}\",<br>    },<br><br>    CustomAlert = {<br>        Title = \"{6}\",<br>        Desc = \"{7}\",<br>        Button = \"{8}\",<br>    },<br>},{9}".format(name.value, canformlist, requiredlist, exclusivelist, buttonName.value, buttonDesc.value, isEmpty(alertTitle) ? "" : alertTitle.value, isEmpty(alertDesc) ? "" : alertDesc.value, isEmpty(alertButton) ? "" : alertButton.value, isEmpty(flagLink) ? "" : "<br><br>Flag link: " + flagLink.value);

        isAlertVisible = (!isEmpty(alertTitle) || !isEmpty(alertDesc) || !isEmpty(alertButton));
        if (!isAlertVisible) output.innerHTML = output.innerHTML.replace(output.innerHTML.substring(output.innerHTML.indexOf("<br><br>    CustomAlert"), output.innerHTML.indexOf("<br>    },<br>},") + 6), "");

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
