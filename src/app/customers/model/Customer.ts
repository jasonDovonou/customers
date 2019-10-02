export class Customer {
    id: number;
    name: string;
    firstname: string;
    cp: string;
    city: string;
    number: string;
    phone: string;
    office: string;
    other: string;
    last: string;
    period: number;
    next: string;
    constructor() {
        this.name = '';
        this.firstname = '';
        this.cp = '';
        this.city = '';
        this.number = '';
        this.phone = '';
        this.office = '';
        this.other = '';
        this.last = Customer.convertDate(new Date());
        this.period = 0;
        this.next = '';
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