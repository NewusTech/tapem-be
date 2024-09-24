const { response } = require('../helpers/response.formatter');
const logger = require('../errorHandler/logger');
const { Personil, Jabatan } = require('../models');
const Validator = require("fastest-validator");
const v = new Validator();
const { generatePagination } = require('../pagination/pagination');
const { Op } = require('sequelize');
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

    //membuat personil
    createpersonil: async (req, res) => {
        try {

            //membuat schema untuk validasi
            const schema = {
                name: { type: "string", min: 3 },
                jabatan_id: { type: "number", optional: true },
                image: { type: "string", optional: true }
            }

            if (req.file) {
                const timestamp = new Date().getTime();
                const uniqueFileName = `${timestamp}-${req.file.originalname}`;

                const uploadParams = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `${process.env.PATH_AWS}/personil/${uniqueFileName}`,
                    Body: req.file.buffer,
                    ACL: 'public-read',
                    ContentType: req.file.mimetype
                };

                const command = new PutObjectCommand(uploadParams);

                await s3Client.send(command);

                imageKey = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            }

            //buat object personil
            let personilCreateObj = {
                name: req.body.name,
                jabatan_id: req.body.jabatan_id !== undefined ? Number(req.body.jabatan_id) : null,
                image: req.file ? imageKey : null
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(personilCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat personil
            let personilCreate = await Personil.create(personilCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create personil', personilCreate));
        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data personil
    getpersonil: async (req, res) => {
        try {
            let { search } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            let personilGets;
            let totalCount;
    
            const whereCondition = {};
    
            if (search) {
                whereCondition[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` }},
                    { '$Jabatan.title$': { [Op.iLike]: `%${search}%` } },
                ];
            }
    
            [personilGets, totalCount] = await Promise.all([
                Personil.findAll({
                    where: whereCondition,
                    include: [
                        { model: Jabatan, attributes: ['id', 'level', 'title'] },
                    ],
                    limit: limit,
                    offset: offset
                }),
                Personil.count({
                    where: whereCondition,
                    include: [
                        { model: Jabatan, attributes: ['id', 'level', 'title'] },
                    ],
                })
            ]);
    
            const pagination = generatePagination(totalCount, page, limit, '/api/personil/get');
    
            res.status(200).json({
                status: 200,
                message: 'success get personil',
                data: personilGets,
                pagination: pagination
            });
    
        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data personil berdasarkan id
    getpersonilById: async (req, res) => {
        try {
            const whereCondition = { id: req.params.id };

            //mendapatkan data personil berdasarkan id
            let personilGet = await Personil.findOne({
                where: whereCondition,
                include: [
                    { model: Jabatan, attributes: ['id', 'title'] },
                ],
            });

            //cek jika personil tidak ada
            if (!personilGet) {
                res.status(404).json(response(404, 'personil not found'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success get personil by id', personilGet));
        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate personil berdasarkan id
    updatepersonil: async (req, res) => {
        try {
            //mendapatkan data personil untuk pengecekan
            let personilGet = await Personil.findOne({
                where: {
                    id: req.params.id,
                }
            })

            //cek apakah data personil ada
            if (!personilGet) {
                res.status(404).json(response(404, 'personil not found'));
                return;
            }

            //membuat schema untuk validasi
            const schema = {
                name: { type: "string", min: 3, optional: true },
                image: { type: "string", optional: true },
                jabatan_id: { type: "number", optional: true }
            }

            if (req.file) {
                const timestamp = new Date().getTime();
                const uniqueFileName = `${timestamp}-${req.file.originalname}`;

                const uploadParams = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `${process.env.PATH_AWS}/personil/${uniqueFileName}`,
                    Body: req.file.buffer,
                    ACL: 'public-read',
                    ContentType: req.file.mimetype
                };

                const command = new PutObjectCommand(uploadParams);

                await s3Client.send(command);

                imageKey = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            }

            //buat object personil
            let personilUpdateObj = {
                name: req.body.name,
                image: req.file ? imageKey : personilGet.image,
                jabatan_id: req.body.jabatan_id !== undefined ? Number(req.body.jabatan_id) : null,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(personilUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update personil
            await Personil.update(personilUpdateObj, {
                where: {
                    id: req.params.id,
                }
            })

            //mendapatkan data personil setelah update
            let personilAfterUpdate = await Personil.findOne({
                where: {
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success update personil', personilAfterUpdate));

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //menghapus personil berdasarkan id
    deletepersonil: async (req, res) => {
        try {

            //mendapatkan data personil untuk pengecekan
            let personilGet = await Personil.findOne({
                where: {
                    id: req.params.id                }
            })

            //cek apakah data personil ada
            if (!personilGet) {
                res.status(404).json(response(404, 'personil not found'));
                return;
            }

            await Personil.destroy({
                where: {
                    id: req.params.id,
                }
            })


            res.status(200).json(response(200, 'success delete personil'));

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    }
}