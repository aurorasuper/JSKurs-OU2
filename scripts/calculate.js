/**
 * @author Susan Kronberg
 * @version V1.0
 */

const table = document.getElementById("pricetable");
const contentContainer = document.getElementById("content");
const thead = table.children[0];
const tbody = table.children[1];

/**
 * Restricts input type to positive integers
 * To create a better user experience
 */
const inputTypetoNumber = () => {
	const inputs = document.getElementsByTagName("input");

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].type = "number";
		inputs[i].min = 0;
		inputs[i].value = 0;

		inputs[i].style.width = "50%";
		inputs[i].parentElement.style.width = "15%";
	}
};

/**
 * Creates sum column for all elements in table
 */
const createSumColumn = () => {
	// add sum column to table head
	let headRow = thead.children[0];
	let headRowSum = document.createElement("th");
	let sumtext = document.createTextNode("Summa");
	headRowSum.appendChild(sumtext);
	headRow.appendChild(headRowSum);

	// add empty sum column for each row in table body
	for (let i = 0; i < tbody.children.length; i++) {
		let tr = tbody.children[i];
		let sumColumn = document.createElement("td");
		tr.appendChild(sumColumn);
	}
};

/**
 * Add a row to table
 */
const addRowToTable = (id) => {
	let tailSumRow = document.createElement("tr");
	//add initial empty td for columns with no values
	for (let i = 0; i < 6; i++) {
		let paddingTd = document.createElement("td");
		tailSumRow.appendChild(paddingTd);
	}

	tailSumRow.id = id;
	tbody.appendChild(tailSumRow);
};

/**
 * Get the last row as an object containing DOM elements for easy access.
 * @returns Object with DOM elements for the amount and sum columns
 */
const getLastRowObject = () => {
	let DOMrow = document.getElementById("sumrow");
	let rowObj = {
		amount: DOMrow.children[DOMrow.children.length - 2],
		sum: DOMrow.children[DOMrow.children.length - 1],
	};
	return rowObj;
};

/**
 * Add a button to the end of the content container
 * @returns
 */
const addButton = (text) => {
	let newBtn = document.createElement("button");
	let btnText = document.createTextNode(text);
	newBtn.appendChild(btnText);
	newBtn.classList.add("btn");
	newBtn.classList.add("btn-primary");
	contentContainer.appendChild(newBtn);
	return newBtn;
};

/**
 * Get all table entries as an array of objects, where each row is an element in the array,
 * and each column in a row is key-value pair in that element.
 * @returns
 */
const getTableValues = () => {
	let tableEntries = [];
	for (let i = 0; i < tbody.children.length - 1; i++) {
		let element = {};
		let row = tbody.children[i].children;
		element.idNr = row[0].innerText;
		element.productType = row[1].innerText;
		element.brand = row[2].innerText;
		element.price = parseInt(row[3].innerText);

		// read user input value
		element.amount = parseInt(row[4].getElementsByTagName("input")[0].value);

		// store the DOM element for easy access later
		element.sum = row[5];

		tableEntries.push(element);
	}
	return tableEntries;
};

// call all functions
inputTypetoNumber();
createSumColumn();
addRowToTable("sumrow");
const calculateBtn = addButton("Beräkna pris");

/**
 * When user clicks on button:
 * 1. Calculate and show sum for each row given the user input
 * 2. calculate and show total amound of items and total sum of items in last row
 */
calculateBtn.addEventListener("click", () => {
	let totalSum = 0;
	let totalAmount = 0;
	let tableEntries = getTableValues();

	tableEntries.forEach((element) => {
		let amount = element.amount;
		let price = element.price;
		let sum = amount * price;
		element.sum.innerHTML = sum;
		totalSum += sum;
		totalAmount += amount;
	});

	let lastRow = getLastRowObject();
	lastRow.amount.innerHTML = totalAmount;
	lastRow.sum.innerHTML = totalSum;

	console.log(tableEntries);
});
