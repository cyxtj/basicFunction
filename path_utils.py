#coding=utf8
# authored by jiangshen

import sys
import os

def curr_script_dir():
    path = sys.path[0]

    if os.path.isdir(path):
        return path
    elif os.path.isfile(path):
        return os.path.dirname(path)
    
if __name__ == '__main__':
    print curr_script_dir() 
