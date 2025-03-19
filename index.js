// Create an employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create multiple employee records from an array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Create a Time-In event
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    });
    return employee;
}

// Create a Time-Out event
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    });
    return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    if (!timeIn || !timeOut) return 0;

    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Calculate total wages for an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

// Calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

// Example Usage
const employees = createEmployeeRecords([
    ["Alice", "Smith", "Engineer", 25],
    ["Bob", "Jones", "Technician", 20]
]);

createTimeInEvent(employees[0], "2025-03-19 0800");
createTimeOutEvent(employees[0], "2025-03-19 1600");

createTimeInEvent(employees[1], "2025-03-19 0900");
createTimeOutEvent(employees[1], "2025-03-19 1700");

console.log("Alice's Hours Worked:", hoursWorkedOnDate(employees[0], "2025-03-19")); // 8
console.log("Alice's Wages Earned:", wagesEarnedOnDate(employees[0], "2025-03-19")); // 200
console.log("Bob's Total Wages:", allWagesFor(employees[1])); // 160
console.log("Total Payroll:", calculatePayroll(employees)); // 360

