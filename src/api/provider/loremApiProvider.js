const axios = require("axios");

const baseUrl = "https://loripsum.net/api";

exports.getRdmText = () => {
    return axios
        .get(baseUrl + "/plaintext", { response: "text" })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            res.json({
                message: "Erreur serveur",
            });
        });
};
