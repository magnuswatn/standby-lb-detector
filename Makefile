
ZIP = standby-lb-detector.zip
SOURCE_FILES = manifest.json background.js contentScript.js contentScriptLoginPage.js standby-lb-detector-css.css icon64.png icon128.png

# Target name is expand to assist zsh autocomplete.
standby-lb-detector: $(SOURCE_FILES)
	echo $(SOURCE_FILES)
	rm -rf $(ZIP)
	zip $(ZIP) $(SOURCE_FILES)

.PHONY: clean
clean:
	rm $(ZIP)
