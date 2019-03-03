export var RESETMACHINE = 'import time, machine; print("Resetting..."); time.sleep(1); machine.reset()'
export var GETDIRECTORY = "_cwd = os.getcwd(); [ [_cwd+'/'+f,list(os.stat(f))] for f in os.listdir() ]";
export var STARTUPDEFINITIONS = `
import os, time, sys

def execute_file(file_name, tmp_file, globals, locals):
    text = open(file_name).read()
    # removing the file before anything bad can happen
    if tmp_file:
           os.remove(file_name)

    banner = "========================    %s    ========================"
    print(banner % file_name)
    print(text)
    print("=" * ( len(banner) - 2 + len(file_name) ) )
    try:
        start_time = time.ticks_us()
        exec(text, globals, locals)
        end_time = time.ticks_us()
        print("=== %.3fms elapsed" % ((end_time-start_time)/1000.0))
    except Exception as e:
        print("Could not run %s: %s" % (file_name,e))

print("Initialization completed")
`

var STARTUP_MODULE = "_webrepl_utils";
export var STARTUP_FILE = "/" + STARTUP_MODULE;

export var TMPFILENAME = `/_tmpScratch.py`;


export function executeFileCommand(fileName, deleteFile) {
    return `import ${STARTUP_MODULE}; ${STARTUP_MODULE}.execute_file('${fileName}',${deleteFile},globals(),locals())`
}