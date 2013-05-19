
import sqlite3
import json

db = 'history.sqlite'
out = 'history.json'

def get_table(cursor, table):	
	c.execute('SELECT * FROM %s' % table)
	return c.fetchall()

def combine(a, b):
	a = map(lambda x: list(x), a)
	b = map(lambda x: list(x), b)

	for i in xrange(len(a)):
		for el in b[i]:
			a[i].append(el)

	return a

def _add_keys(keys, values):
	return map(lambda x: dict(zip(keys, x[:len(keys)])), values)

conn = sqlite3.connect(db)
c = conn.cursor()

times = get_table(c, 'info')
info = get_table(c, 'pages_content')

conn.close()

data = combine(times, info)
keys = ['time', 'id', 'url', 'title', 'body']

end = _add_keys(keys, data)

with open(out, 'w') as f:
	f.write(json.dumps(end))
