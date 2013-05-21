
import os
import json
import glob

import sqljson
from history_locator import HistoryLocator

def json_dumpf(data, filename):
    with open(filename, 'w') as f:
        f.write(json.dumps(data))   

browser = 'chrome'

history = HistoryLocator('history_locations.json')
history_dir = history.get('chrome')
dbs = glob.glob(os.path.expanduser('%sHistory Index *-[0-9][0-9]' % history_dir))

out = 'history.json'
tables = ['info', 'pages_content']
keys = ['time', 'id', 'url', 'title', 'body']

jsons = map(lambda x: sqljson.sqlite_to_json(x, tables, keys), dbs)
combined = reduce(lambda x, y: x + y, jsons)

json_dumpf(combined, out)
