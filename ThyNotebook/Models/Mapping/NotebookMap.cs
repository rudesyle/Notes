using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentNHibernate.Mapping;

namespace ThyNotebook.Web.Models.Mapping
{
    public class NotebookMap : ClassMap<Notebook>
    {
        public NotebookMap()
        {
            Id(x => x.NotebookId);
            Map(x => x.Name);
            Map(x => x.Description);
            Map(x => x.CreateDate);
            HasMany(x => x.Notes)
              .Inverse()
              .Cascade.All().Table("notes");
        }
    }
}