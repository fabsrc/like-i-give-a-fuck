build:
	rm -Rf output certificates
	python ./kango/kango.py build ./

install:
	[ -d "./kango" ] && rm -r "./kango"
	mkdir -p kango && cd kango && \
	wget "http://kangoextensions.com/kango/kango-framework-latest.zip" && \
	unzip kango-framework-latest.zip -d . && \
	rm kango-framework-latest.zip