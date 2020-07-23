#!/bin/bash
dirnum=`tail -1 .legit/logfile | cut -d' ' -f 1`
for file in `ls .legit/index`
do
	if [ ! -f .legit/commit/$dirnum/$file ]
	then
		if [ -f $file ]
		then
			echo "$file - added to index" >>status
			continue
		fi
	else 
		if [ ! -f $file ]
		then
			echo "$file - file deleted" >>status
			continue
		fi
	fi
	if [ -f $file ] && [ -f .legit/commit/$dirnum/$file ]
	then
		diff .legit/commit/$dirnum/$file .legit/index/$file > /dev/null 
		if [ $? != 0 ]
		then
			pdic=0
		else
			pdic=1
		fi
		diff $file .legit/index/$file > /dev/null
		if [ $? != 0 ]
		then
			pdir=0
		else
			pdir=1
		fi
		if [ $pdic == 0 ] && [ $pdir == 0 ]
		then
			echo "$file - file changed, different changes staged for commit" >>status
		fi
		if [ $pdic == 0 ] && [ $pdir == 1 ]
		then
			echo "$file - file changed, changes staged for commit" >>status
		fi
		if [ $pdic == 1 ] && [ $pdir == 0 ]
		then
			echo "$file - file changed, changes not staged for commit" >>status
		fi
		if [ $pdic == 1 ] && [ $pdir == 1 ]
		then
			echo "$file - same as repo" >>status
		fi
	fi
done
for file in `ls`
do
	if [ ! -f .legit/index/$file ] && [ $file != "status" ]
	then
		echo "$file - untracked" >>status
	fi
done
for file in `ls .legit/commit/$dirnum`
do
	if [ ! -f $file ] && [ ! -f .legit/index/$file ] 
	then
		echo "$file - deleted" >>status
	fi
done
cat status|sort status
rm status
	