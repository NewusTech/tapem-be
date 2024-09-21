const { response } = require("../helpers/response.formatter");
const { Artikel, Galeri, Personil, Aplikasietcs } = require("../models");

module.exports = {
  getDashboardData: async (req, res) => {
    try {
      const [artikelCount, galeriCount, personilCount, aplikasiCount] = await Promise.all([
        Artikel.count(),
        Galeri.count(),
        Personil.count(),
        Aplikasietcs.count()
      ]);

      if (!artikelCount || !galeriCount) {
        res.status(404).json(response(404, "Data not found"));
        return;
      }

      res.status(200).json(response(200, "Scucces get data", { artikelCount, galeriCount, personilCount, aplikasiCount }));
    } catch (error) {
      logger.error(`Error : ${err}`);
      logger.error(`Error message: ${err.message}`);
      res.status(500).json(response(500, "Internal Server Error", error));
      console.log(error);
    }
  }
}