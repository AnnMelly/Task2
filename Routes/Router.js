const Router = require(`express`)
const router = new Router()



const userController = require('../Controllers/userController')
router.get('/allusers', userController.allUsers)
router.post('/newS', userController.createNewStudent)
router.post('/newW', userController.createNewWorker)
router.delete('/deleteUser', userController.deleteUser)



const courseController = require('../Controllers/CourseController')
router.get('/allClubs', courseController.allClubs)
router.post('/newClub', courseController.newCourse)
router.delete(`/deleteClub`, courseController.deleteClub)



router.get(`/allTypes`, courseController.allType)
router.post('/newType', courseController.newTypeOfClub)
router.delete(`/deleteType`, courseController.deletetype)



const singsControler = require('../Controllers/signsController')
router.get('/allJoins', singsControler.alljoins)
router.post('/joinClub', singsControler.createSign)
router.delete('/deleteJoins', singsControler.deleteSfromClub)




module.exports = router