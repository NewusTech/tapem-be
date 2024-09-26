const logger = require("../errorHandler/logger");
const { Regulasi } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();
const { generatePagination } = require("../pagination/pagination");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { response } = require("../helpers/response.formatter");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  useAccelerateEndpoint: true
});

module.exports = {

  getRegulasi: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      let Regulasis;
      let totalData;

      [Regulasis, totalData] = await Promise.all([
        Regulasi.findAll({
          limit: limit,
          offset: offset,
          order: [['id', 'ASC']]
        }),
        Regulasi.count()
      ]);

      const pagination = generatePagination(totalData, page, limit, '/api/regulasi/get');
      res.status(200).json({
        status: 200,
        message: 'Success get regulasi',
        data: Regulasis,
        pagination: pagination
      });

    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },
  getRegulasiByID: async (req, res) => {
    try {
      const RegulasiGet = await Regulasi.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!RegulasiGet) {
        res.status(404).json(response(404, 'Regulasi not found'));
        return;
      }

      res.status(200).json(response(200, 'success get Regulasi', RegulasiGet));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      console.log(error);
      return res.status(200).json(response(200, 'success get Regulasi', error)); 
    }
  },

  createRegulasi: async (req, res) => {
    try {

      //validasi
      const schema = {
        title: "string|min:3",
        file: "string|optional|min:3"
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json(response(400, 'Validation failed', validate[0]));
      }

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${process.env.PATH_AWS}/files/regulasi/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };
        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);
        req.body.file = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const RegulasiCreate = await Regulasi.create(req.body);
      res.status(200).json(response(200, 'success create Regulasi', RegulasiCreate));
    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  updateRegulasi: async (req, res) => {
    try {
      //mendapatkan data Regulasi untuk pengecekan
      let RegulasiGet = await Regulasi.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!RegulasiGet) {
        res.status(404).json(response(404, 'Regulasi not found'));
        return;
      }

      //validasi
      const schema = {
        title: "string|min:3",
        file: "string|optional|min:3"
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json(response(400, 'Validation failed', validate[0]));
      }

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${process.env.PATH_AWS}/files/regulasi/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };
        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);
        req.body.file = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const regulasiObjUpdate = {
        title: req.body.title,
        file: req.body.file ?? RegulasiGet.file
      }

      await Regulasi.update(regulasiObjUpdate, {
        where: {
          id: req.params.id
        }
      });

      res.status(200).json(response(200, 'success update Regulasi',));

    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  deleteRegulasi: async (req, res) => {
    try {

      //mendapatkan data Regulasi untuk pengecekan
      let RegulasiGet = await Regulasi.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!RegulasiGet) {
        res.status(404).json(response(404, 'Regulasi not found'));
        return;
      }

      await Regulasi.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(200).json(response(200, 'success delete Regulasi'));
    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }
}