
import sqlite3
import json

db = 'history.sqlite'
out = 'history.json'

def _get_table(cursor, table):	
	cursor.execute('SELECT * FROM %s' % table)
	return cursor.fetchall()

def _combine(tables):
	tables = map(lambda x: map(lambda y: list(y), x), tables)

	for table in tables[1:]:
		for i in xrange(len(tables[0])):
			for el in table[i]:
				tables[0][i].append(el)

	return tables[0]

def _add_keys(keys, values):
	return map(lambda x: dict(zip(keys, x[:len(keys)])), values)

def json_dumpf(data, filename):
	with open(filename, 'w') as f:
		f.write(json.dumps(data))	

def sqlite_to_json(db_name, tables, keys):
	if type(tables) != list:
		tables = [tables]

	conn = sqlite3.connect(db)
	c = conn.cursor()
	tables = map(lambda x: _get_table(c, x), tables)
	conn.close()

	data = _combine(tables)
	data = _add_keys(keys, data)

	return data

tables = ['info', 'pages_content']
keys = ['time', 'id', 'url', 'title', 'body']

data = sqlite_to_json(db, tables, keys)

json_dumpf(data, out)
