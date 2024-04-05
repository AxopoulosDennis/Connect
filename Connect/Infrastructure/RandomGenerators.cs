using System.Text;

namespace Connect.Infrastructure
{
    public static class RandomGenerators
    {
        #region Using LINQ

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            //έχω αφαιρέσει I,L,O και 0 που συχνά προκαλούν σύγχυση.
            const string chars = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        #endregion

        #region https://www.c-sharpcorner.com/article/generating-random-number-and-string-in-C-Sharp/

        // Generate a random number between two numbers
        public static int RandomNumber(int min, int max)
        {
            return random.Next(min, max);
        }

        public static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
            {
                return builder.ToString().ToLower();
            }
            return builder.ToString();
        }

        // Generate a random password    
        public static string RandomPassword()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, true));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomString(2, false));
            return builder.ToString();
        }

        #endregion

    }
}

