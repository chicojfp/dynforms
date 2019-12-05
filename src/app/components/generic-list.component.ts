import { Observable } from "rxjs";
import { GenericDataSourceService } from "../generic-data-source.service";

export class GenericListComponent {
    constructor() {}

    ds: GenericDataSourceService;

    getList(): Observable<any> {
        const data = this.ds.getData();
        // console.log(data);
        return data;
    }

    public getId(value: any): any {
        return value['id'] || value;
    }

    public getDescription(value: any): any {
        return value['name'] || value;
    }
}