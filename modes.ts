//  || and set value to $msg?
//% color="#0099DB" icon="\uf013"
namespace modes {

    let currentMode: number = modes.mode(0)
    let deb = false

    
    /**
    * Sets the current mode
    */
    //% block="set mode to $mode"
    //% group="Declares"
    //% mode.shadow="color_enum_shim"
    export function setMode(mode: number) {
        deb = false
        currentMode = mode
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
    //% mode.shadow="color_enum_shim"
    //% group="Events"
    //% draggableParameters="rcmsg"
    export function whenModeChanged(mode: number, thenDo: () => void) {
        
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

    //% shim=ENUM_GET
    //% blockId=color_enum_shim
    //% block="$arg"
    //% enumName="Mode"
    //% enumMemberName="mode"
    //% enumInitialMembers="mode1"
    //% enumPromptHint="Enter your mode name here..."
    //% blockHidden=1
    /**
     * Method that returns mode
     */
    export function mode(arg: number) {
        return arg;
    }
}