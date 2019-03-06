export var RESETMACHINE = 'import time, machine; print("Resetting..."); time.sleep(1); machine.reset()'
export var GETDIRECTORY = "_cwd = os.getcwd(); [ [_cwd+'/'+f,list(os.stat(f))] for f in os.listdir() ]";
export var STARTUPDEFINITIONS = `
import os, time, sys

def execute_file(file_name, tmp_file, globals_copy, locals_copy):
    text = open(file_name).read()
    # removing the file before anything bad can happen
    if tmp_file:
           os.remove(file_name)

    banner = "\x1b[92m====== FILE ==========    %s    ============================="
    print(banner % file_name)
    print(text + '\x1b[m')
    banner2 = "\x1b[94m====== OUTPUT ======"
    print(banner2, end='')
    print("=" * ( len(banner) - 2 + len(file_name) - len(banner2) ) )
    try:
        start_time = time.ticks_us()
        exec(text, globals_copy, locals_copy)
        end_time = time.ticks_us()
        print('\x1b[m')
        print("\x1b[93m=== %.3fms elapsed\x1b[m" % ((end_time-start_time)/1000.0))
    except Exception as e:
        print("\x1b[31;1mCould not run %s: %s\x1b[m" % (file_name,e))
    
print("Initialization completed")
`

var STARTUP_MODULE = "_webrepl_utils";
export var STARTUP_FILE = "/" + STARTUP_MODULE;

export var TMPFILENAME = `/_tmpScratch.py`;


export function executeFileCommand(fileName, deleteFile) {
    return `import ${STARTUP_MODULE}; ${STARTUP_MODULE}.execute_file('${fileName}',${deleteFile},globals(),locals())`
}