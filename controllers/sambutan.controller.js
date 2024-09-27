const logger = require('../errorHandler/logger');
const { response } = require('../helpers/response.formatter');

const { Sambutan, Personil, Jabatan } = require('../models');

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  getSambutan: async (req, res) => {
    try {
      const sambutan = await Sambutan.findAll({
        include: [
          {
            model: Personil,
            attributes: ['id', 'name', 'image'],
            include: [
              {
                model: Jabatan,
                attributes: ['id', 'title']
              }
            ]
          }
        ]
      });

      res.status(200).json(response(200, 'success get sambutan', sambutan));
    } catch (error) {
      console.log(error);
      return res.status(200).json(response(200, 'success get sambutan', error));
    }
  },

  createSambutan: async (req, res) => {
    try {
      //schema validasi
      const schema = {
        title: 'string|empty:false|min:3',
        desc: 'string|empty:true|min:3',
        personil_id: 'number|empty:false'
      };

      //membuat object sambutan
      let sambutanCreateObj = {
        title: req.body.title,
        desc: req.body.desc,
        personil_id: parseInt(req.body.personil_id)
      };

      //validasi
      const validate = v.validate(sambutanCreateObj, schema);

      if (validate.length) {
        return res.status(400).json(response(400, null, validate));
      }

      //membuat sambutan
      const sambutan = await Sambutan.create(sambutanCreateObj);

      res.status(201).json(response(201, 'success create sambutan', sambutan));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, 'success create sambutan', error));
    }
  },
  getSambutanById: async (req, res) => {
    try {
      const sambutan = await Sambutan.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Personil,
            attributes: ['id', 'name', 'image'],
            include: [
              {
                model: Jabatan,
                attributes: ['id', 'title']
              }
            ]
          }
        ]
      });
      if (!sambutan) {
        res.status(404).json(response(404, 'Sambutan not found'));
        return;
      }

      res.status(200).json(response(200, 'success get sambutan', sambutan));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      console.log(error);
      return res.status(200).json(response(200, 'success get sambutan', error));
    }
  },

  updateSambutan: async (req, res) => {
    try {
      // get sambutan by id
      const sambutan = await Sambutan.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!sambutan) {
        res.status(404).json(response(404, 'Sambutan not found'));
        return;
      }

      //schema validasi
      const schema = {
        title: 'string|empty:false|min:3',
        desc: 'string|empty:true|min:3',
        personil_id: 'number|empty:false'
      };

      //membuat object sambutan
      let sambutanUpdateObj = {
        title: req.body.title,
        desc: req.body.desc,
        personil_id: parseInt(req.body.personil_id)
      };

      //validasi
      const validate = v.validate(sambutanUpdateObj, schema);

      if (validate.length) {
        return res.status(400).json(response(400, null, validate[0]));
      }

      //update sambutan
      const sambutanUpdated = await sambutan.update(sambutanUpdateObj);

      res.status(200).json(response(200, 'success update sambutan', sambutanUpdated));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  },

  deleteSambutan: async (req, res) => {
    try {
      let sambutan = await Sambutan.findOne({
        where: {
          id: req.params.id
        },
      });

      //cek jika Sambutan tidak ada
      if (!sambutan) {
        res.status(404).json(response(404, 'Sambutan not found'));
        return;
      }

      await sambutan.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(200).json(response(200, 'success delete sambutan'));

    } catch (error) {
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  }

}