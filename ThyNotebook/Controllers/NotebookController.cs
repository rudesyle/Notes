using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Controllers;
using Breeze.ContextProvider;
using Breeze.ContextProvider.NH;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using ThyNotebook.Web.Models;

namespace ThyNotebook.Web.Controllers
{
    [BreezeController]
    public class NotebookController : ApiController
    {
        private static readonly TimeSpan RefreshRate = TimeSpan.FromMinutes(60);
        private static readonly object Locker = new object();
        private static DateTime _lastRefresh = DateTime.Now; // will first clear db at Now + "RefreshRate" 
        private ThyNotebookContext _contextProvider;

        public NotebookController()
        {
            PeriodicReset();
        }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            _contextProvider = new ThyNotebookContext();
        }

        // ~/breeze/notebook/Metadata 
        [HttpGet]
        public string Metadata()
        {
            string r = _contextProvider.Metadata();
            return r;
        }

        // ~/breeze/notebook/ThyNotebooks
        // ~/breeze/notebook/ThyNotebooks?$filter=IsArchived eq false&$orderby=CreatedAt 
        [HttpGet]
        public IQueryable<Notebook> GetAllNotebooks()
        {
            NhQueryableInclude<Notebook> returnValue = _contextProvider.Notebooks;
            return returnValue;
        }

        // ~/breeze/notebook/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

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