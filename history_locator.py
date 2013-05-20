
import json
import os

class UnsupportedOSError(Exception):
    def __init__(self, locator, os_name):
        self.locator = locator
        self.os_name = os_name

    def __str__(self):
        return '%s is not a supported os; %s are supported' \
            % (self.os_name, self.locator._config.keys())

class UnsupportedBrowserError(Exception):
    def __init__(self, locator, browser, os_name):
        self.locator = locator
        self.browser = browser
        self.os_name = os_name

    def __str__(self):
        return '%s is not a supported browser; %s are supported' \
            % (self.browser, self.locator._config[self.os_name].keys())


class HistoryLocator:
    def __init__(self, config):
        with open(config, 'r') as f:
            self._config = json.loads(f.read())

    def get(self, browser, os_name=os.name):
        if os_name not in self._config.keys():
            raise UnsupportedOSError(self, os_name)
        
        if browser not in self._config[os_name].keys():
            raise UnsupportedBrowserError(self, browser, os_name)

        return self._config[os_name][browser]
