export class Queue {
  storage: Record<number, number>;
  head: number;
  tail: number;
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item: number) {
    this.storage[this.tail] = item;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;
    return item;
  }

  front() {
    return this.isEmpty() ? null : this.storage[this.head];
  }

  isEmpty() {
    return this.tail === this.head;
  }

  size() {
    return this.tail - this.head;
  }
}
