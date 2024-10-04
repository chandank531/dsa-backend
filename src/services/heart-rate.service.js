const HeartRateModel = require('../models/heart-rate.model');
const Model = HeartRateModel;

class HeartRateService {
    create = async (body,options) => {
        const heartRate = await Model.create(body,options);
        return heartRate;
    }

    processHeartRate = async (heartRateData, patient_id, orgId, timestamp) => {
        const processedData = [];
        let currentInterval = [];
        let startTime = null;
    
        for (let reading of heartRateData) {
            const currentTimestamp = new Date(reading.on_date);
    
            if (!startTime) {
                startTime = currentTimestamp;
            }
    
            if ((currentTimestamp - startTime) <= 15 * 60 * 1000) {
                currentInterval.push(parseInt(reading.measurement));
            } else {
                processedData.push({
                    from_date: startTime,
                    to_date: currentTimestamp,
                    measurement: {
                        low: Math.min(...currentInterval),
                        high: Math.max(...currentInterval),
                    },
                });
    
                currentInterval = [parseInt(reading.measurement)];
                startTime = currentTimestamp;
            }
        }
    
        if (currentInterval.length > 0) {
            processedData.push({
                from_date: startTime,
                to_date: new Date(heartRateData[heartRateData.length - 1].on_date),
                measurement: {
                    low: Math.min(...currentInterval),
                    high: Math.max(...currentInterval),
                },
            });
        }
    
        for (let data of processedData) {
            await HeartRateModel.create({
                from_date: data.from_date,
                to_date: data.to_date,
                low: data.measurement.low,
                high: data.measurement.high,
                patient_id,
                org_id: orgId,
                recorded_at: timestamp,
            });
        }
    
        return processedData;
    }
}

module.exports = new HeartRateService();