import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = async (req, file, cb) => {
  console.log("trigger");
  const { title, description } = req.body;
  console.log(title, description);
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const validateInputs = async () => {
    if (!title || !description) {
      return cb(new Error(`Title and description is required...`));
    } else {
      cb(null, true);
    }
  };
  await validateInputs();
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type, only JPEG, JPG, and PNG is allowed!"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}); //1MB limit

export default upload;
