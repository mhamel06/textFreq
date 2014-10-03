module.exports = function(req, res){
    var data = req.body;
    console.log('part one');
    outputData(data.one, 10, data.total);
    console.log('part two');
    outputData(data.two, 10, data.total);
    console.log('part three');
    outputData(data.three, 100, data.total);

    res.status(200);
}

function outputData(collection, rows, total){
  for(var i = 0; i<rows; i++){
    var out = (i+1) + '. ';
    if(collection[i]){
      out += collection[i].key + ' ' + collection[i].size + ' %' + (collection[i].size/total*100);
    }else{
      out += 'N/A';
    }
      console.log(out);
  }

}
