const { response } = require('../helpers/response.formatter');
const logger = require('../errorHandler/logger');
const { Tupoksi } = require('../models');

const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require('sequelize');

module.exports = {

    //mendapatkan data tupoksi berdasarkan id
    gettupoksi: async (req, res) => {
        try {
            //mendapatkan data tupoksi berdasarkan id
            let tupoksiGet = await Tupoksi.findOne();

            //cek jika tupoksi tidak ada
            if (!tupoksiGet) {
                res.status(404).json(response(404, 'tupoksi not found'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success get tupoksi by id', tupoksiGet));
        } catch (err) {
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate tupoksi berdasarkan id
    updatetupoksi: async (req, res) => {
        try {
            //mendapatkan data tupoksi untuk pengecekan
            let tupoksiGet = await Tupoksi.findOne()

            //cek apakah data tupoksi ada
            if (!tupoksiGet) {
                res.status(404).json(response(404, 'tupoksi not found'));
                return;
            }

            //membuat schema untuk validasi
            const schema = {
                tugaspokok: {
                    type: "string",
                    min: 3,
                    optional: true
                },
                fungsiutama: {
                    type: "string",
                    min: 3,
                    optional: true
                }
            }

            //buat object tupoksi
            let tupoksiUpdateObj = {
                tugaspokok: req.body.tugaspokok,
                fungsiutama: req.body.fungsiutama
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(tupoksiUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update tupoksi
            await Tupoksi.update(tupoksiUpdateObj, {
                where: {
                  id: tupoksiGet.id,
                },
              });

            //mendapatkan data tupoksi setelah update
            let tupoksiAfterUpdate = await Tupoksi.findOne()

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success update tupoksi', tupoksiAfterUpdate));

        } catch (err) {
            logger.error(`Error : ${err}`);
            logger.error(`Error message: ${err.message}`);
            res.status(500).json(response(500, 'internal server error', err));
            console.log(err);
        }
    },

}