export const AppConstant = Object.freeze({
    GENDER: {
        MALE: "1",
        FEMALE: "2",
    },
    DDL_YES_NO: [
        {
            label: "Yes",
            labelId: true,
        },
        {
            label: "No",
            labelId: false,
        }
    ],
    TypeList: [
        { typeId: 1, type: 'School Hours' },
        { typeId: 2, type: 'Office Hours' },
        { typeId: 3, type: 'Period' }
    ],
    FeesCategory:[
        {typeId:1, typeName:'Tuition Fees'},
        {typeId:2, typeName:'Exam Fees'},
        {typeId:3, typeName:'Transportation Fees'}
    ],
    PaymentMethod:[
        {methodId:1, methodName:'Cash'},
        {methodId:2, methodName:'Check'},
        {methodId:3, methodName:'Online Payment'}
    ],
    FeesStatus:[
        {statusId:1, statusName:"Paid"},
        {statusId:2, statusName:"Pending"},
        {statusId:3, statusName:"Overdue"}
    ],
    ModeofTransport:[
        {modeId:1, modeName:"School Bus"},
        {modeId:2, modeName:"Public Transport"},
        {modeId:3, modeName:"Private Vehicle"}
    ],
    MISC_DETAIL:[]
});