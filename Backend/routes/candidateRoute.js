const express = require("express");
const router = express.Router();
const candidateController = require("../controller/candidateController");
const { protect } = require("../controller/userController"); 

// Routes
router.get("/", protect, candidateController.getCandidates);
// router.post("/", protect, upload.single("resume"), candidateController.addCandidate);
router.put("/:id", protect, candidateController.updateCandidate);
router.delete("/:id", protect, candidateController.deleteCandidate);
router.post("/",protect, candidateController.addCandidate)
// router.get("/:id/resume", protect, candidateController.downloadResume);

module.exports = router;
