interface Mode {
    name: string
}

let currentMode = ""
let _modes: Mode[] = [];
let deb = false

//% color="#f0483c" icon="\uf013"
//% groups="['Other', 'Events', 'Declares']"
namespace modes {

    /**
    * Creates a new mode
    */
    //% block="create mode $mode"
    //% mode.defl=""
    //% group="Declares"
    export function addMode(mode: string) {
        const setMode: Mode = { name: mode };

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
    //% block="set mode to $mode"
    //% mode.defl=""
    //% group="Declares"
    export function setMode(mode: string) {
        let setMode: Mode = { name: mode };

        let index = -1;

        for (let i = 0; i < _modes.length; i++) {
            if (_modes[i].name === setMode.name) {
                index = i;
                deb = false
                currentMode = setMode.name
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

    //% block="when mode changed to $mode"
    //% mode.defl=""
    //% group="Events"
    export function whenModeChanged(mode: string, thenDo: () => void) {
        function run() {
            game.onUpdateInterval(1, function () {
                if (currentMode == mode) {
                    if (deb == false) {
                        deb = true
                        thenDo()
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
}