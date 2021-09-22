const accountRouter = require('./routes');
const postRouter= require('./post');
const imageRouter=require('./image')

function route(app){
    app.use('/accounts',accountRouter);
    app.get('/test',function(req, res){
        res.json('ALoha')
    })

    app.use('/post',postRouter);
    app.use('/img',imageRouter);
}
module.exports=route