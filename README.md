flist(path,cb)
==============
flist exports a single function which traverses the given directory and calls a `callback(err,files)`.
The path isn't fiddled with - if you tell it to traverse `..`, all the paths in the list will start with `../`.
