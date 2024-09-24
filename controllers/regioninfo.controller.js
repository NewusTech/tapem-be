const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { RegionInfo } = require('../models');
const Validator = require("fastest-validator");
const logger = require('../errorHandler/logger');
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
  createRegionInfo: async (req, res) => {
    try {

      //membuat schema untuk validasi
      const schema = {
        title: { type: "string", min: 3 },
        image: {
          type: "string",
          optional: true
        },
        description: { type: "string", optional: true },
      }

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${process.env.PATH_AWS}/regioninfo/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      //buat object RegionInfo
      let regionInfoCreateObj = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? imageKey : undefined,
      }

      //validasi menggunakan module fastest-validator
      const validate = v.validate(regionInfoCreateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, 'validation failed', validate));
        return;
      }

      //buat RegionInfo
      let regionInfoCreate = await RegionInfo.create(regionInfoCreateObj);

      //response menggunakan helper response.formatter
      res.status(201).json(response(201, 'success create RegionInfo', regionInfoCreate));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  getRegionInfos: async (req, res) => {
    try {
      let regionInfos = await RegionInfo.findAll();

      res.status(200).json(response(200, 'success get RegionInfos', regionInfos));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  getRegionInfoById: async (req, res) => {
    try {
      // Cari data Regioninfo Get by ID
      let regionInfo = await RegionInfo.findOne({
        where: {
          id: req.params.id
        }
      });

      // Cek jika Regioninfo Get tidak ada
      if (!regionInfo) {
        res.status(404).json(response(404, 'data not found'));
        return;
      }

      // response menggunakan helper response.formatter
      res.status(200).json(response(200, 'success get RegionInfo', regionInfo));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  updateRegionInfo: async (req, res) => {
    try {
      //mendapatkan data RegionInfos untuk pengecekan
      let RegionInfosGet = await RegionInfo.findOne({
        where: {
          id: req.params.id
        }
      })

      //cek apakah data RegionInfos ada
      if (!RegionInfosGet) {
        res.status(404).json(response(404, 'RegionInfos not found'));
        return;
      }

      //membuat schema untuk validasi
      const schema = {
        title: { type: "string", min: 3, optional: true },
        image: { type: "string", optional: true },
        description: { type: "string", min: 3, optional: true }
      }

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${process.env.PATH_AWS}/regioninfo/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      //buat object RegionInfos
      let RegionInfosUpdateObj = {
        title: req.body.title ?? RegionInfosGet.title,
        description: req.body.description ?? RegionInfosGet.description,
        image: req.file ? imageKey : RegionInfosGet.image,
      }

      //validasi menggunakan module fastest-validator
      const validate = v.validate(RegionInfosUpdateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, 'validation failed', validate));
        return;
      }

      //update RegionInfos
      await RegionInfo.update(RegionInfosUpdateObj, {
        where: {
          id: req.params.id,
        }
      })

      //mendapatkan data RegionInfos setelah update
      let RegionInfosAfterUpdate = await RegionInfo.findOne({
        where: {
          id: req.params.id,
        }
      })

      //response menggunakan helper response.formatter
      res.status(200).json(response(200, 'success update RegionInfos', RegionInfosAfterUpdate));

    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  deleteRegionInfo: async (req, res) => {
   try {
    //mendapatkan data RegionInfos untuk pengecekan
    let RegionInfosGet = await RegionInfo.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!RegionInfosGet) {
      res.status(404).json(response(404, 'RegionInfos not found'));
      return;
    }   

    //delete RegionInfos
    await RegionInfo.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(response(200, 'success delete RegionInfos'));
   } catch (err) {
    
   }
  }
}
