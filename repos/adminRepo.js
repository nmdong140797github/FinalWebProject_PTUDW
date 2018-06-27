var db = require('../fn/db');
var categoryRepo=require('./categoryRepo'),
    productRepo=require('./productRepo'),
    producerRepo=require('./producerRepo');


exports.requestReport = () => {
    var p1=productRepo.countProduct();
    var p2=producerRepo.countProducer();
    var p3=categoryRepo.countCategory();

    Promise.all([p1, p2, p3]).then(([countProduct,countProducer,countCategory]) => {
        var table={

        }
    });
    
}