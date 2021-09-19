// Your code here
 function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, workedDate) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === workedDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === workedDate
    })

    return (outEvent.hour - inEvent.hour) / 100

}

function wagesEarnedOnDate(employee, workedDate) {
    let wage = hoursWorkedOnDate(employee, workedDate) * employee.payPerHour
    return wage
}

function allWagesFor(employee) {
    let workedDates = employee.timeInEvents.map (function(e){
        return e.date
    })

    let totalWage = workedDates.reduce(function(memo, e){
        return memo + wagesEarnedOnDate(employee, e)
    }, 0)

    return totalWage
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, e){
        return memo + allWagesFor(e)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstname) {
    return srcArray.find(function(e){
        return e.firstName === firstname
    })
}