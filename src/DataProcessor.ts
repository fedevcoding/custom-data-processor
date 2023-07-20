export class DataProcessor<DataType> {
  private dataThreshold: number;
  private timeThreshold: number;
  private dataBuffer: DataType[];
  private dataTimer: NodeJS.Timeout | null;
  private dataCallback: (data: any) => void;

  constructor({
    dataCallback,
    dataThreshold,
    timeThreshold,
  }: {
    dataCallback: (data: DataType[]) => void;
    dataThreshold?: number;
    timeThreshold?: number;
  }) {
    this.dataThreshold = dataThreshold || 1000;
    this.timeThreshold = timeThreshold || 1000;
    this.dataBuffer = [];
    this.dataTimer = null;
    this.dataCallback = dataCallback;
  }

  public addData(data: DataType): void {
    this.dataBuffer.push(data);

    if (this.dataBuffer.length >= this.dataThreshold) {
      this.processData();
    }

    if (!this.dataTimer) {
      this.dataTimer = setTimeout(() => this.processData(), this.timeThreshold);
    }
  }

  private processData(): void {
    if (this.dataBuffer.length > 0) {
      const dataToSend = [...this.dataBuffer];
      this.dataBuffer = [];
      this.dataCallback(dataToSend);
    }

    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.dataTimer) {
      clearTimeout(this.dataTimer);
      this.dataTimer = null;
    }
  }
}
