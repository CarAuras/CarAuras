const { WEBSITE_URL } = require("../src/constants/constants");

module.exports.createExpirationEmail = (userName) => {
  return `
    https://www.youtube.com/@wheelzloop<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WheelzLoop</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; font-size: 14px; color: #434343;">
      <div style="word-spacing: normal; background-color: #fafafa;">
        <div style="display: none; font-size: 1px; color: #ffffff; max-height: 0px; opacity: 0; overflow: hidden;">
          Premium Plan Ending Soon
        </div>
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td>
              <table align="center" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td style="text-align: center; padding: 16px;">
                    <div style="background: #ffffff; border-radius: 8px; max-width: 568px; margin: 0 auto;">
                      <table width="100%" style="background-color: #ffffff; border-radius: 8px;">
                        <tr>
                          <td style="text-align: center; padding: 16px;">
                            <img src="https://res.cloudinary.com/diunslxah/image/upload/v1749622864/logo_osgs8k.png" width="180" alt="WheelzLoop" style="display: block; width: 100%; max-width: 180px; margin: auto" />
                            <h1 style="margin: 24px 0 8px; font-size: 22px; color: #000000;">Your Premium Plan is Ending</h1>
                            <p style="margin: 0 0 16px; font-size: 14px; color: #000000;">
                              Hi ${userName}, we wanted to remind you that your <strong>WheelzLoop Premium Plan</strong> will expire soon.
                            </p>
                            <p style="margin: 0 0 24px; font-size: 14px; color: #000000;">
                              Renew now to continue enjoying exclusive features, premium listing exposure, and top-tier support.
                            </p>
                            <div style="margin: 24px 0;">
                              <a href=${WEBSITE_URL}/premium-plans} style="background-color: #4a63f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Renew Now</a>
                            </div>
                            <p style="margin: 24px 0 0; font-size: 13px; color: #555555;">Your plan will end on: <strong>June 30, 2025</strong></p>
                            <p style="margin: 0; font-size: 13px; color: #555555;">After this date, premium features will be disabled.</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <footer style="width: 100%; max-width: 490px; margin: 40px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
        <p style="margin: 40px 0 8px; font-size: 16px; font-weight: 600; color: #434343;">WheelzLoop</p>
        <p style="margin: 0; color: #434343;">Best Used Cars website in Kerala</p>
        <div style="margin: 16px 0;">
          <a href="#" style="margin: 0 8px;"><img src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0001_duqjea.jpg" width="36" alt="Facebook" /></a>
          <a href="https://www.instagram.com/wheelz_loop/" style="margin: 0 8px;"><img src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0002_djru8s.jpg" width="36" alt="Instagram" /></a>
          <a href="https://www.linkedin.com/in/wheelzloop-used-car-selling-platform-baa71b352/?originalSubdomain=in" style="margin: 0 8px;"><img src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0000_xv9djg.jpg" width="36" alt="LinkedIn" /></a>
          <a href="https://www.youtube.com/@wheelzloop" style="margin: 0 8px;"><img src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0003_ibz8nz.jpg" width="36" alt="YouTube" /></a>
        </div>
        <p style="margin: 16px 0 0; color: #434343;">Copyright © 2025 WheelzLoop. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>

    `;
};
