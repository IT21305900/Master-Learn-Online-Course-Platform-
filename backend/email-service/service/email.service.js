import { EmailClient } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";
import amqp from "amqplib/callback_api.js";

const endpoint =
  "https://academiccalendar.unitedstates.communication.azure.com";
let credential = new DefaultAzureCredential();
const emailClient = new EmailClient(endpoint, credential);

class EmailService {
  constructor() {}

  async sendEmail(subject, body, username, reciever) {
    console.log("My Body", body);

    try {
      const message = {
        senderAddress:
          "DoNotReply@e6275464-75eb-4693-bae8-de5b98e585ba.azurecomm.net",
        content: {
          subject: subject,
          plainText: body,
        },
        recipients: {
          to: [
            { address: "isuruakalanka071@gmail.com", displayName: username },
          ],
        },
      };

      const poller = await emailClient.beginSend(message);
      await poller.pollUntilDone();
    } catch (error) {
      console.log(error);
    }
  }

  async listenForMessages() {
    try {
      amqp.connect(process.env.MSG_QUEUE_URL, (error0, connection) => {
        if (error0) {
          throw error0;
        }
        connection.createChannel((error1, channel) => {
          if (error1) {
            throw error1;
          }

          let queue = "email";

          channel.assertQueue(queue, {
            durable: false,
          });

          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            queue
          );

          channel.consume(
            queue,
            (msg) => {
              let course = JSON.parse(msg.content.toString());
              console.log(course);
              this.sendEmail("Test Email", "Test Body", "User A");
            },
            {
              noAck: true,
            }
          );
        });
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default EmailService;
