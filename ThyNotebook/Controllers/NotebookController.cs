using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Controllers;
using Breeze.WebApi2;
using ThyNotebook.Business;
using ThyNotebook.Data;

namespace ThyNotebook.Web.Controllers
{
    [BreezeController]
    public class NotebookController : ApiController
    {
        private static readonly TimeSpan RefreshRate = TimeSpan.FromMinutes(60);
        private static readonly object Locker = new object();
        private static DateTime _lastRefresh = DateTime.Now; // will first clear db at Now + "RefreshRate" 

        public NotebookController()
        {
            PeriodicReset();
        }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
        }

        // ~/breeze/notebook/Metadata 
        /*[HttpGet]
        public string Metadata()
        {
            string r = _contextProvider.Metadata();
            return r;
        }
        */
        // ~/breeze/notebook/ThyNotebooks
        // ~/breeze/notebook/ThyNotebooks?$filter=IsArchived eq false&$orderby=CreatedAt 
        [HttpGet]
        public List<Notebook> GetAllNotebooks()
        {
            var db = new NotebookDb();
            List<Notebook> n = db.GetAll();
            return n;
        }

        /*
        // ~/breeze/notebook/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }*/

        // ~/breeze/notebook/purge
        [HttpPost]
        public string Purge()
        {
            //BinderDatabaseInitializer.PurgeDatabase(_contextProvider.Context);
            return "purged";
        }

        // ~/breeze/notebook/reset
        [HttpPost]
        public string Reset()
        {
            Purge();
            //BinderDatabaseInitializer.SeedDatabase(_contextProvider.Context);
            return "reset";
        }

        /// <summary>
        ///     Reset the database to it's initial data state after the server has run
        ///     for "RefreshRate" minutes.
        /// </summary>
        private void PeriodicReset()
        {
            if ((DateTime.Now - _lastRefresh) > RefreshRate)
            {
                lock (Locker)
                {
                    if ((DateTime.Now - _lastRefresh) > RefreshRate)
                    {
                        _lastRefresh = DateTime.Now;
                        Reset();
                    }
                }
            }
        }
    }
}