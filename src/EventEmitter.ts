type EventHandler = (...args: any[]) => void;
type HandlerInfo = {once: boolean, handler: EventHandler};

export class EventEmitter {
    private _handlers: Map<string, HandlerInfo[]> = new Map();

    public on(eventKey: string, handler: EventHandler, once: boolean = false): void {
        if (!this._handlers.has(eventKey)) {
            this._handlers.set(eventKey, []);
        }

        this._handlers.get(eventKey).push({handler, once});
    }

    public emit(eventKey: string, ...args: any[]): void {
        if (!this._handlers.has(eventKey)) return;

        const handlers = this._handlers.get(eventKey);

        handlers.forEach(info => {
            info.handler(...args);
        });
        for (let i = handlers.length - 1; i >= 0; i--) {
            if (handlers[i].once) {
                handlers.splice(i, 1);
            }
        }
    }
}