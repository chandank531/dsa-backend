const heartRateService = require('../services/heart-rate.service');

const processHeartRate = async (req, res) => {
    try {
      const { clinical_data, patient_id, orgId, timestamp } = req.body;

      if (!clinical_data.HEART_RATE || !clinical_data.HEART_RATE.data) {
          return res.status(400).json({ message: 'HEART_RATE data is missing' });
      }

      const processedHeartRate = await heartRateService.processHeartRate(
          clinical_data.HEART_RATE.data,
          patient_id,
          orgId,
          timestamp
      );

      return res.status(200).json({
          message: 'Data processed successfully',
          heart_rate_aggregates: processedHeartRate,
          other_metrics: clinical_data
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { 
    processHeartRate 
}