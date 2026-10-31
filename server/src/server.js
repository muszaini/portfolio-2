import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const port = process.env.PORT || 5001;
const app = createApp();

app.listen(port, () => {
  console.log(`Portfolio API server running on port ${port}`);
  console.log(`Enquiry storage path: ${process.env.STORAGE_FILE_PATH || './data/contact-submissions.csv'}`);
});
