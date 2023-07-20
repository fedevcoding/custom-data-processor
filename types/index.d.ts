declare module "js-data-processor" {
  export class DataProcessor<DataType> {
    constructor(options: {
      dataCallback: (data: DataType[]) => void;
      dataThreshold?: number;
      timeThreshold?: number;
    });
    public addData(data: DataType): void;
  }
}
