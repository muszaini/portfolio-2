import express from 'express';
import { validateContactSubmission } from '../utils/validator.js';
import { appendEnquiryToCsv } from '../utils/csvStorage.js';

export function createContactRouter(storageFilePath) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const validation = validateContactSubmission(req.body);

      if (validation.isSpam) {
        // Return 400 for bot submissions without processing further
        return res.status(400).json({
          success: false,
          errors: { form: 'Submission could not be processed.' }
        });
      }

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      // Append record to private CSV file
      await appendEnquiryToCsv(validation.cleanedData, storageFilePath);

      // Return 201 Created confirmation
      return res.status(201).json({
        success: true,
        message: 'Thank you for your message. Muszaini will review your enquiry and respond promptly.'
      });
    } catch (error) {
      console.error('Contact submission storage error:', error.message);
      // Return generic 500 without leaking filesystem or internal paths
      return res.status(500).json({
        success: false,
        message: 'An unexpected system error occurred while recording your enquiry. Please reach out directly via email at muszainimusa224@gmail.com.'
      });
    }
  });

  return router;
}
