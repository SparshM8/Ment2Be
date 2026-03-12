import cron from 'node-cron';
import https from 'https';

const backendUrl = 'https://k23dx.onrender.com/api/health';

export const startCronJobs = () => {
  // Ping the backend every 14 minutes to keep the Render instance alive
  // Render spins down instances after 15 minutes of inactivity
  cron.schedule('*/14 * * * *', () => {
    https.get(backendUrl, (res) => {
      console.log(`[Cron] Keep-alive ping to ${backendUrl} successful, status code: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`[Cron] Keep-alive ping failed: ${err.message}`);
    });
  });
  
  console.log('✅ Cron jobs initialized: Keep-alive ping scheduled every 14 minutes');
};
