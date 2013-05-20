
import random
import unittest
from history_locator import *

class TestHistoryLocator(unittest.TestCase):
    def setUp(self):
        self.hist = HistoryLocator('history_locations.json')

    def test_get_invalid_os(self):
        self.assertRaises(UnsupportedOSError, self.hist.get, 'chrome', os_name='asdfkjdsafdsaf')

    def test_get_invalid_browser(self):
        self.assertRaises(UnsupportedBrowserError, self.hist.get, 'asdfasdf3isj')

if __name__ == '__main__':
    unittest.main()
