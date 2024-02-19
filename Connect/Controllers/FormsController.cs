using Connect.Infrastructure;
using Connect.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Website.Controllers;

namespace Connect.Controllers
{
    public class FormsController : SurfaceController
    {
        IWebHostEnvironment _webHostEnvironment;
        private readonly UmbracoHelper _umbracoHelper;
        IHttpContextAccessor _httpContextAccessor;
        public FormsController(
            IHttpContextAccessor httpContextAccessor,
            UmbracoHelper umbracoHelper,
            IWebHostEnvironment webHostEnvironment,
            IUmbracoContextAccessor
            umbracoContextAccessor,
            IUmbracoDatabaseFactory
            databaseFactory, ServiceContext
            services, AppCaches appCaches,
            IProfilingLogger profilingLogger,
            IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _umbracoHelper = umbracoHelper;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }


        private bool IsValidEmail(string nEmail)
        {
            string filter = @"^(?i:(?<local_part>[a-z0-9!#$%^&*{}'`+=-_|/?]+(?:\.[a-z0-9!#$%^&*{}'`+=-_|/?]+)*)@(?<labels>[a-z0-9]+\z?.*[a-z0-9-_]+)*(?<tld>\.[a-z0-9]{2,}))$";
            return System.Text.RegularExpressions.Regex.IsMatch(nEmail, filter);
        }


        #region Contact Form

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult ContactFormSubmit(ContactFormModel model, string recaptcha, bool debugging = false)
        {

            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            //var requiredField = _umbracoHelper.GetDictionaryValue("Form.RequiredField", "This field is required!");
            //var requiredTerms = _umbracoHelper.GetDictionaryValue("Form.TermsRequired", "Terms acceptance is necessary in order to proceed with form submission.");
            //var wrongFormatField = _umbracoHelper.GetDictionaryValue("Form.NotValidFormat", "Please enter a valid email address.");

            var requiredField = "Το πεδίο είναι υποχρεωτικό!";

            var wrongFormatField = _umbracoHelper.GetDictionaryValue("Form.NotValidFormat", "Παρακαλώ εισάγετε ένα έγκυρο email.");

            Dictionary<string, string> errors = new Dictionary<string, string>();


            if (string.IsNullOrWhiteSpace(model.FirstName))
            {
                errors.Add("fname", requiredField);
            }
            if (string.IsNullOrWhiteSpace(model.LastName))
            {
                errors.Add("lname", requiredField);
            }
            if (string.IsNullOrWhiteSpace(model.Subject))
            {
                errors.Add("subject", requiredField);
            }
            if (string.IsNullOrWhiteSpace(model.Email))
            {
                errors.Add("email", requiredField);
            }
            if (string.IsNullOrWhiteSpace(model.Message))
            {
                errors.Add("message", requiredField);
            }
            else
            {
                if (model.Email != null)
                {
                    if (!IsValidEmail(model.Email))
                    {
                        errors.Add("email", wrongFormatField);
                    }
                }
            }

            //if (!model.TermsAccepted)
            //{
            //    errors.Add("termsAccepted", requiredTerms);
            //}

            float score = 0;
            var errorMessage = "";

            if (!debugging)
            {
                bool isValidCaptcha = ReCaptchaHelper.ValidateReCaptcha(recaptcha, out errorMessage, out score, scoreLimit: 0.5f);
                if (!isValidCaptcha)
                {
                    errors.Add("ReCaptcha", errorMessage);
                }
            }


            if (errors.Any())
            {
                return Json(new
                {
                    OK = false,
                    Errors = errors
                });
            }


            try
            {


                #region Build Email Body

                System.Text.StringBuilder sb_client = new System.Text.StringBuilder();

                //sb_client.Append("<img src=\"/images/logo.svg\" width='200px' style='display:block; margin:0 auto;'>");

                sb_client.Append("<span>" + model.FirstName + " " + model.LastName + " submitted contact form at " + DateTime.Now + ", this user attached the following data.<br/><br/></span>");

                sb_client.Append("<table width='600' style='width:600px;'>");


                sb_client.Append("<tr>");
                sb_client.Append("<td>Subject: &nbsp;</td>");
                sb_client.Append("<td>" + model.Subject ?? "" + "</td>");
                sb_client.Append("</tr>");

                sb_client.Append("<tr>");
                sb_client.Append("<td>First Name: &nbsp;</td>");
                sb_client.Append("<td>" + model.FirstName + "</td>");
                sb_client.Append("</tr>");

                sb_client.Append("<tr>");
                sb_client.Append("<td>Last Name: &nbsp;</td>");
                sb_client.Append("<td>" + model.LastName + "</td>");
                sb_client.Append("</tr>");

                sb_client.Append("<tr>");
                sb_client.Append("<td>E-mail: &nbsp;</td>");
                sb_client.Append("<td>" + model.Email + "</td>");
                sb_client.Append("</tr>");

                sb_client.Append("<tr>");
                sb_client.Append("<td>Tel: &nbsp;</td>");
                sb_client.Append("<td>" + (model.Tel ?? "") + "</td>");
                sb_client.Append("</tr>");

                sb_client.Append("<tr>");
                sb_client.Append("<td>Message: &nbsp;</td>");
                sb_client.Append("<td>" + model.Message + "</td>");
                sb_client.Append("</tr>");

                sb_client.Append("<table>");
                sb_client.Append("<p>&nbsp;</p>");

                #endregion

                #region Email Properties

                System.Net.Mail.MailMessage msg_client = new System.Net.Mail.MailMessage();
                msg_client.IsBodyHtml = true;
                msg_client.Body = sb_client.ToString();
                msg_client.Subject = "TONNY WEBSITE - Contact Form Submission: " + model.FirstName + " " + model.LastName;
                msg_client.BodyEncoding = System.Text.Encoding.UTF8;
                msg_client.From = new System.Net.Mail.MailAddress(config["MailSettings:MailSmtpFrom"],
                config["MailSettings:MailDisplayName"]);

                msg_client.To.Add(config["MailSettings:Recipients"]);
                if (config["MailSettings:CcRecipients"] != "")
                {
                    msg_client.CC.Add(config["MailSettings:CcRecipients"]);
                }

                if (config["MailSettings:BccRecipients"] != "")
                {
                    msg_client.Bcc.Add(config["MailSettings:BccRecipients"]);
                }
                #endregion

                #region Send Email


                System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();
                client.Port = Int32.Parse(config["MailSettings:MailSmtpPort"]);
                client.Host = config["MailSettings:MailSmtpHost"];
                client.EnableSsl = (config["MailSettings:MailUseSsl"] == "true" ? true : false);
                client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                client.Credentials = new System.Net.NetworkCredential(
                config["MailSettings:MailSmtpFrom"],
                config["MailSettings:MailSmtpPassword"]);

                client.Send(msg_client);

                #endregion




            }
            catch (Exception e)
            {
                return Json(new
                {
                    OK = false,
                    Errors = e.Message
                });
            }

            sendConfirmationEmail(model.Email, config, ConfirmationEmailTypeConstants.Contact);

            return Json(new
            {
                OK = true
            });
        }
        #endregion


        private void sendConfirmationEmail(string email, IConfigurationRoot? config, ConfirmationEmailTypeConstants type)
        {
            if (!string.IsNullOrEmpty(email) && IsValidEmail(email) && config != null)
            {
                var emailSent = false;

                #region Build Email Body

                System.Text.StringBuilder sb_client = new System.Text.StringBuilder();


                if (type == ConfirmationEmailTypeConstants.Contact)
                {
                    var settings = _umbracoHelper.ContentAtRoot().FirstOrDefault(x => x.ContentType.Alias == "settings");
                    if (settings != null)
                    {
                        var template = settings.Value<string>("contactReplyTemplate") ?? "";
                        sb_client.Append(template);

                    }


                }

                var baseUrl = config["Environment:BaseUrl"];

                if (baseUrl.Contains("localhost"))
                {
                    baseUrl = "https://tonny.gr/";
                    var fullUrl = baseUrl + "media/hxhjrx3h/logo_email.png?rmode=max&width=500&v=1d9e0fa398b74b4";
                    sb_client.Append($"<img border=\"0\" alt =\"\" style = \"display: block; width: 140px; height: 38px; \" src=\"{fullUrl}\" />");


                }
                else
                {
                    sb_client.Append($"<img border=\"0\" alt =\"\" style = \"display: block; width: 140px; height: 38px; \" src=\"{baseUrl}/images/logo_email.png\" />");

                }



                #region Email Properties

                System.Net.Mail.MailMessage msg_client = new System.Net.Mail.MailMessage();
                msg_client.IsBodyHtml = true;
                msg_client.Body = sb_client.ToString();
                if (type == ConfirmationEmailTypeConstants.Contact)
                {
                    msg_client.Subject = "TONNY WEBSITE - Contact Form: " + email;

                }

                msg_client.BodyEncoding = System.Text.Encoding.UTF8;
                msg_client.From = new System.Net.Mail.MailAddress(config["ConfirmationMailSettings:Default:MailSmtpFrom"],
                    config["ConfirmationMailSettings:Default:MailDisplayName"]);
                msg_client.To.Add(email);


                #endregion

                #endregion




                try
                {

                    #region Send Email
                    try
                    {
                        System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();
                        client.Port = Int32.Parse(config["ConfirmationMailSettings:Default:MailSmtpPort"]);
                        client.Host = config["ConfirmationMailSettings:Default:MailSmtpHost"];
                        client.EnableSsl = (config["ConfirmationMailSettings:Default:MailUseSsl"] == "true" ? true : false);
                        client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                        client.Credentials = new System.Net.NetworkCredential(
                        config["ConfirmationMailSettings:Default:MailSmtpFrom"],
                        config["ConfirmationMailSettings:Default:MailSmtpPassword"]);


                        client.Send(msg_client);

                    }
                    catch (Exception ex)
                    {
                        System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();
                        client.Port = Int32.Parse(config["ConfirmationMailSettings:FallBack:MailSmtpPort"]);
                        client.Host = config["ConfirmationMailSettings:FallBack:MailSmtpHost"];
                        client.EnableSsl = (config["ConfirmationMailSettings:FallBack:MailUseSsl"] == "true" ? true : false);
                        client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                        client.Credentials = new System.Net.NetworkCredential(
                        config["ConfirmationMailSettings:FallBack:MailSmtpFrom"],
                        config["ConfirmationMailSettings:FallBack:MailSmtpPassword"]);


                        client.Send(msg_client);
                    }

                    #endregion

                }
                catch (Exception ex)
                {

                }
            }


        }

    }

}
