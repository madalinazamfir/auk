
const { readFileSync } = require("fs");
const { NetCDFReader } = require("netcdfjs");

const seaIce = (req, res, next) => {
    const data = readFileSync("src/server/data/cmems_mod_arc_bgc_anfc_ecosmo_P1D-m_1636186984168.nc");

    var reader = new NetCDFReader(data); // read the header
    var longitude = reader.getDataVariable("longitude");
    console.log(longitude);
}

export default seaIce;