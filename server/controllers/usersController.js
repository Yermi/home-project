const authorizedUser = { user: 'admin', password: 'admin' };

module.exports = {
    Login: (req, res) => {
        if (!req.body.user || !req.body.password) {
            res.status(405).send("חובה לספק שם משתמש וסיסמה")
        }
        else if (req.body.user != authorizedUser.user || req.body.password != authorizedUser.password) {
            res.status(405).send("שם משתמש או סיסמה שגויים")
        }
        else {
            res.status(200).send("התחברת בהצלחה")
        }
    }
}