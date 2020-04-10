export const TimeChart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": { "name": 'myData' },
  "description": 'Global cases so far.',
  "mark": {"type": "line", "blue": "green", "point": {"color": "red"}},
  "width": "container",
  "height": "container",
  "background": "#222",
  "transform": [{"filter": "datum.symbol!=='GOOG'"}],
  "encoding": {
    "x": {
      "title": "Date",
      "field": "date",
      "type": "temporal",
      "axis": {
        "labelAngle": 60,
        "tickCount": 8,
        "labelAlign": "left",
        // "labelExpr": "[timeFormat(datum.value, '%b'), timeFormat(datum.value, '%m') == '01' ? timeFormat(datum.value, '%Y') : '']",
        "labelOffset": 4,
        "labelPadding": -24,
        "tickSize": 30,
        "gridDash": {
          "condition": {
            "test": {"field": "value", "timeUnit": "month", "equal": 1},
            "value": []
          },
          "value": [2, 2]
        },
        "tickDash": {
          "condition": {
            "test": {"field": "value", "timeUnit": "month", "equal": 1},
            "value": []
          },
          "value": [2, 2]
        }
      }
    },
    "y": {"title": "Case Count", "field": "count", "type": "quantitative"},
    "tooltip": [
      {"title": "Date","align": "left", "field": "date", "type": "ordinal", "timeUnit": "datemonthyear"},
      {"title": "Case Count","field": "count", "type": "quantitative"}],
  },
  "config": {"axis": {"labelColor": "white" , "titleColor": "white" ,"domainColor": "white", "tickColor": "white"}}
};