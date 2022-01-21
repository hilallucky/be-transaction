const redis = require('redis');
const client = redis.createClient();

module.exports = {
 gbv: (req, res, next) => {
    const { year, month, sfno } = req.body
    client.hget('gbv:'+sfno, year+'/'+month, function(err, reply) {
      if (err) {
        res.status(500).json({
          message: "Something Went Wrong"
        })
      }
      if (reply == null) {
        next()
      } else {
        res.status(200).json({
          status: `success`,
          personalGBV: JSON.parse(reply)
        })
      }
    });
  },
  pbv: (req, res, next) => {
    const { year, month, dfno } = req.body
    client.hget('pbv:'+dfno, year+'/'+month, function(err, reply) {
      if (err) {
        res.status(500).json({
          message: "Something Went Wrong"
        })
      }
      if (reply == null) {
        next()
      } else {
        res.status(200).json({
          status: `success`,
          personalBV: JSON.parse(reply)
        })
      }
    });
  },
  banner: (req, res, next) => {
    client.get('banner', function(err, reply) {
      if (err) {
        console.log(err)
        res.status(500).json({
          message: "Something Went Wrong"
        })
      }
      if (reply == null) {
        next()
      } else {
        res.status(200).json({
          status: `success`,
          message: '',
          data: JSON.parse(reply)
        })
      }
    });
  },


  productknet: (req, res, next) => {
    const {limit, page, srcval} = req.body;
    
    client.hget('productknet', limit + ":" + page, function(err, reply) {
      if (err) {
        console.log(err)
        res.status(500).json({
          message: "Something Went Wrong"
        })
      }
      if (reply == null) {
        next()
      } else {
        res.status(200).json(
         JSON.parse(reply)
        )
      }
    });
  },

  delCache: (req, res) => {
    let {key} = req.body
    client.del(key)
    res.status(200).json({
          status: `success`,
          message: '',
        })

  //   redis.del(util.format(KEY.CODE, key), function(err) {
  //     cb(err);
  //   })
  }



}