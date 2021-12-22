export class Observable<T> {
  observers: Array<Function> = [];

  subscribe(observer: Function) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Function) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  unsubscribeAll() {
    this.observers = [];
  }

  publish(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}
