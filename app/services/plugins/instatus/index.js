const axios = require('axios');

module.exports = async function(ctx) {
  // 獲取 Instatus API 的狀態
  const statusUrl = 'https://[YOUR-STATUS-PAGE]/summary.json';
  const response = await axios.get(statusUrl);
  const statusData = response.data;

  // 設置插件的 UI 元素
  const pluginUI = {
    type: 'list',
    disabled: false,
    items: [
      {
        type: 'item',
        id: 'status-item',
        title: `Current Status: ${statusData.page.status}`,
        subtitle: statusData.page.name,
        action: {
          type: 'frame',
          url: statusData.page.url
        }
      },
      ...statusData.activeIncidents.map(incident => ({
        type: 'item',
        id: `incident-item-${incident.url}`,
        title: incident.name,
        subtitle: incident.impact,
        action: {
          type: 'frame',
          url: incident.url
        }
      })),
      ...statusData.activeMaintenances.map(maintenance => ({
        type: 'item',
        id: `maintenance-item-${maintenance.url}`,
        title: maintenance.name,
        subtitle: maintenance.status,
        action: {
          type: 'frame',
          url: maintenance.url
        }
      }))
    ]
  };

  // 返回插件的 UI 結構
  return pluginUI;
};
