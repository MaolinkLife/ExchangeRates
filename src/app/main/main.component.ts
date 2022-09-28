import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    TrackByFunction,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
    BehaviorSubject,
    combineLatest,
    interval,
    map,
    Observable,
    switchMap,
    tap,
} from "rxjs";
import { ApiService } from "../api.service";
import { ExchangeDTOInterface } from "./exchange-dto.interface";

interface ExchangeViewInterface {
    name: string;
    value: number;
}

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
    counter$: BehaviorSubject<number> = new BehaviorSubject(
        0
    );

    formControl: FormControl = new FormControl(null);

    exchangeList$: Observable<ExchangeViewInterface[]> =
        new Observable();

    refreshUpdater$: BehaviorSubject<null> =
        new BehaviorSubject(null);

    trackByFn: TrackByFunction<ExchangeViewInterface> = (
        index: number,
        _item: ExchangeViewInterface
    ) => index;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.exchangeList$ = combineLatest([
            this.refreshUpdater$,
            interval(10000).pipe(
                tap(() => console.info("Сработал таймер"))
            ),
        ]).pipe(
            switchMap(() => this.apiService.getExchange$()),
            map((exchange: ExchangeDTOInterface) => {
                return Object.values(exchange.Valute).map(
                    (currency) => {
                        return {
                            name: currency.Name,
                            value: currency.Value,
                        };
                    }
                );
            })
        );
    }

    onRefreshExchange(): void {
        this.refreshUpdater$.next(null);
    }
}
