const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Candidate)
exports.applyForJob = async (req, res) => {
    try {
        req.body.candidate = req.user.id;
        
        // Check if job exists
        const job = await Job.findById(req.body.job);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const existingApp = await Application.findOne({
            job: req.body.job,
            candidate: req.user.id
        });

        if (existingApp) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create(req.body);
        res.status(201).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get user applications
// @route   GET /api/applications/my
// @access  Private (Candidate)
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ candidate: req.user.id }).populate('job');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get job applications
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter)
exports.getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check ownership
        if (job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const applications = await Application.find({ job: req.params.jobId }).populate('candidate', 'name email');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Recruiter)
exports.updateApplicationStatus = async (req, res) => {
    try {
        let application = await Application.findById(req.params.id).populate('job');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user is the recruiter for this job
        if (application.job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        application = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
