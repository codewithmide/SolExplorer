export function formatNumber(value: number) {
    if (value >= 1e18) {
      return (value / 1e18).toFixed(2) + ' Q';
    } else if (value >= 1e15) {
      return (value / 1e15).toFixed(2) + ' P';
    } else if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + ' T';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + ' B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + ' M';
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + ' K';
    } else {
      return value.toString();
    }
  }
  