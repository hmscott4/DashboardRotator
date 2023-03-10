File: readme.txt
Hugh Scott
2020/03/26


Folder contents:

File: dashboard.json
Description: Contains dashboard items to be displayed in the rotation
Additional items may be added in the following format:
{
 "description":"Organization Summary",
 "name":"Dashboard1",
 "sequence": "1" 
 "src":"https://pwrbi.scom.com/reports/powerbi/Samples/Customer Profitability Sample PBIX?rs:embed=true",
 "type":"html",
 "url": "https://pwrbi.scom.com/reports/powerbi/Samples/Customer Profitability Sample PBIX"
}

description: description of the dashboard; displayed in the navigation bar
name: Name of the dashboard; only used internally
sequence: order in which the dashboard will be displayed.  
src: image source; note that backslashes must be escaped with another backslash
type: html or image
url: user link to src; for Power BI and Reporting Services, this will be different

File: dashboard.clocks.json
Description: Contains clock items to be displayed at the top of the dashboard.
Additional items may be added in the following format:
{
 "name":"Pacific",
 "timezone":"America/Los_Angeles",
 "sequence":"1"
}

name: is the display name of the clock; it is a string value
timezone: is the TZ database name for the time zone.  The best (easiest) reference I found is: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
sequence: order in which the clocks will be displayed (left-to-right)

File: dashboard.pinned.json
Description: Contains navigation items that are "pinned" underneath the rotating dashboards in the left-hand nav pane
description: description of the dashboard; displayed in the navigation bar
Additional items may be added in the following format:
{
 "description":"Organization Summary",
 "sequence": "1" 
 "src":"https://pwrbi.scom.com/Reports",
 "type":"html",
 "url": "https://pwrbi.scom.com/Reports"
}

description: description of the dashboard; displayed in the navigation bar
sequence: order in which the dashboard will be displayed.  
src: image source; note that backslashes must be escaped with another backslash
type: html or image
url: user link to src; for Power BI and Reporting Services, this will be different