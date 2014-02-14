using System.Data;
using NHibernate.Driver;
using NHibernate.Engine;
using NHibernate.SqlTypes;

namespace PostgresDriver.DbDriver
{
    internal class DevartPgDriver : ReflectionBasedDriver
    {
        public DevartPgDriver()
            : base(
                "Devart.Data.PostgreSql",
                "Devart.Data.PostgreSql",
                "PgSqlConnection",
                "PgSqlCommand")
        {
        }

        public override string NamedPrefix
        {
            get { return ":"; }
        }

        public override bool UseNamedPrefixInParameter
        {
            get { return true; }
        }

        public override bool UseNamedPrefixInSql
        {
            get { return true; }
        }

        public override bool SupportsMultipleOpenReaders
        {
            get { return false; }
        }

        protected override bool SupportsPreparingCommands
        {
            get { return true; }
        }

        public override bool SupportsMultipleQueries
        {
            get { return true; }
        }

        public override IResultSetsCommand GetResultSetsCommand(ISessionImplementor session)
        {
            return new BasicResultSetsCommand(session);
        }

        protected override void InitializeParameter(IDbDataParameter dbParam, string name, SqlType sqlType)
        {
            base.InitializeParameter(dbParam, name, sqlType);

            // Since the .NET currency type has 4 decimal places, we use a decimal type in PostgreSQL instead of its native 2 decimal currency type.
            if (sqlType.DbType == DbType.Currency)
                dbParam.DbType = DbType.Decimal;
        }
    }
}