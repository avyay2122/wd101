let loginForm = document.getElementById("login-form");
const dinput = document.getElementById("dob");

dinput.addEventListener('input', (event) => {
  const date = new Date(event.target.value);
  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  const month = now.getMonth() - date.getMonth();
  const datem = now.getDate() - date.getDate();
  if (month<0){
    age--;
  }
  if (datem<0){
    age--;
  }

  if (age < 18 || age > 55) {
    dinput.setCustomValidity(
      "Please enter a valid date of birth between ages 18 and 55."
    );
  } else {
    dinput.setCustomValidity("");
  }
});

const getDetails = () => {
  let storedDetails = localStorage.getItem("user-details");
  if (storedDetails) {
    storedDetails = JSON.parse(storedDetails);
  } else {
    storedDetails = [];
  }
  return storedDetails;
};
let storedData = getDetails();

const showDetails = () => {
  const details = getDetails();
  const tableEntries = details.map((entry) => {
      const nameCell = `<td>${entry.name}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const acceptTermsCell = `<td>${entry.tc}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    }).join("\n");

  const tablee = 
  `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dob</th>
            <th>Accepted terms?</th>
        </tr>${tableEntries}
    </table>`;

  let userDetails = document.getElementById("user-entries");
  userDetails.innerHTML = tablee;
};

const saveForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const tc = document.getElementById("tc").checked;
  const newData = {
    name,
    email,
    password,
    dob,
    tc,
  };
  storedData.push(newData);
  localStorage.setItem("user-details", JSON.stringify(storedData));
  showDetails();
};

loginForm.addEventListener("submit", saveForm);

showDetails();
