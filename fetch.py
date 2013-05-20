
import os
import json
from history_locator import HistoryLocator

browser = 'chrome'

def get_hist_loc(browser, os_name=os.name):
    return history[os.name][browser]

history = HistoryLocator('history_locations.json')
history.get('chrome')

