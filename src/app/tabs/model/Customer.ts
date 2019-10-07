export class Customer {
    id: number;
    start: string;
    type: string;
    sex: string;
    name: string;
    firstname: string;
    adress: string;
    cp: string;
    city: string;
    fixe: string;
    phone: string;
    office: string;
    fax: string;
    others: string;
    resident: string;
    activity: string;
    origin: string;
    age: string;
    water: string;
    machine: string;
    soft: string;
    infos: string;
    tarif: string;
    model: string;
    invoice: string;
    active: number;
    last: string;
    period: number;
    next: string;
    constructor() {
        this.last = Customer.convertDate(new Date());
        this.period = 0;
        this.active = 1;
    }

    public static convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
    }

    public static addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }
}