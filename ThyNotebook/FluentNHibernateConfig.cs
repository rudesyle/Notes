using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using ThyNotebook.Web.Models;

namespace ThyNotebook.Web
{
    public class FluentNHibernateConfig
    {
        private static ISessionFactory CreateSessionFactory()
        {
            /*return Fluently.Configure()
              .Database(
                SQLiteConfiguration.Standard
                  .UsingFile("firstProject.db")
              )
              .Mappings(m =>
                m.FluentMappings.AddFromAssemblyOf<Notebook>())
              .BuildSessionFactory();*/

            var connectionStr = "Server=127.0.0.1;Port=5432;Database=the_db;User Id=user_name;Password=password;";
            ISessionFactory sessionFactory = Fluently
                .Configure()
                .Database(PostgreSQLConfiguration.Standard.ConnectionString(connectionStr))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Notebook>())
                .ExposeConfiguration(BuildSchema)
                .BuildSessionFactory();

            return sessionFactory;
        }

        private static void BuildSchema(Configuration config)
        {
            // This NHibernate tool takes a configuration (with mapping info in)
            // and exports a database schema from it.
            var dbSchemaExport = new SchemaExport(config);
            //dbSchemaExport.Drop(false, true);
            dbSchemaExport.Create(false, true);
        }
    }
}