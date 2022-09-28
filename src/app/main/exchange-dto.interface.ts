/** С заглавной буквы, так как с сервера получаем именно в таком виде */
export interface ExchangeDTOInterface {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestam: string;
    Valute: Record<string, any>;
}
