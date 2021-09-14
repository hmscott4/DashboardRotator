// dashboard.clocks.json
// Hugh Scott
// 2020/03/26

// Description:
// Contains dashboard items to be displayed in the rotation
// Additional items may be added in the following format:
//  "name":"Dashboard1",
//  "description":"Organization Summary",
//  "src":".\\img\\Dashboard1.jpeg",
//  "rs_url": "",
//  "sequence": "" 

// where;

// name: Name of the dashboard; only used internally
// description: description of the dashboard; displayed in the navigation bar
// src: image source; note that backslashes must be escaped with another backslash
// rs_url: link to reporting services report; currently not functional
// sequence: order in which the dashboard will be displayed; currently not functional.  Dashboards will display in the order listed.

// dashboard.clocks.json
// Hugh Scott
// 2020/03/26

// Description:
// Contains clock items to be displayed at the top of the dashboard.
// Additional items may be added in the following format:
//  "name":"Pacific",
//  "timezone":"America/Los_Angeles",
//  "order":"1"

// name: is the display name of the clock; it is a string value
// timezone: is the TZ database name for the time zone.  The best (easiest) reference I found is: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// order: is not currently functional; the clocks will display in the order in which they are placed in the file