import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {

    loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {}

    public setLoader(flag: boolean): void {
        this.loading$.next(flag);
    }
}
