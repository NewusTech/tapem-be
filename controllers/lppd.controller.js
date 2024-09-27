const { response } = require('../helpers/response.formatter');
const { Lppd } = require('../models');
const Validator = require("fastest-validator");
const logger = require('../errorHandler/logger');
const v = new Validator();
const { generatePagination } = require('../pagination/pagination');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    useAccelerateEndpoint: true
});

module.exports = {

    //membuat Lppd
    createLppd: async (req, res) => {
        try {

            //membuat schema untuk validasi
            const schema = {
              tanggalPublish : { type: "string", min: 3 },
              kategori : { type: "string", min: 3 , optional: true },
              jenisInformasi: { type: "string", min: 3 , optional: true },
              subJenisInformasi: { type: "string", min: 3 , optional: true },
              tipeDokumen: { type: "string", min: 3 , optional: true },
              kandunganInformasi: { type: "string", optional: true },
              badanPublik: { type: "string", optional: true },
              fileLampiran: { type: "string", optional: true }
            }
            
            if (req.file) {
              const timestamp = new Date().getTime();
                const uniqueFileName = `${timestamp}-${req.file.originalname}`;

                const uploadParams = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `${process.env.PATH_AWS}/lppd/file/${uniqueFileName}`,
                    Body: req.file.buffer,
                    ACL: 'public-read',
                    ContentType: req.file.mimetype
                };

                const command = new PutObjectCommand(uploadParams);

                await s3Client.send(command);

                fileLampiran = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            }

            //buat object Lppd
            let LppdCreateObj = {
              ...req.body,
              fileLampiran: fileLampiran
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(LppdCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat Lppd
            let LppdCreate = await Lppd.create(LppdCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create Lppd', LppdCreate));
        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data Lppd
    getLppd: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            let LppdGets;
            let totalCount;

            [LppdGets, totalCount] = await Promise.all([
                Lppd.findAll({
                    limit: limit,
                    offset: offset,
                    order: [['id', 'ASC']]
                }),
                Lppd.count()
            ]);

            const pagination = generatePagination(totalCount, page, limit, '/api/lppd/get');

            res.status(200).json({
                status: 200,
                message: 'success get Lppd',
                data: LppdGets,
                pagination: pagination
            });

        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data Lppd berdasarkan id
    getLppdByid: async (req, res) => {
        try {
            //mendapatkan data Lppd berdasarkan id
            let LppdGet = await Lppd.findOne({
                where: {
                    id: req.params.id
                },
            });

            //cek jika Lppd tidak ada
            if (!LppdGet) {
                res.status(404).json(response(404, 'Lppd not found'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success get Lppd by id', LppdGet));
        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate Lppd berdasarkan id
    updateLppd: async (req, res) => {
        try {
            //mendapatkan data Lppd untuk pengecekan
            let LppdGet = await Lppd.findOne({
                where: {
                    id: req.params.id
                }
            })

            //cek apakah data Lppd ada
            if (!LppdGet) {
                res.status(404).json(response(404, 'Lppd not found'));
                return;
            }

            //membuat schema untuk validasi
            //membuat schema untuk validasi
            const schema = {
              tanggalPublish : { type: "string", min: 3 },
              kategori : { type: "string", min: 3 , optional: true },
              jenisInformasi: { type: "string", min: 3 , optional: true },
              subJenisInformasi: { type: "string", min: 3 , optional: true },
              tipeDokumen: { type: "string", min: 3 , optional: true },
              kandunganInformasi: { type: "string", optional: true },
              badanPublik: { type: "string", optional: true },
              fileLampiran: { type: "string", optional: true }
            }
            
            if (req.file) {
              const timestamp = new Date().getTime();
                const uniqueFileName = `${timestamp}-${req.file.originalname}`;

                const uploadParams = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `${process.env.PATH_AWS}/lppd/file/${uniqueFileName}`,
                    Body: req.file.buffer,
                    ACL: 'public-read',
                    ContentType: req.file.mimetype
                };

                const command = new PutObjectCommand(uploadParams);

                await s3Client.send(command);

                fileLampiran = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            }

            //buat object Lppd
            let LppdUpdateObj = {
              ...req.body,
              fileLampiran: fileLampiran
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(LppdUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update Lppd
            await Lppd.update(LppdUpdateObj, {
                where: {
                    id: req.params.id,
                }
            })

            //mendapatkan data Lppd setelah update
            let LppdAfterUpdate = await Lppd.findOne({
                where: {
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success update Lppd', LppdAfterUpdate));

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //menghapus Lppd berdasarkan id
    deleteLppd: async (req, res) => {
        try {
          
            //mendapatkan data Lppd untuk pengecekan
            let LppdGet = await Lppd.findOne({
                where: {
                    id: req.params.id
                }
            })

            //cek apakah data Lppd ada
            if (!LppdGet) {
                res.status(404).json(response(404, 'Lppd not found'));
                return;
            }

            await Lppd.destroy({
                where: {
                    id: req.params.id,
                }
            })

            res.status(200).json(response(200, 'success delete Lppd'));

        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    }
}