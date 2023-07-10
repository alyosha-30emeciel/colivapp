import {format, parseISO, parseJSON} from "date-fns";
import {fr} from "date-fns/locale";

export const date_formatter = (v:string) => {
    try {
        const d = parseJSON(v)
        return format(d, 'P p', {locale: fr}) as string
    }
    catch (e) {
        return ""
    }

}