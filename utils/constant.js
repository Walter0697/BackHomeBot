exports.allowAddUserSetting = 'allowAddUser'

exports.helperMessage = `Here is the command that you can use: \n 
    /register : Use this to register your account to this application if you have not done it yet \n 
    /tell : I will ask you which weekday you wish to answer \n
    /display : Display All message in this week \n
    /upcoming : Show All message from now to the future
`


exports.userState = {
    SELECT_WEEK: 'SELECT_WEEK',
    TYPE_MESSAGE: 'TYPE_MESSAGE',
    SELECT_DATE: 'SELECT_DATE',
}

const Sun = 'Sun'
const Mon = 'Mon'
const Tue = 'Tue'
const Wed = 'Wed'
const Thu = 'Thu'
const Fri = 'Fri'
const Sat = 'Sat'

const weekdays = [
    Sun, Mon, Tue, Wed, Thu, Fri, Sat,
]
const weekNumReference = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
}
const selectDate = 'Select Date'

exports.options = {
    dayOfWeek: [
        weekdays, [ selectDate ],
    ],
    backHomeChoice: [[ '番', '唔番' ]],
}

exports.weekdays = weekdays
exports.selectDate = selectDate

exports.weekNumReference = weekNumReference