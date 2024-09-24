const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { MediaBanner } = require('../models');
const logger = require('../errorHandler/logger');
const Validator = require("fastest-validator");
const v = new Validator();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  useAccelerateEndpoint: true
});

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

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${process.env.PATH_AWS}/mediabanner/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);
        mediaLink = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      // buat object media banner
      let mediaBannerCreateObj = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        mediaLink: mediaLink,
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
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  },

  getMediaBanners: async (req, res) => {
    try {
      const mediaBanner = await MediaBanner.findAll();

      res.status(200).json(response(200, 'success get Media Banner', mediaBanner));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
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
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
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

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${process.env.PATH_AWS}/mediabanner/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);
        mediaLink = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const MediaBannerUpdateObj = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        mediaLink: req.file ? mediaLink : MediaBannerGet.mediaLink,
        description: req.body.description
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
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
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
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  }
}
