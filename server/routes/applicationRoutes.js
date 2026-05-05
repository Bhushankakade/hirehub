const express = require('express');
const {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('candidate'), applyForJob);
router.get('/my', protect, authorize('candidate'), getMyApplications);
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getJobApplications);
router.put('/:id', protect, authorize('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;
