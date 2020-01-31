const Trades = require('../../models/trades.js');



exports.trades = async (req, res, next) => {
    try {
        const trades = await Trades.findAll({});  

        
       // console.log(trades);
    res.status(200).json({
        data: trades
        //price,
        //volume
        
        });
        //console.log(trades);
    } catch (error) {
        // next(error)
        //console.log(error);
        return res.status(400).send({ error: 'Error finding trades' });
        
    }
   
}




/*

findAll({
  attributes: ['foo', 'bar']
});

const user = await User.findOne({ attributes: ['passwordResetToken','passwordResetExpires','id'], where: {email} })


*/