import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ExchangeDTOInterface } from "./main/exchange-dto.interface";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    getExchange$(): Observable<ExchangeDTOInterface> {
        return this.httpClient
            .get<ExchangeDTOInterface>(
                `https://www.cbr-xml-daily.ru/daily_json.js`
            )
            .pipe(
                map((a) => {
                    return a;
                })
            );
    }
}
