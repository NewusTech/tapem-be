const { response } = require('../helpers/response.formatter');

const { Jabatan } = require('../models');

const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require('sequelize');

module.exports = {

    //membuat jabatan
    createjabatan: async (req, res) => {
        try {

            //membuat schema untuk validasi
            const schema = {
                title: {
                    type: "string",
                    min: 3,
                },
            }

            //buat object jabatan
            let jabatanCreateObj = {
                title: req.body.title,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(jabatanCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat jabatan
            let jabatanCreate = await Jabatan.create(jabatanCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create kategori artikel', jabatanCreate));
        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data jabatan
    getjabatan: async (req, res) => {
        try {
            let jabatanGets;
            const search = req.query.search ?? null;

            if (search) {
                [jabatanGets] = await Promise.all([
                    Jabatan.findAll({
                        where: {
                            [Op.or]: [
                                { title: { [Op.iLike]: `%${search}%` } }
                            ]
                        },
                    }),
                ]);
            } else {
                [jabatanGets] = await Promise.all([
                    Jabatan.findAll({
                    }),
                ]);
            }

            res.status(200).json(response(200, 'success get DATA', jabatanGets));

        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data jabatan berdasarkan id
    getjabatanById: async (req, res) => {
        try {
            //mendapatkan data jabatan berdasarkan id
            let jabatanGet = await Jabatan.findOne({
                where: {
                    id: req.params.id
                },
            });

            //cek jika jabatan tidak ada
            if (!jabatanGet) {
                res.status(404).json(response(404, 'jabatan not found'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success get jabatan by id', jabatanGet));
        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate jabatan berdasarkan id
    updatejabatan: async (req, res) => {
        try {
            //mendapatkan data jabatan untuk pengecekan
            let jabatanGet = await Jabatan.findOne({
                where: {
                    id: req.params.id
                }
            })

            //cek apakah data jabatan ada
            if (!jabatanGet) {
                res.status(404).json(response(404, 'jabatan not found'));
                return;
            }

            const oldImagePublicId = jabatanGet.image ? jabatanGet.image.split('/').pop().split('.')[0] : null;

            //membuat schema untuk validasi
            const schema = {
                title: {
                    type: "string",
                    min: 3,
                    optional: true
                },
            }

            //buat object jabatan
            let jabatanUpdateObj = {
                title: req.body.title,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(jabatanUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update jabatan
            await Jabatan.update(jabatanUpdateObj, {
                where: {
                    id: req.params.id,
                }
            })

            //mendapatkan data jabatan setelah update
            let jabatanAfterUpdate = await Jabatan.findOne({
                where: {
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success update jabatan', jabatanAfterUpdate));

        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //menghapus jabatan berdasarkan id
    deletejabatan: async (req, res) => {
        try {

            //mendapatkan data jabatan untuk pengecekan
            let jabatanGet = await Jabatan.findOne({
                where: {
                    id: req.params.id
                }
            })

            //cek apakah data jabatan ada
            if (!jabatanGet) {
                res.status(404).json(response(404, 'jabatan not found'));
                return;
            }

            await Jabatan.destroy({
                where: {
                    id: req.params.id,
                }
            })

            res.status(200).json(response(200, 'success delete jabatan'));

        } catch (err) {
            if (err.name === 'SequelizeForeignKeyConstraintError') {
                res.status(400).json(response(400, 'Data tidak bisa dihapus karena masih digunakan pada tabel lain'));
            } else {
                res.status(500).json(response(500, 'Internal server error', err));
                console.log(err);
            }
        }
    }
}