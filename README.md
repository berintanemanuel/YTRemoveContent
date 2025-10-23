# YTRemoveContent
Chrome/Firefox extension that removes unwanted content from youtube:
-Shorts
-Videos containing unwanted words in their title

How to install: (Chrome)
1. Download zip on github and extract it to a directory on your computer.
2. In Chrome extensions manager, select "Load unpacked".
3. Select the directory you have extracted the project to. Done!

How to install: (Firefox)
1. Go to about:debugging and from the left go to "This Firefox"
2. In the "Temporary Extensions" section click "Load Temporary Add-on"
3. In the directory you have extracted the project select the "manifest.json" file. Done!

Shorts are removed by default, they can be enabled by commenting the disabling code in the file scripts/remove-shorts.js. Instruction are also provided in the specific file.

How to remove videos containing certain keywords in their title:
1. Go to data/keywords.json
2. The file is divided into groups. Each group has a boolean field "active" and a list of words that will be used if the group is active.
3. You can add as many new groups as you want. To add a new group, type a comma after the closing curly bracket of the last group name and
   add a new group following the pattern of "DEFAULT" (group name as the key, "active" and "words" as the two values).
4. In a group words list you can add as many words as you want. Words are considered case insensitive. A word can be in multiple active
   groups at the same time
5. Refresh the youtube page and you're done! 
(If it doesn't work, first try to refresh the extension in the extensions manager.)

How to remove videos from certain channels:
See tutorial for removing videos containing keywords in title (found above). Same procedure, but the file is "data/creators.json" and the creators should be written in the "creators" list of each group.
