var async=require('async');
var fs=require('fs');
var path=require('path');

module.exports=traverse;
function traverse(base,cb){
    fs.stat(base,function(err,stats){
        if(err) return cb(err,null);
        if(stats.isFile()) return cb(null,[base]);
        if(stats.isDirectory()){
            return fs.readdir(base,function(err,items){
                if(err) return cb(err,null);
                items=items.map(function(item){
                    return path.join(base,item);
                });
                async.map(items,traverse,function(err,items){
                    if(err) return cb(err,null);
                    if(items.length) items=items.reduce(function(a,b){
                        return a.concat(b);
                    });
                    cb(null,items);
                });
            });
        }
        cb(null,[]);
    });
}
