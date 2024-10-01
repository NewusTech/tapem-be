const logger = require("../errorHandler/logger");
const { StrukturOrganisasi } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();
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

  getStruktur: async (req, res) => {
    try {
      const StrukturOrganisasis = await StrukturOrganisasi.findOne({
        where: { id: 1 },
        order: [['id', 'ASC']]
      })

      if (!StrukturOrganisasis) {
        res.status(404).json(response(404, 'Struktur Organisasi not found'));
        return;
      }

      res.status(200).json({
        status: 200,
        message: 'Success get regulasi',
        data: StrukturOrganisasis
      });

    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },
  getStrukturOrganisasiByID: async (req, res) => {
    try {
      const StrukturOrganisasiGet = await StrukturOrganisasi.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!StrukturOrganisasiGet) {
        res.status(404).json(response(404, 'Struktur Organisasi not found'));
        return;
      }

      res.status(200).json(response(200, 'success get Struktur Organisasi', StrukturOrganisasiGet));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      console.log(error);
      return res.status(200).json(response(200, 'success get Struktur Organisasi', error));
    }
  },

  createStruktur: async (req, res) => {
    try {

      //validasi
      const schema = {
        name: "string|min:3",
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
          Key: `${process.env.PATH_AWS}/files/struktur/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };
        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);
        req.body.file = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const StrukturOrganisasiCreate = await StrukturOrganisasi.create(req.body);
      res.status(200).json(response(200, 'success create Struktur Organisasi', StrukturOrganisasiCreate));
    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  updateStruktur: async (req, res) => {
    try {
      //mendapatkan data StrukturOrganisasi untuk pengecekan
      let StrukturOrganisasiGet = await StrukturOrganisasi.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!StrukturOrganisasiGet) {
        res.status(404).json(response(404, 'StrukturOrganisasi not found'));
        return;
      }

      //validasi
      const schema = {
        name: "string|min:3",
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
        name: req.body.name ?? StrukturOrganisasiGet.name,
        file: req.body.file ?? StrukturOrganisasiGet.file
      }

      await StrukturOrganisasi.update(regulasiObjUpdate, {
        where: {
          id: req.params.id
        }
      });

      const struktur = await StrukturOrganisasi.findOne({
        where: {
          id: req.params.id
        }
      });

      res.status(200).json(response(200, 'success update Struktur Organisasi',struktur));
    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  deleteStrukturOrganisasi: async (req, res) => {
    try {

      //mendapatkan data StrukturOrganisasi untuk pengecekan
      let StrukturOrganisasiGet = await StrukturOrganisasi.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!StrukturOrganisasiGet) {
        res.status(404).json(response(404, 'StrukturOrganisasi not found'));
        return;
      }

      await StrukturOrganisasi.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(200).json(response(200, 'success delete StrukturOrganisasi'));
    } catch (err) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }
}