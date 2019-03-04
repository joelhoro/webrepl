

class CallbackState {
    constructor() {
        this.reset();
    }

    reset() {
        this.active = false;
        this._callback = undefined;
    }

    setCallback(cb) {
        this.active = true;
        this.activate();
        this._callback = cb;
    }

    activate() {

    }
    
    Callback(args) {
        if(!this.active)
            throw new Error("Can not use the callback on an inactive state");

        // reset first, the do the callback (but keep a copy of the callback otherwise it's gone)
        var callback = this._callback;
        this.reset();
        callback(args);
    }
}

export class TransferState extends CallbackState {
    static BINARYSTATE_IDLE = 0;
    static BINARYSTATE_PUT_INITIAL_RESPONSE = 11;
    static BINARYSTATE_PUT_FINAL_RESPONSE = 12;
    static BINARYSTATE_GET_INITIAL_RESPONSE = 21;
    static BINARYSTATE_GET_DATA_TRANSFER = 22;
    static BINARYSTATE_GET_FINAL_RESPONSE = 23;
    static BINARYSTATE_GET_VERSION = 31;
    
    constructor() {
        super();
        this.reset();
        this.put_file_name = null;
        this.put_file_data = null;
        this.get_file_name = null;
        this.get_file_data = null;
    }
    
    reset() {
        super.reset();
        this.binary_state = TransferState.BINARYSTATE_IDLE;
    }
}

export class ServiceMessageState extends CallbackState {
    constructor() {
        super();
        this.reset();
    }
    
    reset() {
        super.reset();
        this.Response = "";
        this.ViewOutput = false;
    }
}

