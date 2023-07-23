import {format, parseJSON} from "date-fns";
import {fr} from "date-fns/locale";
import CountUp from "react-countup";

export const date_formatter = (v:string) => {
    try {
        const d = parseJSON(v)
        return format(d, 'P p', {locale: fr}) as string
    }
    catch (e) {
        return ""
    }

}
export const stat_formatter = (value: any) => <CountUp end={value} decimals={0}/>;
export const stat_with_decimal_formatter = (value: any) => <CountUp end={value} separator="," decimals={2}/>;