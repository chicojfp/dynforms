import { Observable } from "rxjs";
import { GenericDataSourceService } from "../generic-data-source.service";

export class GenericListComponent {
    constructor() {}

    ds: GenericDataSourceService;

    getList(): Observable<any> {
        console.log(this.ds.getData());
        return this.ds.getData();
    }

    public getId(value: any): any {
        return value['id'] || value;
    }

    public getDescription(value: any): any {
        return value['name'] || value;
    }
}