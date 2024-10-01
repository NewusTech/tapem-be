const logger = require('../errorHandler/logger');
const { response } = require('../helpers/response.formatter');

const { SocialMedia } = require('../models');

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  getSocialMedia: async (req, res) => {
    try {
      let socialMedia = await SocialMedia.findAll();

      res.status(200).json(response(200, 'success get social media', socialMedia));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      console.log(error);
      return res.status(200).json(response(200, 'success get social media', error));
    }
  },

  createSocialMedia: async (req, res) => {
    try {
      //schema validasi
      const schema = {
        name: 'string|empty:false|min:3',
        link: 'string|empty:true|min:3',
      };

      console.log(req.body, 'body');
      console.log(schema, 'schema');

      //membuat object socialMedia
      let socialMediaCreateObj = {
        name: req.body.name,
        link: req.body.link,
      };

      //validasi
      const validate = v.validate(socialMediaCreateObj, schema);

      if (validate.length) {
        return res.status(400).json(response(400, null, validate));
      }

      //membuat socialMedia
      const socialMedia = await SocialMedia.create(socialMediaCreateObj);

      res.status(201).json(response(201, 'success create social media', socialMedia));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      console.log(error);
      return res.status(500).json(response(500, 'success create social media', error));
    }
  },
  getSocialMediaById: async (req, res) => {
    try {
      const socialMedia = await SocialMedia.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!socialMedia) {
        res.status(404).json(response(404, 'Social Media not found'));
        return;
      }

      res.status(200).json(response(200, 'success get socialmedia', socialMedia));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      console.log(error);
      return res.status(200).json(response(200, 'success get social media', error));
    }
  },

  updateSocialMedia: async (req, res) => {
    try {
      // get socialMedia by id
      const socialMedia = await SocialMedia.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!socialMedia) {
        res.status(404).json(response(404, 'Social Media not found'));
        return;
      }

      //schema validasi
      const schema = {
        name: 'string|empty:false|min:2',
        link: 'string|empty:true|min:3'
      };

      //membuat object socialMedia
      let socialMediaUpdateObj = {
        name: req.body.name,
        link: req.body.link
      };

      //validasi
      const validate = v.validate(socialMediaUpdateObj, schema);

      if (validate.length) {
        return res.status(400).json(response(400, null, validate[0]));
      }

      //update socialMedia
      const socialMediaUpdated = await socialMedia.update(socialMediaUpdateObj);

      res.status(200).json(response(200, 'success update social media', socialMediaUpdated));
    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  },

  deleteSocialMedia: async (req, res) => {
    try {
      let socialMedia = await SocialMedia.findOne({
        where: {
          id: req.params.id
        },
      });

      //cek jika SocialMedia tidak ada
      if (!socialMedia) {
        res.status(404).json(response(404, 'Social Media not found'));
        return;
      }

      await socialMedia.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(200).json(response(200, 'success delete social media'));

    } catch (error) {
      logger.error(`Error : ${error}`);
      logger.error(`Error message: ${error.message}`);
      res.status(500).json(response(500, 'internal server error', error));
      console.log(error);
    }
  }

}