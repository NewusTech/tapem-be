const { response } = require('../helpers/response.formatter');
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { MediaBanner } = require('../models');
const Validator = require("fastest-validator");
const v = new Validator();


module.exports = {
  createMediaBanner: async (req, res) => {
    try {
      // buat schema validasi
      const schema = {
        title: {
          type: 'string',
          optional: true,
          min: 3
        },
        subTitle: {
          type: 'string',
          optional: true,
          min: 3
        },
        mediaLink: {
          type: 'string',
          optional: true,
          min: 3
        },
        description: {
          type: 'string',
          optional: true,
          min: 3
        }
      };

      // buat object media banner
      let mediaBannerCreateObj = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        mediaLink: req.body.mediaLink,
        description: req.body.description
      };      

      // validasi menggunakan module fastest-validator

      const validate = v.validate(mediaBannerCreateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, 'validation failed', validate));
        return;
      }
      
      // buat media banner
      let mediaBannerCreate = await MediaBanner.create(mediaBannerCreateObj);

      res.status(200).json(response(200, 'success create Media Banner', mediaBannerCreate));

    } catch (error) {
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  },

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
  },
  updateMediaBanner: async (req, res) => {
    try {
      // buat schema validasi
      const schema = {
        title: {
          type: "string",
          optional: true,
          min: 3
        },
        subTitle: {
          type: "string",
          optional: true,
          min: 3
        },
        mediaLink: {
          type: "string",
          optional: true,
          min: 3
        },
        description: {
          type: "string",
          optional: true,
          min: 3
        }
      }

      //mendapatkan data MediaBanner untuk pengecekan
      let MediaBannerGet = await MediaBanner.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!MediaBannerGet) {
        res.status(404).json(response(404, 'data not found'));
        return;
      }

      const MediaBannerUpdateObj = {
        title: req.body.title ?? MediaBannerGet.title,
        subTitle: req.body.subTitle ?? MediaBannerGet.subTitle,
        mediaLink: req.body.mediaLink ?? MediaBannerGet.mediaLink,
        description: req.body.description ?? MediaBannerGet.description
      }

      //validasi menggunakan module fastest-validator
      const validate = v.validate(MediaBannerUpdateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, 'validation failed', validate));
        return;
      }

      //update MediaBanner
      await MediaBanner.update(MediaBannerUpdateObj, {
        where: {
          id: req.params.id,
        }
      });

      //mendapatkan data MediaBanner setelah update
      let MediaBannerAfterUpdate = await MediaBanner.findOne({
        where: {
          id: req.params.id,
        }
      });

      //response menggunakan helper response.formatter
      res.status(200).json(response(200, 'success update Media Banner', MediaBannerAfterUpdate));
    } catch (error) {
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  },

  deleteMediaBanner: async (req, res) => {
    try {
      //mendapatkan data MediaBanner untuk pengecekan
      let MediaBannerGet = await MediaBanner.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!MediaBannerGet) {
        res.status(404).json(response(404, 'data not found'));
        return;
      }

      //delete MediaBanner
      await MediaBanner.destroy({
        where: {
          id: req.params.id,
        }
      }); 

      res.status(200).json(response(200, 'success delete Media Banner'));

    } catch (error) {
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  }
}
