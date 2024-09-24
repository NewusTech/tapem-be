const { response } = require('../helpers/response.formatter');
const { Galeri } = require('../models');
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

    //membuat Galeri
    createGaleri: async (req, res) => {
        try {

            //membuat schema untuk validasi
            const schema = {
                title: { type: "string", min: 3 },
                mediaLink: { type: "string", min: 3, optional: true },
                image: {
                    type: "string",
                    optional: true
                },
            }

            if (req.files) {
                if (req.files.image) {
                    const timestamp = new Date().getTime();
                    const uniqueFileName = `${timestamp}-${req.files.image[0].originalname}`;

                    const uploadParams = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: `${process.env.PATH_AWS}/galeri/${uniqueFileName}`,
                        Body: req.files.image[0].buffer,
                        ACL: 'public-read',
                        ContentType: req.files.image[0].mimetype
                    };

                    const command = new PutObjectCommand(uploadParams);

                    await s3Client.send(command);

                    imageKey = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
                }
                if (req.files.mediaLink) {
                    const timestamp = new Date().getTime();
                    const uniqueFileName = `${timestamp}-${req.files.mediaLink[0].originalname}`;

                    const uploadParams = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: `${process.env.PATH_AWS}/galeri/video${uniqueFileName}`,
                        Body: req.files.mediaLink[0].buffer,
                        ACL: 'public-read',
                        ContentType: req.files.mediaLink[0].mimetype
                    };
                    const command = new PutObjectCommand(uploadParams);

                    await s3Client.send(command);
                    mediaLink = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
                }
            }

            //buat object Galeri
            let GaleriCreateObj = {
                title: req.body.title,
                image: req.files ? imageKey : undefined,
                mediaLink: req.files ? mediaLink : undefined
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(GaleriCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat Galeri
            let GaleriCreate = await Galeri.create(GaleriCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create Galeri', GaleriCreate));
        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data Galeri
    getGaleri: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            let GaleriGets;
            let totalCount;

            [GaleriGets, totalCount] = await Promise.all([
                Galeri.findAll({
                    limit: limit,
                    offset: offset
                }),
                Galeri.count()
            ]);

            const pagination = generatePagination(totalCount, page, limit, '/api/user/galeri/get');

            res.status(200).json({
                status: 200,
                message: 'success get Galeri',
                data: GaleriGets,
                pagination: pagination
            });

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data Galeri berdasarkan id
    getGaleriById: async (req, res) => {
        try {
            //mendapatkan data Galeri berdasarkan id
            let GaleriGet = await Galeri.findOne({
                where: {
                    id: req.params.id
                },
            });

            //cek jika Galeri tidak ada
            if (!GaleriGet) {
                res.status(404).json(response(404, 'Galeri not found'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success get Galeri by id', GaleriGet));
        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate Galeri berdasarkan id
    updateGaleri: async (req, res) => {
        try {
            //mendapatkan data Galeri untuk pengecekan
            let GaleriGet = await Galeri.findOne({
                where: {
                    id: req.params.id
                }
            })

            //cek apakah data Galeri ada
            if (!GaleriGet) {
                res.status(404).json(response(404, 'Galeri not found'));
                return;
            }

            //membuat schema untuk validasi
            const schema = {
                title: { type: "string", min: 3, optional: true },
                mediaLink: { type: "string", min: 3, optional: true },
                image: {
                    type: "string",
                    optional: true
                },
            }

            if (req.files) {
                if (req.files.image) {
                    const timestamp = new Date().getTime();
                    const uniqueFileName = `${timestamp}-${req.files.image[0].originalname}`;

                    const uploadParams = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: `${process.env.PATH_AWS}/galeri/${uniqueFileName}`,
                        Body: req.files.image[0].buffer,
                        ACL: 'public-read',
                        ContentType: req.files.image[0].mimetype
                    };

                    const command = new PutObjectCommand(uploadParams);
                    await s3Client.send(command);

                    imageKey = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
                }

                if (req.files.mediaLink) {
                    const timestamp = new Date().getTime();
                    const uniqueFileName = `${timestamp}-${req.files.mediaLink[0].originalname}`;

                    const uploadParams = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: `${process.env.PATH_AWS}/galeri/video${uniqueFileName}`,
                        Body: req.files.mediaLink[0].buffer,
                        ACL: 'public-read',
                        ContentType: req.files.mediaLink[0].mimetype
                    };
                    const command = new PutObjectCommand(uploadParams);

                    await s3Client.send(command);
                    mediaLink = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
                }
            }

            //buat object Galeri
            let GaleriUpdateObj = {
                title: req.body.title,
                image: req.files ? imageKey : GaleriGet.image,
                mediaLink: req.files ? mediaLink : GaleriGet.mediaLink
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(GaleriUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update Galeri
            await Galeri.update(GaleriUpdateObj, {
                where: {
                    id: req.params.id,
                }
            })

            //mendapatkan data Galeri setelah update
            let GaleriAfterUpdate = await Galeri.findOne({
                where: {
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success update Galeri', GaleriAfterUpdate));

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //menghapus Galeri berdasarkan id
    deleteGaleri: async (req, res) => {
        try {

            //mendapatkan data Galeri untuk pengecekan
            let GaleriGet = await Galeri.findOne({
                where: {
                    id: req.params.id
                }
            })

            //cek apakah data Galeri ada
            if (!GaleriGet) {
                res.status(404).json(response(404, 'Galeri not found'));
                return;
            }

            await Galeri.destroy({
                where: {
                    id: req.params.id,
                }
            })

            res.status(200).json(response(200, 'success delete Galeri'));

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    }
}