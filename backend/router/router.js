const Register = require("../controller/signUpService");
const LoginService = require("../controller/loginService");
const Diary = require("../controller/diaryService");
const {Auth_ACCESS} = require("../middleware/auth")
const router = require("express").Router();


router.get('/', (req, res) => {
    res.send('Online Diary APIs')
})

router.post("/register", Register.create);
router.post("/login", LoginService.login);
router.post("/diary", Diary.create);
router.get("/diary", Diary.getAll);
router.delete("/diary/:id",Diary.delete);
router.get("/diary/:id",Diary.getById);
router.put("/diary/:id",Diary.updated);
router.get("/diary/user/:id", Diary.getByUserId);



module.exports = router;