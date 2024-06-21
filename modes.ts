interface Mode {
    name: string
    value: any
}

enum CreatedModes {}

let currentMode = ""
let currentModeVal: null
let _modes: Mode[] = [];
let deb = false

//% color="#0099DB" icon="\uf013"
namespace modes {

    /**
    * Creates a new mode
    */
    //% block="create mode $mode || with value $msg?"
    //% mode.defl="mode1"
    //% msg.defl=""
    //% group="Declares"
    export function addMode(mode: string, msg?: any) {
        const setMode: Mode = { name: mode, value: msg };

        let index = -1;

        for (let i = 0; i < _modes.length; i++) {
            if (_modes[i].name === setMode.name) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            _modes.push(setMode);
        }
    }

    /**
    * Sets the current mode
    */
    //% block="set mode to $mode || and set value to $msg?"
    //% mode.defl="mode1"
    //% group="Declares"
    
    export function setMode(mode: string, msg?: any) {
        let setMode: Mode = { name: mode, value: msg };

        let index = -1;

        for (let i = 0; i < _modes.length; i++) {
            if (_modes[i].name === setMode.name) {
                index = i;
                deb = false
                currentMode = setMode.name
                currentModeVal = msg
                break;
            }
        }
    }

    //% block="print all modes"
    //% x.defl=var
    //% x.shadow=variables_get
    //% group="Declares"
    export function logModes(): void {
        for (let i = 0; i < _modes.length; i++) {
            console.log("mode : '" + _modes[i].name+"'")
        }
    }

    /**
     * A function that seperately manages all the modes
     * (note: this isn't necessary to use modes, this block
     * is only to keep your code looking nice.)
     */
    //% block="seperately manage modes"
    //% group="Events"
    export function handle(thenDo: () => void) {
        control.runInBackground(thenDo)
    }

    //% block="when mode changed to $mode with $value"
    //% mode.defl="mode1"
    //% group="Events"
    //% draggableParameters="rcmsg"
    export function whenModeChanged(mode: string, thenDo: (value: any) => void) {
        
        function run() {
            game.onUpdateInterval(1, function () {
                if (currentMode == mode) {
                    if (deb == false) {
                        deb = true
                        thenDo(currentModeVal)
                    }
                }
            })
        }
        control.runInParallel(run)
    }

    //% block="current mode"
    //% group="Other"
    export function getCurrentMode(): any {
        return currentMode
    }

    //% block="get mode $mode value"
    //% group="Other"
    export function getValueOfMode(mode: string): any {
        let foundMode = _modes.find(specMode => specMode.name === mode);
        if (foundMode) { 
            return foundMode.value
        }
    }
}