const twilio = require("twilio");
const cron = require("node-cron");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.smsTodo = async (req, res) => {
  try {
    const { phone, time, task } = req.body;

    // Validate phone number, time, and task
    if (!phone || !time || !task) {
      return res.status(400).json({
        success: false,
        message: "Phone number, time, and task are required.",
      });
    }

    // Validate and parse time in `HH:mm` format
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex for HH:mm
    if (!timePattern.test(time)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time format. Expected format is HH:mm.",
      });
    }

    const [hours, minutes] = time.split(":"); // Split into hours and minutes

    // Construct cron expression
    const cronExpression = `${parseInt(minutes)} ${parseInt(hours)} * * *`;

    const sendSms = (to, message) => {
      client.messages
        .create({
          body: message,
          from: "+19867863596", // Replace with your Twilio number
          to: to,
        })
        .then((message) => console.log(`Message sent with SID: ${message.sid}`))
        .catch((error) =>
          console.error(`Failed to send message: ${error.message}`)
        );
    };

    // Schedule SMS with the dynamically constructed cron expression
    cron.schedule(cronExpression, () => {
      sendSms(`+91${phone}`, `Reminder from To-Do List: ${task}`);
    });

    res.status(200).json({
      success: true,
      message: `SMS scheduled for task: "${task}" at ${time}.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
