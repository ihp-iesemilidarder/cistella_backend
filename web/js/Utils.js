// This class is responsible of the dates' operators, increment y decrements dates 
export class DateOperators {
    constructor() {
        this.date = new Date();
        this.dateOperator = [ // get current date
            parseInt(this.date.getFullYear()),
            parseInt(this.date.getMonth()),
            parseInt(this.date.getDate()),
            parseInt(this.date.getHours()),
            parseInt(this.date.getMinutes()),
            parseInt(this.date.getSeconds()),
            parseInt(this.date.getMilliseconds())
        ];
    }

    increment(Year = Number, Month = Number, Day = Number, Hour = Number, Minute = Number, Seconds = Number, MSeconds = Number) {
        let params = [Year, Month, Day, Hour, Minute, Seconds, MSeconds];
        for (let x = 0; x <= this.dateOperator.length - 1; x++) {
            (params[x] == -1) ? this.dateOperator[x] = 0 : this.dateOperator[x] += params[x];
        }
        return new Date(this.dateOperator[0], this.dateOperator[1], this.dateOperator[2], this.dateOperator[3], this.dateOperator[4], this.dateOperator[5], this.dateOperator[6]);
    }

    decrement(Year = Number, Month = Number, Day = Number, Hour = Number, Minute = Number, Seconds = Number, MSeconds = Number) {
        let params = [Year, Month, Day, Hour++, Minute, Seconds, MSeconds];
        for (let x = 0; x <= this.dateOperator.length - 1; x++) {
            (params[x] == -1) ? this.dateOperator[x] = 0 : this.dateOperator[x] -= params[x];
        }
        return new Date(this.dateOperator[0], this.dateOperator[1], this.dateOperator[2], this.dateOperator[3], this.dateOperator[4], this.dateOperator[5], this.dateOperator[6]);
    }
}

export const getCookie=(name)=>{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}