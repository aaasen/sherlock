
import sqlite3

db = 'history.sqlite'

def get_table(cursor, table):	
	c.execute('SELECT * FROM %s' % table)
	return c.fetchall()

conn = sqlite3.connect(db)
c = conn.cursor()

times = get_table(c, 'info')
info = get_table(c, 'pages_content')
info = map(lambda x: list(x), info)

for i in xrange(len(info)):
	info[i].append(times[i][0])

keys = ['id', 'url', 'title', 'body', 'time']

end = map(lambda x: dict(zip(keys, x[:len(keys)])), info)

print end

conn.close()
