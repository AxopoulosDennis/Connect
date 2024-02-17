using Newtonsoft.Json;
using System.Net;

namespace Connect.Infrastructure
{
    public class ReCaptchaHelper
    {
        private HttpContext _httpContext => new HttpContextAccessor().HttpContext;




        public static bool ValidateReCaptcha(string token, out string errorMessage, out float score, float scoreLimit = 0.5f)
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();


            errorMessage = "";
            score = 0;
            string secret = config["ReCaptcha:ReCaptchaSecretKey"];


            var Request = new HttpContextAccessor().HttpContext;

            string ipAddress = Request.Connection.RemoteIpAddress.ToString();


            var client = new WebClient();

            string url = string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}&remoteip={2}",
                secret, token, ipAddress);


            var response = client.DownloadString(url);
            var captchaResponse = JsonConvert.DeserializeObject<ReCaptchaResponse>(response);
            score = captchaResponse.Score;
            if (captchaResponse.Success && captchaResponse.Score > scoreLimit)
            {
                return true;
            }
            else
            {
                var error = captchaResponse.ErrorCodes[0].ToLower();
                if (error == "missing-input-secret")
                {
                    errorMessage = "reCAPTCHA Error. Please try again!";
                    //errorMessage = "The secret key parameter is missing.";
                }
                else if (error == "invalid-input-secret")
                {
                    errorMessage = "reCAPTCHA Error. Please try again!";
                    //errorMessage = "The secret key parameter is missing.";
                }
                else if (error == "missing-input-response")
                {
                    errorMessage = "reCAPTCHA Error. Please try again!";
                    //errorMessage = "The secret key parameter is missing.";
                }
                else if (error == "invalid-input-response")
                {
                    errorMessage = "reCAPTCHA Error. Please try again!";
                    //errorMessage = "The secret key parameter is missing.";
                }
                else
                {
                    errorMessage = "reCAPTCHA Error. Please try again!";
                }
                return false;
            }
        }

    }
}