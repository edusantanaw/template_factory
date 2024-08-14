const axios = require("axios");
const fs = require("fs");
const AdmZip = require("adm-zip");

(async () => {
  // cria um zip baseado no template gerado pela build react
  const zip = new AdmZip();
  const outputFile = "test.zip";
  zip.addLocalFolder("../template_example/dist");
  zip.writeZip(outputFile);
  console.log(`Created ${outputFile} successfully`);

  const file = fs.readFileSync("./test.zip");
  const fileBase64 = file.toString("base64");


  // cria um novo template
  const response = await axios.post("http://localhost:3000/template", {
    name: "teste",
    templateBase64: fileBase64,
    replaceableKeys: [
      {
        key: "[TITLE]",
        type: "string",
      },
      {
        key: "[SUBTITLE]",
        type: "string",
      },
      {
        key: "[HOME_IMG_SRC]",
        type: "string",
      },
    ],
  });

  // gera um novo projeto a partir do template
  const data = await axios.post(
    `http://localhost:3000/template/generate/${response.data.id}`,
    {
      keysWithValue: [
        {
          key: "[TITLE]",
          value: "O meu titulo supremo",
        },
        {
          key: "[SUBTITLE]",
          value: "O meu sub titulo supremo",
        },
        {
          key: "[HOME_IMG_SRC]",
          value:
            "https://th.bing.com/th/id/R.f48ceff9ab3322d4e84ed12a44c484d1?rik=0KQ6OgL4T%2b9uCA&riu=http%3a%2f%2fwww.photo-paysage.com%2falbums%2fuserpics%2f10001%2fCascade_-15.JPG&ehk=kx1JjE9ugj%2bZvUIrjzSmcnslPc7NE1cOnZdra%2f3pJEM%3d&risl=1&pid=ImgRaw&r=0",
        },
      ],
    }
  );
  fs.writeFileSync("./meu_projeto.zip", Buffer.from(data.data, "base64"));
})();
