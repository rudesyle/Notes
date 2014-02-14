using System.Reflection;
using NHibernate;
using NHibernate.Cfg;

namespace ThyNotebook.Web.Models
{
    public static class NHConfig
    {
        private static readonly Configuration _configuration;
        private static readonly ISessionFactory _sessionFactory;

        static NHConfig()
        {
            Assembly modelAssembly = typeof (Notebook).Assembly;

            _configuration = new Configuration();
            _configuration.Configure(); //configure from the web.config
            _configuration.AddAssembly(modelAssembly); // mapping is in this assembly

            _sessionFactory = _configuration.BuildSessionFactory();
        }

        public static Configuration Configuration
        {
            get { return _configuration; }
        }

        public static ISession OpenSession()
        {
            ISession session = _sessionFactory.OpenSession();
            return session;
        }
    }
}