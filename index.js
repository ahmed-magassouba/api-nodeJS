require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const helmet = require("helmet");
app.use(helmet());

const morgan = require("morgan");
app.use(morgan("dev"));

/******************************* */
//uploads images
/****************************** */
const multer = require("multer");
const path = require("path");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.use("/profile", express.static("upload/images"));

app.post("/api/upload", upload.single("profile"), (req, res) => {
  res.status(200).json({
    success: 1,
    profile_url: `http://localhost:3000/profile/${req.file.filename}`,
  });
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
}

app.use(errHandler);


/**** */
//multiple upload
/**** */
// app.use("/gallery", express.static("upload/images"));
// app.post("/api/uploads",upload.array("gallery", 12),(req, res, next) => {
//   console.log(req.files);
//   });


/******************************* */
//Mis en place des cors
/****************************** */
var cors = require("cors");
app.use(cors());
app.options("*", cors());

// var corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "Bienvenue sur l'api de gestion des utilisateurs",
  });
});

/************************************ */
/******** Construction des routes******/
/************************************ */
const userRouter = require("./Routers/UserRouter");
const groupeRouter = require("./Routers/GroupeRouter");
const authRouter = require("./Routers/AuthRouter");
// const uploadRouter = require("./Routers/UploadRouter");

app.use("/api/users", userRouter);
app.use("/api/groupes", groupeRouter);
app.use("/api/auth", authRouter);
// app.use("/api", uploadRouter);

/******************************************** */
//creation du server et affectation d'un port
/******************************************** */
app.listen(process.env.APP_PORT, (err) => {
  if (err) {
    throw new Error("something bad happened...");
  }
  console.log(`server started on : http://localhost:${process.env.APP_PORT}`);
});
