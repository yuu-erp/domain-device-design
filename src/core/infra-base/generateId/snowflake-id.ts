import { IdGenerator } from "src/core/domain/interfaces/id-generator.interface";

export class SnowflakeID implements IdGenerator<string> {
  private epoch: bigint; // Mốc thời gian gốc
  private machineId: bigint; // ID của máy chủ
  private sequence: bigint; // Số thứ tự
  private lastTimestamp: number; // Lưu timestamp cuối cùng được sử dụng

  constructor() {
    this.epoch = BigInt(1577836800000); // Epoch: 2020-01-01T00:00:00Z
    this.machineId = BigInt(1); // Machine ID (0 - 1023)
    this.sequence = BigInt(0); // Khởi tạo sequence là 0
    this.lastTimestamp = -1; // Khởi tạo timestamp
  }

  private getCurrentTimestamp(): number {
    return Date.now();
  }

  private waitNextMillisecond(currentTimestamp: number): number {
    while (currentTimestamp === this.lastTimestamp) {
      currentTimestamp = this.getCurrentTimestamp();
    }
    return currentTimestamp;
  }

  generateId(): string {
    let currentTimestamp = this.getCurrentTimestamp();

    if (currentTimestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + BigInt(1)) & BigInt(0xfff); // Sequence tối đa 12 bits (0-4095)

      if (this.sequence === BigInt(0)) {
        currentTimestamp = this.waitNextMillisecond(currentTimestamp);
      }
    } else {
      this.sequence = BigInt(0);
    }

    this.lastTimestamp = currentTimestamp;

    const timestampPart = (BigInt(currentTimestamp) - this.epoch) << BigInt(22); // 41 bits
    const machineIdPart = this.machineId << BigInt(12); // 10 bits
    const sequencePart = this.sequence; // 12 bits

    const snowflakeId = (
      timestampPart |
      machineIdPart |
      sequencePart
    ).toString();
    return snowflakeId;
  }
}
