function isEmpty(value) {
	if (value.value.length == 0) return true;
	return false;
}

function updateFormable() {
	
	let output = document.getElementById('output-text'),
		name = document.getElementById('name'),
		canform = document.getElementById('canform'),
		required = document.getElementById('required'),
		exclusive = document.getElementById('exclusive'),
		buttonName = document.getElementById('button-name'),
		buttonDesc = document.getElementById('button-desc'),
		alertTitle = document.getElementById('alert-title'),
		alertDesc = document.getElementById('alert-desc'),
		alertButton = document.getElementById('alert-button'),
		flagLink = document.getElementById('flag-link');

	const canformlist = formListString(canform, ''),
		requiredlist = formListString(required, ''),
		exclusivelist = formListString(exclusive, '');


	if (!isEmpty(name) && !isEmpty(canform) && !isEmpty(required) && !isEmpty(buttonName) && !isEmpty(buttonDesc)) {

		copyVisibility('visible');
		output.innerHTML = 
		`{<br>&nbsp;&nbsp;&nbsp;&nbsp;FormableName = "${name.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;CountriesCanForm = {${canformlist}},
		<br>&nbsp;&nbsp;&nbsp;&nbsp;RequiredCountries = {${requiredlist}},
		<br>&nbsp;&nbsp;&nbsp;&nbsp;ExclusiveFormables = {${exclusivelist}},
		<br><br>&nbsp;&nbsp;&nbsp;&nbsp;FormableButton = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ButtonName = "${buttonName.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ButtonDescription = "${buttonDesc.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;},
		<br><br>&nbsp;&nbsp;&nbsp;&nbsp;CustomAlert = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title = "${isEmpty(alertTitle) ? '' : alertTitle.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desc = "${isEmpty(alertDesc) ? '' : alertDesc.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Button = "${isEmpty(alertButton) ? '' : alertButton.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>},${isEmpty(flagLink) ? '' : '<br><br>Flag URL: ' + flagLink.value}`;

		const isAlertVisible = (!isEmpty(alertTitle) || !isEmpty(alertDesc) || !isEmpty(alertButton));
		if (!isAlertVisible) output.innerHTML = output.innerHTML.replace(
			output.innerHTML.substring(output.innerHTML.indexOf('<br><br>&nbsp;&nbsp;&nbsp;&nbsp;CustomAlert'), 
			output.innerHTML.indexOf('<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>},') + 30), '');

	} else {
		output.innerHTML = 'Fill out required labels to proceed (marked by asterisks). Labels in italic are optional.';
		copyVisibility('hidden');
	}
}

function formListString(input, newlist) {
	for (const nation of input.value.split(',')) newlist = `${newlist}, "${nation.trim()}"`;
	return newlist.replace(', ', '');
}

function copyOutput() {
	const output = document.getElementById('output-text');
	if (output.innerHTML.length < 87) return;
	navigator.clipboard.writeText(output.innerText);
}

function copyVisibility(text) {
	document.getElementById('copy-output').style.visibility = text;
}

window.onload = function() {
	updateFormable();
	document.getElementById('copy-output').addEventListener('click', copyOutput);
};
