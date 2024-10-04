# Heart Rate Aggregation API

This Node.js Express API processes heart rate data by aggregating heart rate readings into 15-minute intervals and returning the min and max values for each interval. The API can also handle additional clinical metrics like weight, blood glucose levels, steps, and more.


## Project Overview

This API processes clinical data, specifically heart rate values, by aggregating them over 15-minute intervals and returning the lowest and highest heart rate within that period. The API can optionally store the aggregated data in a PostgreSQL database.

### Features:
- Aggregates heart rate data into 15-minute intervals.
- Returns min and max heart rate values for each time interval.
- Processes additional clinical data like steps, weight, blood glucose, etc.
- Optionally stores aggregated data in a PostgreSQL database.

---

## API Endpoints

### `POST /api/heart-rate`

Processes heart rate data and aggregates the min and max heart rate for every 15-minute interval.

#### Request Body Example:

```json
{
   "clinical_data": {
      "HEART_RATE": {
         "uom": "beats/min",
         "data": [
            {
               "on_date": "2020-10-06T06:48:17.503Z",
               "measurement": "111"
            },
            {
               "on_date": "2020-10-06T06:55:36.001Z",
               "measurement": "148"
            }
         ],
         "name": "Heart Rate"
      },
      "STEPS": {
         "uom": "",
         "data": [
            {
               "on_date": "2020-10-05T13:00:00.000Z",
               "measurement": "11031"
            }
         ],
         "name": "Steps"
      }
   },
   "patient_id": "gk6dhgh-9a60-4980-bb8b-787bf82689d7",
   "from_healthkit_sync": true,
   "orgId": "8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3",
   "timestamp": "2020-10-09T05:36:31.381Z"
}
