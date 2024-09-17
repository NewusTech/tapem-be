const { response } = require('../helpers/response.formatter');
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { MediaBanner } = require('../models');
const Validator = require("fastest-validator");
const v = new Validator();


module.exports = {
  getMediaBanners: async (req, res) => {
    try {
      const mediaBanner = await MediaBanner.findAll();

      res.status(200).json(response(200, 'success get Media Banner', mediaBanner));
    } catch (error) {
      response(res, 400, false, 'Get Media Banner Failed', error);
      console.log(error);
    }
  },
  
  getMediaBannerById: async (req, res) => {
    try {
      const mediaBanner = await MediaBanner.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!mediaBanner) {
        res.status(404).json(response(404, 'data not found'));
        return;
      }

      res.status(200).json(response(200, 'success get Media Banner', mediaBanner));
    } catch (error) {
      response(res, 400, false, 'Get Media Banner Failed', error);
      console.log(error);
    }
  }
}
