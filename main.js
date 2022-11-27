function isEmpty(value) {
	if (value.value.replaceAll(' ', '').length == 0) return true;
	return false;
}

function updateFormable() {
	
	const output = document.getElementById('output-text'),
		name = document.getElementById('name'),
		canform = document.getElementById('canform'),
		required = document.getElementById('required'),
		tiles = document.getElementById('tiles'),
		exclusive = document.getElementById('exclusive'),
		buttonName = document.getElementById('button-name'),
		buttonDesc = document.getElementById('button-desc'),
		alertTitle = document.getElementById('alert-title'),
		alertDesc = document.getElementById('alert-desc'),
		alertButton = document.getElementById('alert-button'),
		stabilityGain = document.getElementById('stability-gain'),
		flagLink = document.getElementById('flag-link'),

		canformlist = formListString(canform, ''),
		requiredlist = formListString(required, ''),
		tilelist = formListString(tiles, ''),
		exclusivelist = formListString(exclusive, '');


	if (!isEmpty(name) && !isEmpty(canform) && !isEmpty(required) && !isEmpty(buttonName) && !isEmpty(buttonDesc)) {

		copyVisibility('visible');
		const isAlertVisible = (!isEmpty(alertTitle) || !isEmpty(alertDesc) || !isEmpty(alertButton));
		output.innerHTML = 
		`{<br>&nbsp;&nbsp;&nbsp;&nbsp;FormableName = "${name.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;CountriesCanForm = {${canformlist}},
		<br>&nbsp;&nbsp;&nbsp;&nbsp;RequiredCountries = {${requiredlist}},
		${isEmpty(tiles) ? '' : `<br>&nbsp;&nbsp;&nbsp;&nbsp;RequiredTiles = {${tilelist}},`}
		${isEmpty(exclusive) ? '' : `<br>&nbsp;&nbsp;&nbsp;&nbsp;ExclusiveFormables = {${exclusivelist}},`}
		<br><br>&nbsp;&nbsp;&nbsp;&nbsp;FormableButton = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ButtonName = "${buttonName.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ButtonDescription = "${buttonDesc.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;},
		${!isAlertVisible ? '' : `<br><br>&nbsp;&nbsp;&nbsp;&nbsp;CustomAlert = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title = "${isEmpty(alertTitle) ? '' : alertTitle.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desc = "${isEmpty(alertDesc) ? '' : alertDesc.value}",
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Button = "${isEmpty(alertButton) ? '' : alertButton.value}",<br>&nbsp;&nbsp;&nbsp;&nbsp;},`}
		${isEmpty(stabilityGain) ? '' : `<br><br>&nbsp;&nbsp;&nbsp;&nbsp;CustomAttributes = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;["Stability_Gain"] = ${stabilityGain.value},
		<br>&nbsp;&nbsp;&nbsp;&nbsp;},`}
		<br>},${isEmpty(flagLink) ? '' : '<br><br>Flag URL: ' + flagLink.value}`;

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
