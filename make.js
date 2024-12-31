// process.argv[0] -> Node.js'in yolunu içerir
// process.argv[1] -> Çalıştırılan dosyanın yolunu içerir
// process.argv[2] -> İlk argüman
// process.argv[3] -> İkinci argüman
// ve böyle devam eder...

//  konsoldan npm run deneme -- arg1 arg2 --> gönderdiğimde

const fs = require("fs").promises;
const path = require("path");

const firstUppercase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const modelName = firstUppercase(process.argv[2]);

// şablon dosyasını okur
const openStub = async (name) => {
  try {
    const data = await fs.readFile(`./stubs/${name}.stub`, "utf8");
    return data;
  } catch (err) {
    console.error("Dosya okuma hatası:", err);
    throw err; // Hata durumunda hata fırlatın
  }
};

// şablon dosyasını değiştirir
const replaceContent = (name, content = "") => {
  return content.replace(/@Name@/g, name);
};

/**
 * Bu kod, belirtilen bir dosyanın varlığını kontrol eden ve dosya mevcut değilse dosyayı
 oluşturan bir işlev olan createFileWithFolder'ı içerir. İşlev, dosyanın ve klasörün
  varlığını kontrol eder ve eğer yoksa, klasörü oluşturur ve ardından dosyayı oluşturur.
 *
 * @param {*} filePath
 * @param {*} content
 */
const createFileWithFolder = async (filePath, content) => {
  const folderPath = path.dirname(filePath);

  // Klasörü oluştur, eğer zaten varsa bir hata olmaz
  await fs
    .mkdir(folderPath, { recursive: true })
    .then(async () => {
      try {
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
          await fs.writeFile(filePath, content, "utf8");
          console.log(`Dosya oluşturuldu: ${filePath}`);
        } else {
          console.error(`Hata: ${filePath} zaten var.`);
        }
      } catch (err) {
        // ENOENT hatası, dosyanın mevcut olmadığını gösterir ve bu durumda dosya oluşturulur.
        if (err.code === "ENOENT") {
          await fs.writeFile(filePath, content, "utf8");
          console.log(`Dosya oluşturuldu: ${filePath}`);
        } else {
          console.error(`Dosya oluşturma hatası: ${err.message}`);
        }
      }
    })
    .catch((err) => {
      console.error("Klasör oluşturma hatası:", err);
    });
};

// consoldan gelen 2.argumanı model ve controller dosyası oluşturacak
const createServiceAndController = async () => {
  let baseController = await openStub("Controller");
  let baseService = await openStub("Services");
  let baseView = await openStub("View");
  let updatedContentController = replaceContent(modelName, baseController);
  let updatedContentService = replaceContent(modelName, baseService);
  let updatedContentView = replaceContent(modelName, baseView);
  createFileWithFolder(`./controllers/${modelName}Controller.js`, updatedContentController);
  createFileWithFolder(`./services/${modelName}Services.js`, updatedContentService);
  createFileWithFolder(`./pages/${modelName.toLowerCase()}/index.js`, updatedContentView);
};

// model ve type
//  bu isimlerde dosya varmı ? yoksa oluşturacağım varsa hata ver
// roller c


//  ve burayı optimize etme
// delete ekleme ayrı bir dosyada olacak
createServiceAndController();
