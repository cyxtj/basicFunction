#coding=utf8

import syspath_config
from veterans.main import veteransApp


if __name__ == '__main__':
    veteransApp.run(host="0.0.0.0", port=8008, debug=True)
